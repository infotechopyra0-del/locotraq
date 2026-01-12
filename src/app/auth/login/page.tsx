'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, AlertCircle, CheckCircle, Loader2, X } from 'lucide-react';

function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailChecking, setEmailChecking] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  // Handle OAuth callback errors
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'OAuthCallback':
        case 'Callback':
          setError('Social login was cancelled or failed. Please try again or use email/password login.');
          break;
        case 'OAuthAccountNotLinked':
          setError('This email is already registered with a different login method. Please use the original login method.');
          break;
        default:
          setError('Authentication failed. Please try again.');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [isLogin]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      // Handle service unavailable gracefully
      if (response.status === 503) {
        console.warn('Email check service unavailable:', data.message);
        return false; // Allow registration to proceed
      }
      
      return data.exists;
    } catch (err) {
      console.error('Error checking email:', err);
      return false; // Allow registration to proceed if API fails
    }
  };

  const handleEmailBlur = async () => {
    if (!isLogin && registerData.email) {
      if (!isValidEmail(registerData.email)) {
        setError('Please enter a valid email address (e.g., user@gmail.com)');
        return;
      }
      setEmailChecking(true);
      setError('');

      const exists = await checkEmailExists(registerData.email);
      setEmailChecking(false);

      if (exists) {
        setError('This email is already registered. Please login or use a different email.');
      }
    }
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!isValidEmail(loginData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      
      const result = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
        callbackUrl: callbackUrl
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // Check user role after successful login
        const sessionResponse = await fetch('/api/auth/session');
        const session = await sessionResponse.json();

        if (session?.user?.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!isValidEmail(registerData.email)) {
      setError('Please enter a valid email address (e.g., user@gmail.com)');
      setLoading(false);
      return;
    }

    const emailExists = await checkEmailExists(registerData.email);
    if (emailExists) {
      setError('This email is already registered. Please login instead.');
      setLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      });

      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1400ms' }}></div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-orange-600/20 to-orange-500/10"></div>

        {/* Decorative wave pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            {[...Array(20)].map((_, i) => (
              <path
                key={i}
                d={`M 0,${500 + i * 20} Q 250,${480 + i * 20} 500,${500 + i * 20} T 1000,${500 + i * 20}`}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                opacity={0.3 - i * 0.01}
              />
            ))}
          </svg>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-orange-500/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-orange-500/30 rounded-full"></div>

        {/* Floating dots */}
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '300ms' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-orange-600 rounded-full animate-ping" style={{ animationDelay: '600ms' }}></div>

        {/* Diagonal stripes accent */}
        <div className="absolute bottom-10 right-10 w-32 h-32 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #f97316 0, #f97316 10px, transparent 10px, transparent 20px)',
          }}></div>
        </div>

        <div className="relative z-10 text-white text-center max-w-lg">
          <div className="mb-8">
            <div className="relative inline-block">
              <MapPin className="w-28 h-28 mx-auto mb-6 text-orange-500 animate-bounce" />
              <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Discover What
            </span>
            <br />
            <span className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Drives Your
            </span>
            <br />
            <span className="bg-linear-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              Passion!!
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Track Everything, Everywhere with Real-time GPS Solutions
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-4xl font-black mb-2 text-orange-500">10k+</div>
              <div className="text-sm text-gray-400">Customers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-4xl font-black mb-2 text-orange-500">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="text-4xl font-black mb-2 text-orange-500">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10 overflow-y-auto scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="w-full max-w-md my-auto">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center transform rotate-12 shadow-lg shadow-orange-500/30">
                <MapPin className="w-6 h-6 text-white -rotate-12" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              <span className="text-white">Loco</span>
              <span className="text-orange-500">traq</span>
            </h1>
            <h2 className="text-xl font-bold text-white mb-1">
              {isLogin ? 'Login to Get Started' : 'Create Your Account'}
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              {isLogin ? "Welcome Back! Let's Groove" : 'Join us today and start tracking'}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-gray-700/50 shadow-2xl">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-xs md:text-sm flex-1">{error}</p>
                <button
                  onClick={() => setError('')}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-start backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-green-400 text-xs md:text-sm flex-1">{success}</p>
                <button
                  onClick={() => setSuccess('')}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full pl-12 pr-14 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-orange-500 hover:to-orange-400 transition-all disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-lg shadow-orange-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>

                <div className="text-center text-sm text-gray-400">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-orange-500 font-bold hover:text-orange-400 transition-colors underline decoration-orange-500/30 hover:decoration-orange-400"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              // Register Form
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    Email Address
                    {emailChecking && (
                      <span className="ml-2 text-xs text-orange-400">(Checking...)</span>
                    )}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      onBlur={handleEmailBlur}
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="you@gmail.com"
                    />
                    {emailChecking && (
                      <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 animate-spin" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">We'll verify this email exists before creating your account</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="w-full pl-12 pr-14 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                      placeholder="Re-enter your password"
                    />
                  </div>
                </div>

                <label className="flex items-start cursor-pointer text-xs md:text-sm group">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 text-orange-500 bg-gray-900 border-gray-700 rounded focus:ring-orange-500 focus:ring-2 flex-shrink-0"
                  />
                  <span className="ml-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the{' '}
                    <a href="/terms" className="text-orange-500 font-bold hover:text-orange-400 underline decoration-orange-500/30">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-orange-500 font-bold hover:text-orange-400 underline decoration-orange-500/30">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <button
                  onClick={handleRegister}
                  disabled={loading || emailChecking}
                  className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-orange-500 hover:to-orange-400 transition-all disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-base shadow-lg shadow-orange-500/30 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="text-center text-sm text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-orange-500 font-bold hover:text-orange-400 transition-colors underline decoration-orange-500/30 hover:decoration-orange-400"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400 font-bold">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <button 
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className="flex items-center justify-center px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl hover:bg-gray-900/70 hover:border-orange-500/50 transition-all group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-bold text-gray-300 group-hover:text-white transition-colors">Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}