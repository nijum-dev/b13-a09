"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaImage, FaLock, FaArrowRight } from 'react-icons/fa';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useAuth();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.warning("Please fill in Name, Email, and Password.");
      return;
    }

    setIsLoading(true);
    const success = await registerUser(
      name.trim(),
      email.trim(),
      photoUrl.trim() || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      password
    );
    setIsLoading(false);

    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="bg-[#F7F5F0] min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 dark:bg-zinc-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-[#1A3C2E1A] dark:border-zinc-700 transition">
        
        {/* Header */}
        <div className="text-center">
          <h5 className="text-[#E8A020] font-bold text-xs tracking-widest uppercase mb-2">
            🚀 JOIN THE HUB
          </h5>
          <h2 className="text-[#1A3C2E] dark:text-[#E8A020] font-black text-3xl sm:text-4xl tracking-tight">
            Register Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            Create an account to submit blueprints and validate innovations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                style={{ borderColor: 'transparent' }}
                required
              />
            </div>
          </div>

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
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                style={{ borderColor: 'transparent' }}
                required
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">
              Photo URL (Optional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <FaImage />
              </span>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[#F7F5F0] dark:bg-zinc-700 text-sm text-[#1A3C2E] dark:text-white placeholder-gray-400 transition"
                style={{ borderColor: 'transparent' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-zinc-400 mb-1.5">
              Password
            </label>
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
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-gray-400">Password requirements:</p>
              <ul className="text-[10px] text-gray-400 list-disc pl-4 space-y-0.5">
                <li>Minimum 6 characters</li>
                <li>At least one uppercase letter (A-Z)</li>
                <li>At least one lowercase letter (a-z)</li>
              </ul>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#1A3C2E] hover:bg-[#255541] dark:bg-[#E8A020] dark:hover:bg-[#d69018] text-white dark:text-zinc-950 font-bold rounded-xl transition shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? 'Creating Account...' : 'Register'} <FaArrowRight />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-extrabold text-[#E8A020] hover:underline">
            Sign In instead
          </Link>
        </p>

      </div>
    </div>
  );
}
