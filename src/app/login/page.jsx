"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Desired redirect route, defaults to home page "/"
  const redirectPath = searchParams.get('redirect') || '/';

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.warning("Please fill in all credentials.");
      return;
    }

    setIsLoading(true);
    const success = await loginUser(email.trim(), password);
    setIsLoading(false);

    if (success) {
      router.push(redirectPath);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const success = await loginWithGoogle();
    setIsLoading(false);

    if (success) {
      router.push(redirectPath);
    }
  };

  const handleForgotPasswordClick = () => {
    toast.info("Password recovery mail triggered. (UI simulation active)");
  };

  return (
    <div className="bg-[#F7F5F0] min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 dark:bg-zinc-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-[#1A3C2E1A] dark:border-zinc-700 transition">
        
        {/* Header */}
        <div className="text-center">
          <h5 className="text-[#E8A020] font-bold text-xs tracking-widest uppercase mb-2">
            🔐 MEMBER ACCESS
          </h5>
          <h2 className="text-[#1A3C2E] dark:text-[#E8A020] font-black text-3xl sm:text-4xl tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            Welcome back to IdeaVault. Validate and manage your blueprints.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                style={{ borderColor: 'transparent' }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-xs font-bold text-[#E8A020] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                style={{ borderColor: 'transparent' }}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#1A3C2E] hover:bg-[#255541] dark:bg-[#E8A020] dark:hover:bg-[#d69018] text-white dark:text-zinc-950 font-bold rounded-xl transition shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? 'Signing In...' : 'Sign In'} <FaArrowRight />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-zinc-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold">
            <span className="bg-white dark:bg-zinc-800 px-3 text-gray-400 dark:text-zinc-500">Or continue with</span>
          </div>
        </div>

        {/* Google Login Only */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={isLoading}
          className="w-full py-3.5 bg-white hover:bg-gray-50 border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#1A3C2E] dark:text-white font-bold rounded-xl transition shadow-sm active:scale-95 flex items-center justify-center gap-2 text-sm"
        >
          <FaGoogle className="text-red-500" /> Sign In with Google
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-6">
          New to IdeaVault?{' '}
          <Link href="/register" className="font-extrabold text-[#E8A020] hover:underline">
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
}
