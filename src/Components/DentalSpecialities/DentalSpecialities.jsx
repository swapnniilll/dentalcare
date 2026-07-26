import React from "react";
import {
  FaSmile,
  FaTeethOpen,
  FaRegGrinHearts,
  FaTeeth,
  FaTooth,
  FaArrowRight,
} from "react-icons/fa";

import CommonHeading from "../CommonHeading/CommonHeading";
import { useNavigate } from "react-router-dom";

const DentalSpecialties = () => {
  const navigate = useNavigate();

  const specialties = [
    {
      id: 1,
      title: "Digital Smile Design",
      description:
        "Advanced smile planning technology that helps create a perfectly customized smile makeover.",
      icon: <FaSmile />,
      btnPath: "/DigitalSmileDesign",
      gradient: "from-[#071739] to-[#0B1F4D]",
    },

    {
      id: 2,
      title: "Laser Dentistry",
      description:
        "Pain-free laser dental treatments with faster healing and modern precision care.",
      icon: <FaTooth />,
      btnPath: "/LaserDentistry",
      gradient: "from-[#0F2027] to-[#203A43]",
    },

    {
      id: 3,
      title: "Teeth Whitening",
      description:
        "Professional whitening treatments for brighter, cleaner, and confident smiles.",
      icon: <FaTeethOpen />,
      btnPath: "/TeethWhitening",
      gradient: "from-[#1D2671] to-[#C33764]",
    },

    {
      id: 4,
      title: "Dental Veneers",
      description:
        "Custom veneers designed to enhance the shape, color, and beauty of your teeth.",
      icon: <FaRegGrinHearts />,
      btnPath: "/DentalVeneers",
      gradient: "from-[#16222A] to-[#3A6073]",
    },

    {
      id: 5,
      title: "Full Mouth Rehabilitation",
      description:
        "Complete restoration solutions for damaged or missing teeth with advanced care.",
      icon: <FaTeeth />,
      btnPath: "/FullMouthRehabilitation",
      gradient: "from-[#141E30] to-[#243B55]",
    },

    {
      id: 6,
      title: "Kids Dental Care",
      description:
        "Gentle pediatric dental care designed for healthy smiles and happy children.",
      icon: <FaSmile />,
      btnPath: "/KidsDentalCare",
      gradient: "from-[#134E5E] to-[#71B280]",
    },
  ];

  return (
    <section className="relative py-24 bg-[#EDF2F7] overflow-hidden font-poppins">

      {/* Background Blur Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E0FF]/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#003BC4]/10 rounded-full blur-3xl"></div>

      <div className="max-w-[1300px] mx-auto px-5 relative z-10">

        {/* Heading */}

        <div className="text-center mb-20">
          <CommonHeading mainContent="Our Premium Dental Services" />

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto leading-relaxed">
            Experience modern dentistry with advanced technology,
            personalized care, and comfortable treatments for every smile.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

{specialties.map((specialty) => (
  <div
    key={specialty.id}
    className="group relative overflow-hidden rounded-[32px] p-[1px] bg-gradient-to-br from-[#00E0FF]/40 via-[#003BC4]/30 to-[#00B7AA]/40 hover:scale-[1.03] transition-all duration-700"
  >

    {/* Main Card */}

    <div className="relative h-full rounded-[32px] bg-white/80 backdrop-blur-2xl border border-white/40 overflow-hidden p-7">

      {/* Animated Glow */}

      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00E0FF]/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>

      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#003BC4]/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>

      {/* Floating Badge */}

      <div className="absolute top-5 right-5 px-4 py-1 rounded-full bg-[#071739] text-white text-xs font-semibold shadow-lg tracking-wider">
        Premium Care
      </div>

      {/* Icon Box */}

      <div className="relative mb-8">

        <div
          className={`w-24 h-24 rounded-[28px] bg-gradient-to-br ${specialty.gradient} flex items-center justify-center text-white text-4xl shadow-[0_15px_35px_rgba(0,0,0,0.15)] group-hover:rotate-[10deg] group-hover:scale-110 transition-all duration-700`}
        >
          {specialty.icon}
        </div>

        {/* Small Floating Dot */}

        <div className="absolute top-0 right-10 w-5 h-5 rounded-full bg-[#00E0FF] animate-bounce"></div>

      </div>

      {/* Content */}

      <h2 className="text-[28px] leading-tight font-extrabold text-[#071739] mb-4 group-hover:text-[#00B7AA] transition-all duration-500">

        {specialty.title}

      </h2>

      <p className="text-gray-600 text-[15px] leading-relaxed mb-8">

        {specialty.description}

      </p>

      {/* Modern Button */}

      <button
        onClick={() => navigate(specialty.btnPath)}
        className={`relative overflow-hidden px-6 py-3 rounded-2xl text-white font-semibold text-[15px] bg-gradient-to-r ${specialty.gradient} shadow-lg hover:shadow-[0_0_25px_rgba(0,224,255,0.35)] transition-all duration-500`}
      >

        {/* Shine Effect */}

        <span className="absolute top-0 left-[-120%] w-[120%] h-full bg-white/20 skew-x-12 hover:left-[120%] transition-all duration-1000"></span>

        <span className="relative z-10 flex items-center gap-3">

          Explore Service

          <FaArrowRight className="group-hover:translate-x-2 transition duration-300" />

        </span>

      </button>

      {/* Bottom Hover Line */}

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#00E0FF] via-[#003BC4] to-[#00B7AA] group-hover:w-full transition-all duration-700"></div>

    </div>
  </div>
))}
</div>
      </div>
    </section>
  );
};

export default DentalSpecialties;