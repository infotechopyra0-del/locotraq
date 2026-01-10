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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide email and password');
        }

        await dbConnect();

        // Find user and include password field
        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (!user.isActive) {
          throw new Error('Your account has been deactivated');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        };
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
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
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
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
    maxAge: 30 * 24 * 60 * 60, 
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  // Only enable debug in development and when explicitly requested
  debug: process.env.NODE_ENV === 'development' && process.env.NEXTAUTH_DEBUG === 'true',
};