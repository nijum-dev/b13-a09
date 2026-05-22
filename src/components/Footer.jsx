import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal text-base-content p-10 bg-[#1A3C2E] dark:bg-zinc-950 transition-colors duration-300">
  <aside>
    
    <a className=" text-xl font-bold text-[#FFFFFF]">🔐
            Idea<span className='text-[#E8A020]'>Vault</span></a>
    <p className='text-gray-400'>The community platform where<br />startup ideas get the validation and<br /> collaboration they deserve. Built by<br />founders, for founders.</p>
  </aside>
  <nav>
    <h6 className="footer-title text-[#ffffff] opacity-100 font-bold">Platform</h6>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Explore Ideas</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Trending</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Categories</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Add an Idea</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Bookmarks</a>
  </nav>

  <nav>
    <h6 className="footer-title text-[#ffffff] opacity-100 font-bold">Company</h6>
    <a className="link link-hover hover:text-amber-400 text-gray-300">About Us</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Blog</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Careers</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Press</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Rate us</a>
  </nav>

  <nav>
    <h6 className="footer-title text-[#ffffff] opacity-100 font-bold">Contact</h6>
    <a className="link link-hover hover:text-amber-400 text-gray-300">hello@ideavault.io
       
    </a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">+8801880812345</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Report an Issue</a>
    <a className="link link-hover hover:text-amber-400 text-gray-300">Support Center</a>
    <div className='text-white flex gap-2'>
        <a href="instagram"><FaInstagram /></a>
        <a href="Facebook"><FaFacebook /></a>
        <a href="x"><FaXTwitter/></a>
    </div>
  </nav>

</footer>
        </div>
    );
};

export default Footer;