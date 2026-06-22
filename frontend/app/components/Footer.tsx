import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaGooglePlus, FaSkype } from 'react-icons/fa';
import { MdEmail, MdPhone, MdFax } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-white text-[#683D2A] border-t-4 border-[#683D2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* ABOUT US */}
          <div>
            <h3 className="text-[#683D2A] font-semibold text-lg mb-4 tracking-wide">ABOUT US</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Introduction</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Objectives</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Our Team</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Chitwan Branch</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Legal Documents</Link></li>
            </ul>
          </div>

          {/* RIGHT MENU */}
          <div>
            <h3 className="text-[#683D2A] font-semibold text-lg mb-4 tracking-wide">RIGHT MENU</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Gallery</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Testimonials</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Scholarship</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Visa Preparation Classes</Link></li>
              <li><Link href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">Test Preparation Classes</Link></li>
            </ul>
          </div>

          {/* SOCIAL LINKS - Icons and text side by side, hover only on text */}
          <div>
            <h3 className="text-[#683D2A] font-semibold text-lg mb-4 tracking-wide">SOCIAL LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <FaFacebook className="text-[#683D2A] text-base flex-shrink-0" />
                <a href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">
                  Facebook
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaTwitter className="text-[#683D2A] text-base flex-shrink-0" />
                <a href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">
                  Twitter
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-[#683D2A] text-base flex-shrink-0" />
                <a href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaGooglePlus className="text-[#683D2A] text-base flex-shrink-0" />
                <a href="#" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">
                  Google+
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="text-[#683D2A] font-semibold text-lg mb-4 tracking-wide">CONTACT US</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <MdEmail className="mt-0.5 flex-shrink-0 text-[#683D2A] text-base" />
                <span className="flex flex-col">
                  <a href="mailto:info@usconsult.edu.np" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">info@usconsult.edu.np</a>
                  <a href="mailto:us@usconsult.edu.np" className="text-[#683D2A] hover:text-white hover:bg-[#683D2A] px-2 py-1 rounded transition-all duration-200 inline-block">us@usconsult.edu.np</a>
                </span>
              </p>
              <p className="text-xs text-[#683D2A]/60 italic pl-7">(International Education Consultancy)</p>
              <p className="flex items-center gap-2 pl-1">
                <MdPhone className="text-[#683D2A] text-base flex-shrink-0" />
                <span className="text-[#683D2A]">Tel: +977-14720478, 4720385</span>
              </p>
              <p className="flex items-center gap-2 pl-1">
                <MdFax className="text-[#683D2A] text-base flex-shrink-0" />
                <span className="text-[#683D2A]">Fax: 01-4720483</span>
              </p>
              <p className="flex items-center gap-2 pl-1">
                <FaSkype className="text-[#683D2A] text-base flex-shrink-0" />
                <span className="text-[#683D2A]">Skype: useduconsult</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="border-t border-[#683D2A]/20 mt-8 pt-6 text-xs text-[#683D2A]/60 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            Copyright © 2014: US Edu Consult Pvt. Ltd. All rights reserved,
          </p>
          <p>
            Designed by <span className="text-[#683D2A] font-medium hover:text-white hover:bg-[#683D2A] px-2 py-0.5 rounded transition-all duration-200 inline-block">Radiant Infotech Nepal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;