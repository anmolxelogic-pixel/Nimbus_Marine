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
    <footer className="bg-gray-200 text-white">
      <div className="max-w-7xl mx-auto px-2 py-8">

        <div className="grid md:grid-cols-5 text-center  sm:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt="logo"
                className="w-14"
              />

              <div>
                <h2 className="text-4xl font-extrabold uppercase text-black tracking-wide">
                  CORE
                </h2>

                <p className="uppercase font-semibold text-black text-sm tracking-wider">
                  Marine Group
                </p>
              </div>
            </div>

            <p className="text-black leading-8 text-[15px] mt-6">
              Providing comprehensive maritime solutions with a
              commitment to quality, safety and excellence.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="/"
                className="bg-[#ff7a00] w-12 h-12 rounded-md flex justify-center items-center hover:scale-105 duration-300"
              >
                <RiFacebookFill  size={26} />
              </a>

              <a
                href="/"
                className="bg-[#ff7a00] w-12 h-12 rounded-md flex justify-center items-center hover:scale-105 duration-300"
              >
                <FaLinkedinIn size={22} />
              </a>

              <a
                href="/"
                className="bg-[#ff7a00] w-12 h-12 rounded-md flex justify-center items-center hover:scale-105 duration-300"
              >
                <FaTwitter size={22} />
              </a>

            </div>
          </div>

          

          <div className="border-l border-black pl-8">

            <h3 className="text-black uppercase text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-black">

              <li>
                <Link className="hover:text-[#ff7a00] duration-300" to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Profile
                </Link>
              </li>

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Support
                </Link>
              </li>

            </ul>

          </div>

         

          <div className="border-l border-black pl-8">

            <h3 className=" text-black uppercase text-2xl font-bold mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-black">

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Documentation
                </Link>
              </li>

              <li>
                <Link className="hover:text-[#ff7a00]" to="/">
                  Help Center
                </Link>
              </li>

            </ul>

          </div>

          

          <div className="border-l border-black pl-8">

            <h3 className="text-black uppercase text-2xl font-bold mb-6">
              Contact Info
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3">
                <FaLocationDot
                  className="text-black mt-1"
                />
                <p className="text-black">
                  Mumbai, Maharashtra
                  <br />
                  India
                </p>
              </div>

              <div className="flex gap-3">
                <FaPhone className="text-black" />
                <p className="text-black">+91 9876543210</p>
              </div>

              <div className="flex gap-3">
                <MdEmail className="text-black" />
                <p className="text-black">support@coremarine.com</p>
              </div>

              <div className="flex gap-3">
                <BsGlobe className="text-black" />
                <p className="text-black">www.coremarine.com</p>
              </div>

            </div>

          </div>


          <div className="border-l border-black pl-8">

            <h3 className="text-black uppercase text-2xl font-bold mb-6">
              Certifications
            </h3>

            <div className="space-y-8">

              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center text-black font-bold">
                  ISO
                </div>

                <div>
                  <h4 className="font-semibold text-black">
                    ISO 9001:2015
                  </h4>

                  <p className="text-black">
                    Quality Certified
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">

                <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center text-black font-bold">
                  ✓
                </div>

                <div className="text-black">
                  <h4 className="font-semibold">
                    Maritime Safety
                  </h4>

                  <p className="text-black">
                    Certified
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-black">
            © 2026  Auth Portal. All Rights Reserved.
          </p>

          <div className="flex gap-8 mt-5 md:mt-0">

            <Link
              to="/"
              className="text-black hover:text-[#ff7a00]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="text-black hover:text-[#ff7a00]"
            >
              Terms of Use
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;