import React from "react";
import {
  FaSmile,
  FaUserMd,
  FaClinicMedical,
  FaHeartbeat,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { motion } from "framer-motion";
import CommonHeading from "../CommonHeading/CommonHeading";
import Button from "../Button/Button";

const benefits = [
  {
    icon: <FaUserMd />,
    title: "Elite Specialists",
    desc: "Highly experienced dental experts delivering precision care.",
  },
  {
    icon: <FaClinicMedical />,
    title: "Modern Technology",
    desc: "Advanced equipment for painless and accurate treatments.",
  },
  {
    icon: <FaSmile />,
    title: "Smile Perfection",
    desc: "Creating natural, healthy, and confident smiles every day.",
  },
  {
    icon: <GiHealthNormal />,
    title: "Preventive Focus",
    desc: "Long-term oral wellness with proactive dental care.",
  },
  {
    icon: <FaCamera />,
    title: "Digital Imaging",
    desc: "Smart diagnostics with modern digital dental scanning.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Comfort Care",
    desc: "Gentle treatments designed around patient comfort.",
  },
];

const AboutPractice = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#ffffff] via-[#f7fcff] to-[#edf8ff] font-poppins">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-cyan-300/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 blur-[140px] rounded-full"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#0ea5e910_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e910_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto max-w-[1180px] px-4 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">

          <CommonHeading mainContent="A Modern Approach to Dental Excellence" />

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed mt-6">
            Experience advanced dental care designed with innovation,
            compassion, and patient comfort at the heart of every smile.
          </p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Glow Border */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-[40px] blur-3xl opacity-20 animate-pulse"></div>

            {/* Image Card */}
            <motion.div
              whileHover={{
                rotateY: 5,
                rotateX: -3,
                scale: 1.02,
              }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[35px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >

              <img
                src="/yourDentist.jpg"
                alt="Dentist"
                className="w-full h-[680px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021526]/70 via-transparent to-transparent"></div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-5 shadow-2xl"
              >

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl">
                    <FaSmile />
                  </div>

                  <div>
                    <h3 className="text-[#0f172a] text-xl font-bold">
                      98% Happy Patients
                    </h3>

                    <p className="text-gray-600 text-sm">
                      Trusted by families for advanced dental care
                    </p>
                  </div>

                </div>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">

              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>

              <span className="text-cyan-700 uppercase tracking-[3px] text-sm font-semibold">
                Smart Dental Experience
              </span>

            </div>

            {/* Title */}
            <h2 className="text-5xl lg:text-6xl font-black text-[#0f172a] leading-tight">

              Crafted For
              <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Beautiful Smiles
              </span>

            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              At Smart Dental, we combine advanced technology with a caring
              approach to create a calm, modern, and comfortable dental
              experience for every patient.
            </p>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-5 mt-10">

              {[
                { num: "15+", text: "Years" },
                { num: "12K+", text: "Patients" },
                { num: "24/7", text: "Support" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-5 text-center shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-cyan-100"
                >
                  <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    {item.num}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* BENEFITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">

          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-[30px] bg-white border border-cyan-100 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_45px_rgba(0,180,255,0.18)] transition-all duration-500"
            >

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Floating Circle */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-40 group-hover:scale-125 transition-all duration-700"></div>

              <div className="relative z-10">

                {/* Icon */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl shadow-lg mb-6 group-hover:rotate-6 transition-all duration-500">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-[#0f172a] text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="mt-20 flex justify-center"
        >

          <Button
            btnContent={
              <div className="flex items-center justify-center gap-3">
                Book Your Dental Consultation
                <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
              </div>
            }
            link="/contactus"
            className="group bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_15px_40px_rgba(0,180,255,0.20)] hover:shadow-[0_20px_50px_rgba(0,180,255,0.35)] transition-all duration-500"
          />

        </motion.div>

      </div>
    </section>
  );
};

export default AboutPractice;