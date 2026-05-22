import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-[#1A3C2E] shadow-sm px-4">

        {/* Navbar Start */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1A3C2E] rounded-box w-52"
            >
              <li>
                <Link href="/" className="text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/ideas" className="text-white">
                  Ideas
                </Link>
              </li>

              <li>
                <Link href="/idea-form" className="text-white">
                  Add Idea
                </Link>
              </li>

              <li>
                <Link href="/my-ideas" className="text-white">
                  My Ideas
                </Link>
              </li>

              <li>
                <Link href="/my-interactions" className="text-white">
                  My Interactions
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <a className="btn btn-ghost text-xl font-bold text-white hidden lg:block">
            🔐 Idea<span className="text-[#E8A020]">Vault</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

            <li>
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/ideas" className="text-[#FFFFFFB3]">
                Ideas
              </Link>
            </li>

            <li>
              <Link href="/idea-form" className="text-[#FFFFFFB3]">
                Add Idea
              </Link>
            </li>

            <li>
              <Link href="/my-ideas" className="text-[#FFFFFFB3]">
                My Ideas
              </Link>
            </li>

            <li>
              <Link href="/my-interactions" className="text-[#FFFFFFB3]">
                My Interactions
              </Link>
            </li>

          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">

          <a className="btn bg-[#1A3C2E] border border-white text-white hover:border-[#E8A020] hover:text-[#E8A020]">
            Sign In
          </a>

          <a className="btn bg-[#1A3C2E] border border-white text-white hover:border-[#E8A020] hover:text-[#E8A020]">
            Register
          </a>

        </div>
      </div>
    </div>
  );
};

export default Navbar;