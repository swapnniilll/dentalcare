import React from 'react';
import { motion } from 'framer-motion';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

import {
  FaBolt,
  FaTooth,
  FaHeartbeat,
  FaShieldAlt,
  FaSmile,
  FaUserMd,
  FaCheckCircle,
  FaMagic
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const LaserDentistry = () => {

  const services = [
    {
      icon: <FaBolt />,
      title: 'Advanced Laser Technology',
      desc: 'Modern laser equipment allows highly precise dental treatments with maximum comfort.'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Minimized Pain',
      desc: 'Laser procedures reduce discomfort, bleeding, and swelling during treatments.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Faster Healing',
      desc: 'Patients experience quicker recovery and minimal downtime after laser procedures.'
    },
    {
      icon: <FaTooth />,
      title: 'Gum Reshaping',
      desc: 'Laser dentistry helps create a balanced and aesthetic gum line for a perfect smile.'
    },
    {
      icon: <FaSmile />,
      title: 'Smile Enhancement',
      desc: 'Safe cosmetic laser treatments improve smile appearance and confidence.'
    },
    {
      icon: <FaUserMd />,
      title: 'Precision Dental Care',
      desc: 'Highly accurate laser treatment ensures healthy tissues remain protected.'
    },
  ];

  const benefits = [
    'Less discomfort during treatment',
    'Minimal bleeding and swelling',
    'Faster healing process',
    'Reduced risk of infection',
    'Quick and efficient procedures',
    'Highly precise dental treatment'
  ];

  return (
    <main className="pt-[80px] font-poppins overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-blue-50 relative">

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/20 blur-3xl rounded-full"></div>

      {/* Banner */}
      <CommonBanner
        backgroundImage="/laserBanner.jpg"
        title="Laser Dentistry"
        subtitle="Comfortable, modern & minimally invasive dental treatments"
        className="bg-center"
      />

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1280px]">

          {/* Heading */}
          <CommonHeading
            mainContent="Next Generation Laser Dental Care"
            subContent="Advanced dental technology designed for precision, comfort and faster recovery"
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
              Laser Dentistry uses advanced laser technology to perform dental
              procedures with greater accuracy and minimal discomfort.
              It offers a modern, safe and effective alternative to traditional
              dental treatments with faster healing and improved patient comfort.
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

                {/* Animated Glow */}
                <div className="absolute -inset-[2px] rounded-[30px] opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 blur-sm"></div>

                {/* Card Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center text-3xl mb-8 shadow-xl group-hover:scale-110 transition duration-500">
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

                {/* Shine Effect */}
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

              <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-200/30 blur-3xl rounded-full"></div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why Choose Laser Dentistry?
              </h2>

              <p className="text-gray-600 leading-8 mb-8">
                Laser dentistry provides safer and more comfortable treatments
                using advanced dental laser technology for patients of all ages.
              </p>

              <div className="space-y-5">
                {benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center">
                      <FaCheckCircle />
                    </div>

                    <p className="text-gray-700 font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Side */}
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
                  src="/laserDentistry.jpg"
                  alt="Laser Dentistry"
                  className="w-full h-[600px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl mb-4">
                    <FaMagic />
                  </div>

                  <h3 className="text-3xl font-bold mb-2">
                    Smart & Comfortable Care
                  </h3>

                  <p className="text-white/80 max-w-sm">
                    Experience the future of dental treatments with advanced laser technology.
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
            className="mt-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[40px] p-14 text-center text-white shadow-2xl relative overflow-hidden"
          >

            <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Modern Dentistry with Laser Precision
              </h2>

              <p className="max-w-3xl mx-auto text-lg leading-9 text-white/90 mb-8">
                Enjoy safer, quicker and more comfortable dental procedures
                using advanced laser dental technology.
              </p>

              <Link
  to="/appointment"
  className="inline-block bg-white text-cyan-600 hover:bg-cyan-50 px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 hover:scale-105"
>
  Book Consultation
</Link>
            </div>

          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default LaserDentistry;