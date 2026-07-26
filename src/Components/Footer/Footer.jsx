import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const services = [
    {
      name: "Digital Smile Design",
      href: "/DigitalSmileDesign",
    },
  
    {
      name: "Laser Dentistry",
      href: "/LaserDentistry",
    },
  
    {
      name: "Teeth Whitening",
      href: "/TeethWhitening",
    },
  
    {
      name: "Dental Veneers",
      href: "/DentalVeneers",
    },
  
    {
      name: "Full Mouth Rehabilitation",
      href: "/FullMouthRehabilitation",
    },
  
    {
      name: "Kids Dental Care",
      href: "/KidsDentalCare",
    },
  ];

  return (
    <footer className="relative bg-[#06142E] text-white overflow-hidden">

      {/* Top Gradient */}

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E0FF] via-[#00B7AA] to-[#003BC4]"></div>

      {/* Main Footer */}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo + About */}

          <div>

            <div
              className="flex items-center cursor-pointer mb-5"
              onClick={() => navigate("/")}
            >
              <img
                src="/Smartdental.png"
                alt="logo"
                className="w-52"
              />
            </div>

            <p className="text-gray-300 leading-7 text-[15px]">
              Smart Dental Clinic provides advanced dental treatments
              with modern technology, experienced doctors, and
              comfortable patient care.
            </p>

            {/* Social Icons */}

            <div className="flex items-center gap-4 mt-6">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00E0FF] hover:text-[#06142E] flex items-center justify-center transition-all duration-300"
                title="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00E0FF] hover:text-[#06142E] flex items-center justify-center transition-all duration-300"
                title="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00E0FF] hover:text-[#06142E] flex items-center justify-center transition-all duration-300"
                title="Twitter"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00E0FF] hover:text-[#06142E] flex items-center justify-center transition-all duration-300"
                title="Linkdin"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>

          {/* Quick Links */}

          <div>

            <h2 className="text-2xl font-semibold mb-6 text-[#00E0FF]">
              Quick Links
            </h2>

            <ul className="space-y-4">

              {[
                { name: "About Doctor", path: "/about-doctor" },
                { name: "Treatments", path: "/treatments" },
                { name: "Reviews", path: "/reviews" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact Us", path: "/contactus" },
              ].map((item) => (
                <li key={item.name}>

                  <NavLink
                    to={item.path}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#00E0FF] transition-all duration-300"
                  >
                    <FaArrowRight className="text-sm" />
                    {item.name}
                  </NavLink>

                </li>
              ))}

            </ul>
          </div>

          {/* Services */}

          <div>

            <h2 className="text-2xl font-semibold mb-6 text-[#00E0FF]">
              Our Services
            </h2>

            <ul className="space-y-4">

            {services.map((service, index) => (
  <NavLink
    key={index}
    to={service.href}
    className="flex items-center gap-2 text-gray-300 hover:text-[#00E0FF] transition-all duration-300"
  >
    <FaArrowRight className="text-sm" />

    {service.name}
  </NavLink>
))}

            </ul>
          </div>

          {/* Contact Info */}

          <div>

            <h2 className="text-2xl font-semibold mb-6 text-[#00E0FF]">
              Contact Info
            </h2>

            <div className="space-y-5">

              <div className="flex items-start gap-4">

                <div className="min-w-[45px] h-[45px] rounded-full bg-[#00E0FF]/10 flex items-center justify-center text-[#00E0FF]">
                  <FaMapMarkerAlt />
                </div>

                <p className="text-gray-300 leading-7">
                 Mhada Colony Khat Road,
                 Bhandara
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="min-w-[45px] h-[45px] rounded-full bg-[#00E0FF]/10 flex items-center justify-center text-[#00E0FF]">
                  <FaPhoneAlt />
                </div>

                <p className="text-gray-300">
                  +91 1234567890 
                </p>

              </div>

              <div className="flex items-center gap-4">

                <div className="min-w-[45px] h-[45px] rounded-full bg-[#00E0FF]/10 flex items-center justify-center text-[#00E0FF]">
                  <FaEnvelope />
                </div>

                <p className="text-gray-300">
                  smartdental@gmail.com
                </p>

              </div>

            </div>

            {/* Appointment Button */}

            <button
              onClick={() => navigate("/Appointment")}
              className="mt-8 bg-gradient-to-r from-[#00E0FF] to-[#00B7AA] hover:scale-105 transition-all duration-300 text-[#06142E] px-7 py-3 rounded-xl font-semibold shadow-xl"
            >
              Book Appointment
            </button>

          </div>
        </div>

        {/* Bottom Footer */}

        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm text-center lg:text-left">
            © {new Date().getFullYear()} Smart Dental Clinic.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">

            <a
              href="#"
              className="text-gray-400 hover:text-[#00E0FF] transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-[#00E0FF] transition"
            >
              Terms & Conditions
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;