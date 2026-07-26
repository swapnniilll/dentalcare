import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTooth,
  FaSmile,
  FaTeethOpen,
  FaShieldAlt,
  FaUserMd,
  FaChild,
  FaXRay,
  FaClinicMedical,
  FaProcedures,
  FaHeartbeat,
} from 'react-icons/fa';

import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

const Treatments = () => {
  const treatments = [
    {
      id: 1,
      icon: <FaTooth />,
      title: 'Dental Implants',
      description:
        'Permanent tooth replacement with natural look and long-lasting strength.',
    },
    {
      id: 2,
      icon: <FaSmile />,
      title: 'Teeth Whitening',
      description:
        'Safe professional whitening for a brighter confident smile.',
    },
    {
      id: 3,
      icon: <FaTeethOpen />,
      title: 'Orthodontic Treatment',
      description:
        'Advanced braces & aligners for perfect teeth alignment.',
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      title: 'Preventive Dentistry',
      description:
        'Regular cleaning & checkups to prevent dental issues.',
    },
    {
      id: 5,
      icon: <FaHeartbeat />,
      title: 'Emergency Care',
      description:
        'Immediate treatment for pain, infection or injury.',
    },
    {
      id: 6,
      icon: <FaUserMd />,
      title: 'Cosmetic Dentistry',
      description:
        'Smile enhancement with modern aesthetic treatments.',
    },
    {
      id: 7,
      icon: <FaProcedures />,
      title: 'Full Mouth Rehabilitation',
      description:
        'Complete restoration of oral health and function.',
    },
    {
      id: 8,
      icon: <FaChild />,
      title: 'Kids Dental Care',
      description:
        'Gentle dental care for children with comfort and care.',
    },
    {
      id: 9,
      icon: <FaXRay />,
      title: 'Laser Dentistry',
      description:
        'Pain-free precise treatments using laser technology.',
    },
    {
      id: 10,
      icon: <FaClinicMedical />,
      title: 'Root Canal Treatment',
      description:
        'Painless treatment to save infected teeth.',
    },
    {
      id: 11,
      icon: <FaShieldAlt />,
      title: 'Gum Treatment',
      description:
        'Treatment for bleeding gums and gum infections.',
    },
    {
      id: 12,
      icon: <FaSmile />,
      title: 'Smile Makeover',
      description:
        'Complete transformation of your smile aesthetics.',
    },
  ];

  return (
    <main className="pt-[80px] overflow-hidden font-poppins bg-gradient-to-br from-white via-sky-50 to-cyan-50">

      {/* Banner */}
      <CommonBanner
        backgroundImage="/servicesBanner.jpg"
        title="Advanced Dental Treatments"
        subtitle="Modern care solutions for healthy & beautiful smiles"
        className="bg-center"
      />

      {/* Glow background */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 blur-3xl rounded-full"></div>

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1280px]">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CommonHeading
              mainContent="Complete Dental Care Solutions"
              subContent="Advanced treatments with expert precision & modern technology"
            />
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">

          {treatments.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.07 }}
    viewport={{ once: true }}
    whileHover={{ y: -14, scale: 1.04 }}
    className="relative group"
  >

    {/* ✨ FLOWING BORDER EFFECT */}
    <div className="absolute inset-0 rounded-[28px] p-[2px] overflow-hidden opacity-0 group-hover:opacity-100 transition duration-500">

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-[flow_3s_linear_infinite] blur-[1px]"></div>

    </div>

    {/* CARD */}
    <div className="relative bg-white/80 backdrop-blur-xl rounded-[28px] p-8 shadow-lg border border-white overflow-hidden transition-all duration-500">

      {/* ✨ SHIMMER OVERLAY */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="absolute -left-full top-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-shimmer"></div>
      </div>

      {/* ICON */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.15, rotate: 6 }}
        className="w-20 h-20 flex items-center justify-center text-3xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-md mb-6"
      >
        {item.icon}
      </motion.div>

      {/* TITLE (ANIMATED TEXT) */}
      <motion.h3
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition"
      >
        {item.title}
      </motion.h3>

      {/* DESCRIPTION (FADE SLIDE) */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 leading-7 text-[15px]"
      >
        {item.description}
      </motion.p>

    </div>
  </motion.div>
))}

          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center p-14 rounded-[35px] shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-5">
              Healthy Smile Starts With Us
            </h2>
            <p className="max-w-3xl mx-auto text-lg leading-8 text-white/90">
              We combine modern dental technology with expert care to deliver
              safe, comfortable, and long-lasting dental treatments.
            </p>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default Treatments;