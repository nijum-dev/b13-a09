"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthContext';
import { useTheme } from '@/providers/ThemeContext';
import { FaSun, FaMoon, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar bg-[#1A3C2E] dark:bg-zinc-950 shadow-md px-4 transition-colors duration-300">

        {/* Navbar Start */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white hover:bg-[#ffffff12]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow-2xl bg-[#1A3C2E] dark:bg-zinc-900 rounded-2xl w-56 space-y-1.5"
            >
              <li>
                <Link href="/" className="text-white hover:text-[#E8A020]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/ideas" className="text-white hover:text-[#E8A020]">
                  Ideas
                </Link>
              </li>

              <li>
                <Link href="/idea-form" className="text-white hover:text-[#E8A020]">
                  Add Idea
                </Link>
              </li>

              <li>
                <Link href="/my-ideas" className="text-white hover:text-[#E8A020]">
                  My Ideas
                </Link>
              </li>

              <li>
                <Link href="/my-interactions" className="text-white hover:text-[#E8A020]">
                  My Interactions
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="btn btn-ghost text-xl font-bold text-white hover:bg-transparent">
            🔐 Idea<span className="text-[#E8A020]">Vault</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link href="/" className="text-white hover:bg-[#ffffff0e] font-semibold">
                Home
              </Link>
            </li>

            <li>
              <Link href="/ideas" className="text-white/80 hover:text-white hover:bg-[#ffffff0e] font-semibold">
                Ideas
              </Link>
            </li>

            <li>
              <Link href="/idea-form" className="text-white/80 hover:text-white hover:bg-[#ffffff0e] font-semibold">
                Add Idea
              </Link>
            </li>

            <li>
              <Link href="/my-ideas" className="text-white/80 hover:text-white hover:bg-[#ffffff0e] font-semibold">
                My Ideas
              </Link>
            </li>

            <li>
              <Link href="/my-interactions" className="text-white/80 hover:text-white hover:bg-[#ffffff0e] font-semibold">
                My Interactions
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-3 flex items-center">
          
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-white hover:bg-[#ffffff15] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <FaMoon className="text-lg text-slate-300" />
            ) : (
              <FaSun className="text-lg text-[#E8A020]" />
            )}
          </button>

          {/* Authentication State Render */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Profile Pic Tooltip Group */}
              <div className="dropdown dropdown-end">
                <div 
                  tabIndex={0} 
                  role="button" 
                  className="w-10 h-10 rounded-full border-2 border-[#E8A020] overflow-hidden hover:scale-105 transition cursor-pointer relative bg-zinc-800 flex items-center justify-center"
                  title={user.name}
                >
                  {user.photoUrl ? (
                    <img 
                      src={user.photoUrl} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
                      }}
                    />
                  ) : (
                    <span className="text-white font-bold uppercase text-sm">
                      {user.name ? user.name.substring(0,2) : 'US'}
                    </span>
                  )}
                </div>
                
                {/* User menu dropdown */}
                <ul 
                  tabIndex={0} 
                  className="dropdown-content menu p-3 shadow-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 rounded-2xl w-52 mt-3 text-zinc-800 dark:text-zinc-200 z-[100]"
                >
                  <li className="px-3 py-2 border-b border-gray-100 dark:border-zinc-800 mb-1">
                    <p className="font-extrabold text-sm text-[#1A3C2E] dark:text-[#E8A020] truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </li>
                  <li>
                    <Link href="/my-ideas" className="hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs">
                      My Workspace
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-interactions" className="hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs">
                      My Activity Log
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Log Out */}
              <button 
                onClick={logoutUser}
                className="btn btn-sm text-[11px] font-extrabold bg-red-600 hover:bg-red-700 border-none text-white flex items-center gap-1 cursor-pointer"
              >
                <FaSignOutAlt className="text-xs" /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                href="/login" 
                className="btn btn-sm bg-transparent border border-white text-white hover:border-[#E8A020] hover:text-[#E8A020] font-bold text-xs"
              >
                Sign In
              </Link>

              <Link 
                href="/register" 
                className="btn btn-sm bg-[#E8A020] hover:bg-[#d69018] border-none text-zinc-950 font-bold text-xs shadow"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;