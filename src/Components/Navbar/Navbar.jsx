import React, { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { name: "About Doctor", href: "/about-doctor" },

    {
      name: "Services",
      href: "/services",
      subItems: [
        { name: "Digital Smile Design", href: "/DigitalSmileDesign" },
        { name: "Laser Dentistry", href: "/LaserDentistry" },
        { name: "Teeth Whitening", href: "/TeethWhitening" },
        { name: "Dental Veneers", href: "/DentalVeneers" },
        { name: "Full Mouth Rehabilitation", href: "/FullMouthRehabilitation" },
        { name: "Kids Dental Care", href: "/KidsDentalCare" },
      ],
    },

    { name: "Treatments", href: "/treatments" },
    { name: "Blog", href: "/blog" },
    { name: "Reviews", href: "/reviews" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contactus" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#071739] via-[#0B1F4D] to-[#102C6B] shadow-lg z-50">

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          >
            <img
              src="/Smartdental.png"
              alt="logo"
              className="w-40 lg:w-44"
            />
          </div>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-2 xl:gap-4">

            {navItems.map((item) =>
              item.subItems ? (
                <div
                  key={item.name}
                  className="relative group"
                >
                  <NavLink
                    to={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-[17px] font-medium text-white hover:text-[#00E0FF] transition"
                  >
                    {item.name}
                    <FiChevronDown className="text-sm" />

                    <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-[#00E0FF] transition-all duration-300 transform -translate-x-1/2 group-hover:w-4/5"></span>
                  </NavLink>

                  {/* Dropdown */}

                  <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

                    {item.subItems.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.href}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#00E0FF]/10 hover:text-[#003BC4] rounded-lg"
                      >
                        {sub.name}
                      </NavLink>
                    ))}

                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-[17px] font-medium transition group ${
                      isActive
                        ? "text-[#00E0FF]"
                        : "text-white hover:text-[#00E0FF]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      <span
                        className={`absolute left-1/2 -bottom-1 h-[2px] bg-[#00E0FF] transition-all duration-300 transform -translate-x-1/2 ${
                          isActive
                            ? "w-4/5"
                            : "w-0 group-hover:w-4/5"
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              )
            )}

            {/* Button */}

            <button
              onClick={() => navigate("/Appointment")}
              className="ml-3 bg-[#00E0FF] hover:bg-white hover:text-[#071739] text-[#071739] px-6 py-3 rounded-xl text-[16px] font-semibold transition-all duration-300 whitespace-nowrap shadow-lg"
            >
              Book Appointment
            </button>

          </div>

          {/* Mobile Button */}

          <div className="lg:hidden">

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <FiX size={28} />
              ) : (
                <FiMenu size={28} />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden bg-[#071739] overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >

        <div className="px-5 flex flex-col gap-2">

          {navItems.map((item) =>
            item.subItems ? (
              <div key={item.name}>

                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between py-3 text-white font-medium cursor-pointer hover:text-[#00E0FF] transition"
                >
                  {item.name}

                  <FiChevronDown
                    className={`transition ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    dropdownOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block pl-4 py-2 text-sm text-gray-300 hover:text-[#00E0FF]"
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>

              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-white font-medium hover:text-[#00E0FF] transition"
              >
                {item.name}
              </NavLink>
            )
          )}

          <button
            onClick={() => navigate("/Appointment")}
            className="mt-3 w-full bg-[#00E0FF] hover:bg-white text-[#071739] py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Book Appointment
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;