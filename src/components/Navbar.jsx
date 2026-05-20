import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-[#1A3C2E] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold text-[#FFFFFF]">🔐
            Idea<span className='text-[#E8A020]'>Vault</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a className='text-[#FFFFFF]'>Home</a></li>
            <li><a className='text-[#FFFFFFB3]'>Ideas</a></li>
            <li><a className='text-[#FFFFFFB3]'>Add Idea<span className='text-xs text-[#E8A020] bg-[#E8A0202E] rounded-2xl p-1 font-semibold'>Private</span></a></li>
            <li className='text-[#FFFFFFB3] text-md font-semibold'><a>My Ideas<span  className='text-xs text-[#E8A020] bg-[#E8A0202E] rounded-2xl p-1 font-semibold' >Private</span></a></li>
            <li className='text-[#FFFFFFB3]'><a>My Interactions<span  className='text-xs text-[#E8A020] bg-[#E8A0202E] rounded-2xl p-1 font-semibold'>Private</span></a></li>
           
            
           
          </ul>
        </div>
        <div className="navbar-end gap-1 bg-[#1A3C2E]">
          <a className="btn bg-[#1A3C2A] border border-white text-white hover:border-[#E8A020] hover:text-[#E8A020]">Sign In</a>
          <a className="btn  bg-[#1A3C2A] border border-white text-white hover:border-[#E8A020] hover:text-[#E8A020]">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;