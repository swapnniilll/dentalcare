import React from 'react';
import { motion } from 'framer-motion';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

import {
  FaTooth,
  FaSmileBeam,
  FaUserMd,
  FaHeartbeat,
  FaTeeth,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
  FaMagic,
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const FullMouthRehabilitation = () => {

  const rehabServices = [
    {
      icon: <FaTooth />,
      title: 'Complete Smile Restoration',
      desc: 'Restore damaged, worn or missing teeth with advanced full mouth rehabilitation treatments.',
    },
    {
      icon: <FaSmileBeam />,
      title: 'Smile Makeover',
      desc: 'Improve your confidence with a beautiful, balanced and natural-looking smile transformation.',
    },
    {
      icon: <FaTeeth />,
      title: 'Bite Correction',
      desc: 'Correct bite alignment issues to improve chewing comfort and jaw functionality.',
    },
    {
      icon: <FaUserMd />,
      title: 'Personalized Treatment',
      desc: 'Customized rehabilitation plans designed according to your dental condition and goals.',
    },
    {
      icon: <FaHeartbeat />,
      title: 'Pain-Free Dentistry',
      desc: 'Modern techniques and sedation options ensure a smooth and comfortable experience.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Long-Term Oral Health',
      desc: 'Strengthen your teeth and gums while preventing future dental complications.',
    },
  ];

  const benefits = [
    'Restores chewing efficiency',
    'Improves facial aesthetics',
    'Corrects severely damaged teeth',
    'Enhances confidence and comfort',
    'Supports long-term oral health',
    'Customized smile rehabilitation',
  ];

  return (
    <main className="pt-[80px] font-poppins overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50 relative">

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 blur-3xl rounded-full"></div>

      {/* Banner */}
      <CommonBanner
        backgroundImage="/rehabilitationBanner.jpg"
        title="Full Mouth Rehabilitation"
        subtitle="Rebuild your smile, confidence and oral health"
        className="bg-center"
      />

      <section className="relative py-20 px-6">

        <div className="container mx-auto max-w-[1280px]">

          {/* Heading */}
          <CommonHeading
            mainContent="Advanced Full Mouth Rehabilitation"
            subContent="Comprehensive solutions for complete dental restoration"
          />

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-4xl mx-auto mt-6 mb-20 leading-9 text-[16px]"
          >
            Full Mouth Rehabilitation combines restorative, cosmetic and functional
            dental procedures to rebuild your oral health. From damaged teeth and bite
            correction to smile enhancement, our treatments are designed to restore
            comfort, confidence and functionality.
          </motion.p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {rehabServices.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -12,
                  rotateX: 4,
                  rotateY: 4,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-xl border border-white shadow-2xl p-8 transition-all duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-[32px] p-[2px] opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(90deg,#06b6d4,#3b82f6,#8b5cf6,#06b6d4)] bg-[length:300%_300%] animate-[gradient_4s_linear_infinite]">

                  <div className="w-full h-full rounded-[30px] bg-white/90 backdrop-blur-xl"></div>

                </div>

                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-200/30 blur-3xl rounded-full"></div>

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white flex items-center justify-center text-3xl shadow-2xl mb-8"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-cyan-600 transition duration-300">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-gray-600 leading-8 text-[15px]">
                    {item.desc}
                  </p>

                  {/* Bottom Animation */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                    className="h-[3px] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-6"
                  />

                </div>

                {/* Shine Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-white/20 skew-x-12 group-hover:left-[150%] transition-all duration-1000"></div>
                </div>

              </motion.div>
            ))}

          </div>

          {/* Benefits + Image */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >

            {/* Left */}
            <div className="relative bg-white/70 backdrop-blur-xl p-10 rounded-[35px] shadow-2xl border border-white overflow-hidden">

              <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-200/30 blur-3xl rounded-full"></div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why Choose Full Mouth Rehabilitation?
              </h2>

              <p className="text-gray-600 leading-8 mb-8">
                Our rehabilitation treatments restore oral function, improve smile aesthetics,
                and help patients regain confidence with modern restorative dentistry.
              </p>

              <div className="space-y-5">
                {benefits.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4"
                  >

                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                      <FaCheckCircle />
                    </div>

                    <p className="text-gray-700 font-medium">
                      {item}
                    </p>

                  </motion.div>
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
                  src="/rehabilitation.jpg"
                  alt="Full Mouth Rehabilitation"
                  className="w-full h-[620px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl mb-4">
                    <FaMagic />
                  </div>

                  <h3 className="text-3xl font-bold mb-2">
                    Rebuild Your Smile
                  </h3>

                  <p className="text-white/80 max-w-sm leading-7">
                    Restore oral function, beauty and confidence with advanced rehabilitation solutions.
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
            className="mt-24 relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 p-14 text-center text-white shadow-2xl"
          >

            {/* Floating Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-24 -right-24 w-60 h-60 border border-white/20 rounded-full"
            />

            <div className="relative z-10">

              <h2 className="text-4xl font-bold mb-6">
                Start Your Smile Transformation
              </h2>

              <p className="max-w-3xl mx-auto text-lg leading-9 text-white/90 mb-8">
                Experience comprehensive restorative dentistry designed to rebuild
                your smile, oral health and confidence.
              </p>

              <Link
  to="/appointment"
  className="inline-block bg-white text-cyan-600 hover:bg-cyan-50 px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 hover:scale-105"
>
  Schedule Consultation
</Link>

            </div>

          </motion.div>

        </div>

      </section>
    </main>
  );
};

export default FullMouthRehabilitation;