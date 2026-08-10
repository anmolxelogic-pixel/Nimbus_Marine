import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import { RiFacebookFill } from "react-icons/ri";
import {FaLinkedinIn,FaTwitter} from "react-icons/fa";

import {FaLocationDot,FaPhone} from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";

function Footer() {
  return (
  <footer className="bg-white">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

    {/* Footer Main Content */}
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

      {/* Company */}
      <div className="text-center sm:text-left">

        <div className="flex items-center justify-center gap-3 sm:justify-start">

          <img
            src={logo}
            alt="Core Marine Group Logo"
            className="w-12 sm:w-14"
          />

          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-black sm:text-4xl">
              CORE
            </h2>

            <p className="text-xs font-semibold uppercase tracking-wider text-black sm:text-sm">
              Marine Group
            </p>
          </div>

        </div>

        <p className="mt-5 text-sm leading-7 text-black sm:mt-6">
          Providing comprehensive maritime solutions with a
          commitment to quality, safety and excellence.
        </p>

        {/* Social Icons */}
        <div className="mt-6 flex justify-center gap-3 sm:justify-start sm:gap-4">

          <a
            href="/"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ff7a00] transition duration-300 hover:scale-105 hover:bg-orange-600"
          >
            <RiFacebookFill size={24} />
          </a>

          <a
            href="/"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ff7a00] transition duration-300 hover:scale-105 hover:bg-orange-600"
          >
            <FaLinkedinIn size={20} />
          </a>

          <a
            href="/"
            aria-label="Twitter"
            className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ff7a00] transition duration-300 hover:scale-105 hover:bg-orange-600"
          >
            <FaTwitter size={20} />
          </a>

        </div>

      </div>


      {/* Quick Links */}
      <div className="border-t border-gray-300 pt-8 text-center sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-left lg:pl-8">

        <h3 className="mb-5 text-xl font-bold uppercase text-black sm:text-2xl">
          Quick Links
        </h3>

        <ul className="space-y-3 text-sm sm:space-y-4 sm:text-base">

          <li>
            <Link
              className="text-black transition duration-300 hover:text-[#ff7a00]"
              to="/"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className="text-black transition duration-300 hover:text-[#ff7a00]"
              to="/"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              className="text-black transition duration-300 hover:text-[#ff7a00]"
              to="/"
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              className="text-black transition duration-300 hover:text-[#ff7a00]"
              to="/"
            >
              Support
            </Link>
          </li>

        </ul>

      </div>


      {/* Resources */}
      <div className="border-t border-gray-300 pt-8 text-center sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-left lg:pl-8">

        <h3 className="mb-5 text-xl font-bold uppercase text-black sm:text-2xl">
          Resources
        </h3>

        <ul className="space-y-3 text-sm sm:space-y-4 sm:text-base">

          <li>
            <Link
              className="text-black transition hover:text-[#ff7a00]"
              to="/"
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link
              className="text-black transition hover:text-[#ff7a00]"
              to="/"
            >
              Terms & Conditions
            </Link>
          </li>

          <li>
            <Link
              className="text-black transition hover:text-[#ff7a00]"
              to="/"
            >
              Documentation
            </Link>
          </li>

          <li>
            <Link
              className="text-black transition hover:text-[#ff7a00]"
              to="/"
            >
              Help Center
            </Link>
          </li>

        </ul>

      </div>


      {/* Contact */}
      <div className="border-t border-gray-300 pt-8 text-center sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-left lg:pl-8">

        <h3 className="mb-5 text-xl font-bold uppercase text-black sm:text-2xl">
          Contact Info
        </h3>

        <div className="space-y-4">

          {/* Location */}
          <div className="flex items-start justify-center gap-3 sm:justify-start">

            <FaLocationDot className="mt-1 shrink-0 text-black" />

            <p className="text-sm leading-6 text-black sm:text-base">
              Mumbai, Maharashtra
              <br />
              India
            </p>

          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-3 sm:justify-start">

            <FaPhone className="shrink-0 text-black" />

            <p className="break-all text-sm text-black sm:text-base">
              +91 9876543210
            </p>

          </div>

          {/* Email */}
          <div className="flex items-start justify-center gap-3 sm:justify-start">

            <MdEmail className="mt-1 shrink-0 text-black" />

            <p className="break-all text-sm text-black sm:text-base">
              support@coremarine.com
            </p>

          </div>

          {/* Website */}
          <div className="flex items-start justify-center gap-3 sm:justify-start">

            <BsGlobe className="mt-1 shrink-0 text-black" />

            <p className="break-all text-sm text-black sm:text-base">
              www.coremarine.com
            </p>

          </div>

        </div>

      </div>


      {/* Certifications */}
      <div className="border-t border-gray-300 pt-8 text-center sm:col-span-2 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-left lg:col-span-1 lg:pl-8">

        <h3 className="mb-6 text-xl font-bold uppercase text-black sm:text-2xl">
          Certifications
        </h3>

        <div className="space-y-6">

          {/* ISO */}
          <div className="flex items-center justify-center gap-4 sm:justify-start">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-black text-sm font-bold text-black sm:h-16 sm:w-16">
              ISO
            </div>

            <div className="text-left">

              <h4 className="text-sm font-semibold text-black sm:text-base">
                ISO 9001:2015
              </h4>

              <p className="text-xs text-black sm:text-sm">
                Quality Certified
              </p>

            </div>

          </div>


          {/* Maritime Safety */}
          <div className="flex items-center justify-center gap-4 sm:justify-start">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-black text-xl font-bold text-black sm:h-16 sm:w-16">
              ✓
            </div>

            <div className="text-left">

              <h4 className="text-sm font-semibold text-black sm:text-base">
                Maritime Safety
              </h4>

              <p className="text-xs text-black sm:text-sm">
                Certified
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>


    {/* Bottom Footer */}
    <div className="mt-12 border-t border-gray-300 pt-6 sm:mt-14 sm:pt-8">

      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">

        <p className="text-xs text-black sm:text-sm">
          © 2026 Auth Portal. All Rights Reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-x-8">

          <Link
            to="/"
            className="text-xs text-black transition hover:text-[#ff7a00] sm:text-sm"
          >
            Privacy Policy
          </Link>

          <Link
            to="/"
            className="text-xs text-black transition hover:text-[#ff7a00] sm:text-sm"
          >
            Terms of Use
          </Link>

        </div>

      </div>

    </div>

  </div>
</footer>
  );
}

export default Footer;