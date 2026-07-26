import React from 'react';
import { motion } from 'framer-motion';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

import {
  FaTooth,
  FaSmileBeam,
  FaChild,
  FaShieldAlt,
  FaHeartbeat,
  FaStar,
  FaCheckCircle,
  FaMagic,
  FaUserMd,
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const KidsDentalCare = () => {

  const services = [
    {
      icon: <FaChild />,
      title: 'Friendly Dental Visits',
      desc: 'Comfortable and stress-free dental experiences designed specially for children.',
    },
    {
      icon: <FaTooth />,
      title: 'Cavity Prevention',
      desc: 'Protect young teeth with preventive care, fluoride treatments and dental sealants.',
    },
    {
      icon: <FaSmileBeam />,
      title: 'Healthy Smile Development',
      desc: 'We monitor growing teeth and guide proper oral habits for lifelong healthy smiles.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Gentle Pediatric Care',
      desc: 'Safe and gentle dental treatments performed using child-friendly techniques.',
    },
    {
      icon: <FaHeartbeat />,
      title: 'Pain-Free Dentistry',
      desc: 'Modern technology ensures comfortable treatment with minimal discomfort.',
    },
    {
      icon: <FaUserMd />,
      title: 'Expert Child Specialists',
      desc: 'Experienced pediatric dental care focused on children’s comfort and confidence.',
    },
  ];

  const benefits = [
    'Child-friendly dental environment',
    'Prevents cavities & tooth decay',
    'Encourages healthy oral habits',
    'Comfortable & pain-free treatment',
    'Regular growth monitoring',
    'Boosts dental confidence in kids',
  ];

  return (
    <main className="pt-[80px] font-poppins overflow-hidden bg-gradient-to-br from-pink-50 via-yellow-50 to-cyan-50 relative">

      {/* Background Effects */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-pink-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

      {/* Banner */}
      <CommonBanner
        backgroundImage="/kidsBanner.jpg"
        title="Kids Dental Care"
        subtitle="Bright smiles begin with happy dental experiences"
        className="bg-center"
      />

      <section className="relative py-20 px-6">

        <div className="container mx-auto max-w-[1280px]">

          {/* Heading */}
          <CommonHeading
            mainContent="Fun & Gentle Dental Care for Kids"
            subContent="Creating healthy smiles with love, comfort and expert pediatric care"
          />

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-4xl mx-auto mt-6 mb-20 leading-9 text-[16px]"
          >
            Our Kids Dental Care services focus on creating positive and enjoyable
            dental experiences for children. We combine advanced pediatric dentistry
            with a friendly atmosphere to help kids feel safe, comfortable and excited
            about caring for their smiles.
          </motion.p>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {services.map((item, index) => (
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
                className="group relative overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-xl border border-white shadow-2xl p-8 transition-all duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >

                {/* Animated RGB Border */}
                <div className="absolute inset-0 rounded-[32px] p-[2px] opacity-0 group-hover:opacity-100 transition duration-500 bg-[linear-gradient(90deg,#ec4899,#facc15,#06b6d4,#8b5cf6,#ec4899)] bg-[length:300%_300%] animate-[gradient_4s_linear_infinite]">

                  <div className="w-full h-full rounded-[30px] bg-white/90 backdrop-blur-xl"></div>

                </div>

                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/30 blur-3xl rounded-full"></div>

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500 text-white flex items-center justify-center text-3xl shadow-2xl mb-8"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-8 text-[15px]">
                    {item.desc}
                  </p>

                  {/* Bottom Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                    className="h-[3px] bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500 rounded-full mt-6"
                  />

                </div>

                {/* Shine Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-[32px] opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-white/20 skew-x-12 group-hover:left-[150%] transition-all duration-1000"></div>
                </div>

              </motion.div>
            ))}

          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >

            {/* Left Side */}
            <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-[35px] shadow-2xl border border-white overflow-hidden">

              <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-200/30 blur-3xl rounded-full"></div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why Parents Trust Us
              </h2>

              <p className="text-gray-600 leading-8 mb-8">
                We make every child’s dental visit fun, educational and comfortable,
                helping them develop healthy dental habits from an early age.
              </p>

              <div className="space-y-5">

                {benefits.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4"
                  >

                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white flex items-center justify-center shadow-lg">
                      <FaCheckCircle />
                    </div>

                    <p className="text-gray-700 font-medium">
                      {item}
                    </p>

                  </motion.div>
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
                  src="/kidsDental.jpg"
                  alt="Kids Dental Care"
                  className="w-full h-[620px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-8 left-8 text-white">

                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl mb-4">
                    <FaMagic />
                  </div>

                  <h3 className="text-3xl font-bold mb-2">
                    Happy Kids, Healthy Smiles
                  </h3>

                  <p className="text-white/80 max-w-sm leading-7">
                    Gentle pediatric dentistry designed to keep children smiling confidently.
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-24 relative overflow-hidden rounded-[40px] bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500 p-14 text-center text-white shadow-2xl"
          >

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
                Give Your Child a Bright Smile
              </h2>

              <p className="max-w-3xl mx-auto text-lg leading-9 text-white/90 mb-8">
                Book a fun and comfortable dental visit designed specially for kids.
              </p>

<Link to="/Appointment">
  <button className="bg-white text-pink-500 hover:bg-pink-50 px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 hover:scale-105">
    Schedule Kids Appointment
  </button>
</Link>

            </div>

          </motion.div>

        </div>

      </section>
    </main>
  );
};

export default KidsDentalCare;