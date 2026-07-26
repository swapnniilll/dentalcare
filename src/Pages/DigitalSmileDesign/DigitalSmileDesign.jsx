import React from 'react';
import { motion } from 'framer-motion';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';
import { FaSmile, FaLaptopMedical, FaChartLine, FaTooth, FaCamera, FaMagic } from 'react-icons/fa';
import { Link } from "react-router-dom";

const DigitalSmileDesign = () => {

  const features = [
    {
      icon: <FaCamera />,
      title: "3D Smile Preview",
      desc: "See your future smile before treatment starts using advanced digital imaging."
    },
    {
      icon: <FaLaptopMedical />,
      title: "AI Smile Planning",
      desc: "AI-powered tools design a perfect smile based on facial structure."
    },
    {
      icon: <FaSmile />,
      title: "Natural Smile Match",
      desc: "We design smiles that match your personality and face shape."
    },
    {
      icon: <FaTooth />,
      title: "Precision Dentistry",
      desc: "Highly accurate digital planning for predictable dental results."
    },
    {
      icon: <FaChartLine />,
      title: "Treatment Simulation",
      desc: "Visualize step-by-step transformation of your dental journey."
    },
    {
      icon: <FaMagic />,
      title: "Hollywood Smile Effect",
      desc: "Get a bright, confident, camera-ready smile makeover."
    }
  ];

  return (
    <main className="pt-[80px] font-poppins overflow-hidden bg-gradient-to-br from-white via-sky-50 to-cyan-50 relative">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/20 blur-3xl rounded-full"></div>

      {/* Banner */}
      <CommonBanner
        backgroundImage="/smileBanner.jpg"
        title="Smart Digital Smile Design"
        subtitle="See your future smile before treatment with AI-powered technology"
        className="bg-center"
      />

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1280px]">

          {/* Heading */}
          <CommonHeading
            mainContent="Your Smile, Designed Digitally"
            subContent="Advanced AI + 3D technology for perfect smile planning"
          />

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto text-gray-600 mt-6 mb-16 leading-8"
          >
            Digital Smile Design helps you preview your future smile before starting treatment.
            Using AI-based facial analysis and 3D simulation, we create a natural, confident,
            and perfectly balanced smile tailored just for you.
          </motion.p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-[28px] shadow-xl border border-white overflow-hidden"
              >

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                {/* Icon */}
                <div className="text-3xl text-white w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 mb-6 shadow-lg">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-7 text-[14px]">
                  {item.desc}
                </p>

                {/* Hover line animation */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-500"></div>

              </motion.div>
            ))}

          </div>

          {/* Bottom CTA */}
          <motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="mt-24 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-14 rounded-[35px] shadow-2xl"
>
  <h2 className="text-4xl font-bold mb-4">
    Design Your Perfect Smile Today
  </h2>

  <p className="max-w-2xl mx-auto text-white/90 mb-8">
    Experience the future of dentistry with AI-powered smile design technology.
  </p>

  <Link
    to="/appointment"
    className="inline-block bg-white text-cyan-600 hover:bg-cyan-50 px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-white/30"
  >
    Book Smile Consultation
  </Link>
</motion.div>

        </div>
      </section>
    </main>
  );
};

export default DigitalSmileDesign;