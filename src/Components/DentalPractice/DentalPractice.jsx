import React from "react";
import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaFileDownload,
} from "react-icons/fa";
import CommonHeading from "../CommonHeading/CommonHeading";
import { useNavigate } from "react-router-dom";

function DentalPractice() {
  const navigate = useNavigate();

  const handlePDFDownload = () => {
    const pdfURL = "/patientForm.pdf";
    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = "patientForm.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cards = [
    {
      title: "Book Appointment",
      desc: "Schedule your dental visit with our experienced specialists for expert and personalized treatment.",
      icon: <FaCalendarAlt />,
      btn: "Book Now",
      action: () => navigate("/Appointment"),
      bg: "from-[#071739] via-[#0B1F4D] to-[#102C6B]",
    },
    {
      title: "Talk With Experts",
      desc: "Our friendly dental team is always ready to guide you with treatments and oral health advice.",
      icon: <FaPhoneAlt />,
      btn: "Contact Us",
      action: () => navigate("/contactus"),
      bg: "from-[#0F2027] via-[#203A43] to-[#2C5364]",
    },
    {
      title: "Patient Forms",
      desc: "Download and complete patient forms before your appointment for a smoother clinic experience.",
      icon: <FaFileDownload />,
      btn: "Download",
      action: handlePDFDownload,
      bg: "from-[#1D2671] via-[#C33764] to-[#6A0572]",
    },
  ];

  return (
    <section className="relative py-24 bg-[#F4F8FF] overflow-hidden font-poppins">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E0FF]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7B61FF]/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-[1250px] mx-auto px-5 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <CommonHeading mainContent="Experience Next-Level Dental Care" />

          <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Combining advanced technology, expert care, and patient comfort
            to deliver healthy, confident, and beautiful smiles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative h-[420px] rounded-[35px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4"
            >

              {/* Animated Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.bg}`}
              ></div>

              {/* Floating Glow */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-[35px] border border-white/10"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-10 text-white">

                {/* Icon */}
                <div className="w-24 h-24 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl mb-8 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  {card.icon}
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-5 leading-snug">
                  {card.title}
                </h2>

                {/* Description */}
                <p className="text-white/80 text-lg leading-relaxed mb-10">
                  {card.desc}
                </p>

                {/* Button */}
               {/* Animated Neon Button */}
<div className="mt-auto">
  <button
    onClick={card.action}
    className="relative group/btn px-8 py-4 rounded-2xl overflow-hidden font-semibold text-lg text-white transition-all duration-500 hover:scale-105"
  >

    {/* Animated Gradient BG */}
    <span className="absolute inset-0 bg-gradient-to-r from-[#00E0FF] via-[#7B61FF] to-[#00E0FF] bg-[length:200%_200%] animate-gradientMove"></span>

    {/* Glass Overlay */}
    <span className="absolute inset-[2px] rounded-2xl bg-[#071739]/90 backdrop-blur-md"></span>

    {/* Pulse Circle */}
    <span className="absolute inset-0 rounded-2xl border border-white/20 group-hover/btn:animate-ping"></span>

    {/* Button Content */}
    <span className="relative z-10 flex items-center gap-3">

      {card.btn}

      {/* Animated Icon */}
      <span className="group-hover/btn:translate-x-2 group-hover/btn:-rotate-12 transition-all duration-300">
        ✦
      </span>

    </span>

    {/* Glow Effect */}
    <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition duration-500 shadow-[0_0_35px_#00E0FF] rounded-2xl"></span>

  </button>
</div>

<style>{`
  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animate-gradientMove {
    animation: gradientMove 4s ease infinite;
  }
`}</style>
              </div>

              {/* Bottom Light */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#00E0FF] via-white to-[#7B61FF]"></div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DentalPractice;