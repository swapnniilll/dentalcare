import React from 'react';
import { motion } from 'framer-motion';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

import {
  FaSmileBeam,
  FaMagic,
  FaTooth,
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaGem,
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const TeethWhitening = () => {

  const services = [
    {
      icon: <FaSmileBeam />,
      title: 'Instant Bright Smile',
      desc: 'Professional whitening treatments designed to remove stains and restore natural brightness.',
    },
    {
      icon: <FaMagic />,
      title: 'Advanced Whitening Technology',
      desc: 'Modern dental whitening systems provide safe and effective smile enhancement.',
    },
    {
      icon: <FaTooth />,
      title: 'Safe Enamel Protection',
      desc: 'Our treatments brighten your teeth while protecting enamel and oral health.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Long Lasting Results',
      desc: 'Enjoy a brighter smile with treatments designed for durable whitening effects.',
    },
    {
      icon: <FaClock />,
      title: 'Quick Treatment Sessions',
      desc: 'Get noticeable whitening results in minimal treatment time.',
    },
    {
      icon: <FaGem />,
      title: 'Premium Smile Makeover',
      desc: 'Enhance confidence and appearance with a fresh, glowing smile.',
    },
  ];

  const benefits = [
    'Removes deep stains effectively',
    'Improves confidence instantly',
    'Safe and pain-free procedure',
    'Fast visible whitening results',
    'Professional dental supervision',
    'Brightens natural smile appearance',
  ];

  return (
    <main className="pt-[80px] font-poppins overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-cyan-50 relative">

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-yellow-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300/20 blur-3xl rounded-full"></div>

      {/* Banner */}
      <CommonBanner
        backgroundImage="/teethWhiteningBanner.jpg"
        title="Teeth Whitening"
        subtitle="Reveal a brighter, whiter and more confident smile"
        className="bg-center"
      />

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1280px]">

          {/* Heading */}
          <CommonHeading
            mainContent="Professional Teeth Whitening"
            subContent="Advanced cosmetic dentistry for naturally brighter smiles"
          />

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mt-6 mb-20"
          >
            <p className="text-gray-600 leading-9 text-[16px]">
              Teeth Whitening is one of the most popular cosmetic dental treatments
              that helps remove stains and discoloration caused by coffee, tea,
              smoking, and daily habits. Our advanced whitening technology delivers
              safe, fast and effective results for a radiant smile.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {services.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -12,
                  rotateX: 5,
                  rotateY: 5,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[30px] bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-8 transition-all duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >

                {/* RGB Glow Border */}
                <div className="absolute -inset-[2px] rounded-[30px] opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-yellow-400 via-cyan-400 to-blue-500 blur-sm"></div>

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-yellow-400 to-cyan-500 text-white flex items-center justify-center text-3xl mb-8 shadow-xl group-hover:scale-110 transition duration-500">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-gray-600 leading-8 text-[15px]">
                    {item.desc}
                  </p>

                </div>

                {/* Shine Animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-white/20 skew-x-12 group-hover:left-[140%] transition-all duration-1000"></div>
                </div>

              </motion.div>
            ))}

          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >

            {/* Left */}
            <div className="relative bg-white/70 backdrop-blur-xl p-10 rounded-[35px] shadow-2xl border border-white overflow-hidden">

              <div className="absolute top-0 right-0 w-52 h-52 bg-yellow-200/30 blur-3xl rounded-full"></div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Benefits of Teeth Whitening
              </h2>

              <p className="text-gray-600 leading-8 mb-8">
                Professional whitening treatments improve smile brightness safely
                while enhancing confidence and appearance.
              </p>

              <div className="space-y-5">
                {benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-cyan-500 text-white flex items-center justify-center">
                      <FaCheckCircle />
                    </div>

                    <p className="text-gray-700 font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative"
            >

              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                <img
                  src="/teethWhitening.jpg"
                  alt="Teeth Whitening"
                  className="w-full h-[600px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl mb-4">
                    <FaStar />
                  </div>

                  <h3 className="text-3xl font-bold mb-2">
                    Brighten Your Confidence
                  </h3>

                  <p className="text-white/80 max-w-sm">
                    Enjoy a naturally radiant smile with advanced whitening care.
                  </p>
                </div>

              </div>

            </motion.div>

          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-r from-yellow-400 to-cyan-500 rounded-[40px] p-14 text-center text-white shadow-2xl relative overflow-hidden"
          >

            <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Achieve a Dazzling White Smile
              </h2>

              <p className="max-w-3xl mx-auto text-lg leading-9 text-white/90 mb-8">
                Experience advanced whitening treatments for a brighter,
                fresher and more confident smile.
              </p>

              <Link
  to="/appointment"
  className="inline-block bg-white text-cyan-600 hover:bg-cyan-50 px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 hover:scale-105"
>
  Book Whitening Session
</Link>
            </div>

          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default TeethWhitening;