import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    // Only add Google provider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []
    ),
    // Only add Facebook provider if credentials are available
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })]
      : []
    ),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔐 Credentials received:', { email: credentials?.email, hasPassword: !!credentials?.password });
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          throw new Error('Please provide email and password');
        }

        await dbConnect();
        console.log('📡 Database connected for auth');

        // Find user and include password field
        const user = await User.findOne({ email: credentials.email }).select('+password');
        console.log('👤 User found:', !!user, user ? { email: user.email, isActive: user.isActive } : 'No user');

        if (!user) {
          console.log('❌ No user found with email:', credentials.email);
          throw new Error('Invalid email or password');
        }

        if (!user.isActive) {
          console.log('❌ User account deactivated:', credentials.email);
          throw new Error('Your account has been deactivated');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        console.log('🔑 Password valid:', isPasswordValid);

        if (!isPasswordValid) {
          console.log('❌ Invalid password for user:', credentials.email);
          throw new Error('Invalid email or password');
        }

        console.log('✅ Login successful for user:', credentials.email);
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || `${user.firstName} ${user.lastName}`,
          role: user.role,
          emailVerified: user.emailVerified
        };
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('🎫 JWT Callback - Token:', !!token, 'User:', !!user, 'Account:', account?.provider);
      
      if (user) {
        console.log('👤 User data in JWT:', { id: user.id, email: user.email, role: user.role });
        token.id = user.id;
        token.role = user.role || 'user';
        token.emailVerified = Boolean(user.emailVerified);
        
        // For OAuth providers, save user to database
        if (account?.provider !== 'credentials') {
          try {
            await dbConnect();
            const existingUser = await User.findOne({ email: user.email });
            
            if (!existingUser) {
              // Create new user for OAuth login
              const newUser = new User({
                name: user.name,
                email: user.email,
                emailVerified: true,
                isActive: true,
                role: 'user',
                provider: account?.provider
              });
              await newUser.save();
              console.log('✅ New user created for OAuth login:', user.email);
              token.id = newUser._id.toString();
            } else {
              console.log('✅ Existing user found for OAuth login:', user.email);
              token.id = existingUser._id.toString();
              token.role = existingUser.role;
            }
          } catch (error) {
            console.error('❌ Database error during OAuth login:', error);
            // Continue without database persistence for now
            console.log('⚠️ Continuing authentication without database persistence');
            token.id = user.id; // Use the provider's user ID as fallback
          }
        }
      }
      
      console.log('🎫 JWT Token final:', { id: token.id, role: token.role, email: token.email });
      return token;
    },
    
    async session({ session, token }) {
      console.log('🔄 Session Callback - Token:', !!token);
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
        
        console.log('👤 Session user final:', {
          id: session.user.id,
          role: session.user.role,
          email: session.user.email
        });
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      }
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  // Debug mode completely disabled
  debug: false,
};