import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaTooth,
  FaSmileBeam,
  FaAward,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CommonHeading from "../CommonHeading/CommonHeading";
import Button from "../Button/Button";

const DoctorProfile = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#edf4ff] via-[#f7fbff] to-[#dcecff] font-poppins">

      {/* Animated Background Glow */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/20 blur-[140px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-100px] w-[450px] h-[450px] bg-blue-500/20 blur-[140px] rounded-full animate-pulse"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto max-w-[1180px] px-4 relative z-10">

        <CommonHeading mainContent="Meet The Smile Expert" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-20">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 left-8 z-20 bg-white/80 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <FaAward className="text-white text-xl" />
                </div>

                <div>
                  <h4 className="text-[#0f172a] font-bold text-sm">
                    Certified Specialist
                  </h4>
                  <p className="text-gray-500 text-xs">
                    15+ Years Experience
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Image Card */}
            <motion.div
              whileHover={{
                rotateY: 6,
                rotateX: -4,
                scale: 1.02,
              }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[36px] overflow-hidden bg-white border border-white/50 shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
            >

              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 via-blue-400/10 to-indigo-500/20 z-0"></div>

              <img
                src="/drdentistUpdate.jpg"
                alt="Doctor"
                className="relative z-10 w-full h-[680px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081226] via-[#08122620] to-transparent z-20"></div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-30">

                <h2 className="text-4xl font-black text-white">
                  Dr. Arya Mehta
                </h2>

                <div className="flex items-center gap-3 mt-4">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 backdrop-blur-xl border border-cyan-300/30 flex items-center justify-center">
                    <FaTooth className="text-cyan-300 text-2xl" />
                  </div>

                  <div>
                    <p className="text-cyan-200 font-semibold text-lg">
                      Cosmetic & Laser Dentistry Expert
                    </p>

                    <p className="text-gray-200 text-sm">
                      Designing healthy & confident smiles
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Mini Card */}
            {/* <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 right-6 bg-white rounded-3xl shadow-2xl p-5 border border-gray-100 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <FaStar className="text-white text-xl" />
                </div>

                <div>
                  <h3 className="text-[#0f172a] text-lg font-bold">
                    4.9 Rating
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Trusted by 5k+ Patients
                  </p>
                </div>
              </div>
            </motion.div> */}

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            {/* Top Label */}
            <span className="inline-block px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold tracking-wider uppercase border border-cyan-200">
              Advanced Digital Dentistry
            </span>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-black text-[#0f172a] leading-tight mt-6">
              Creating
              <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Beautiful Smiles
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              Step into a modern dental experience focused on precision,
              comfort, and confidence. From digital smile designing to
              minimally invasive laser treatments, every procedure is tailored
              to help you achieve long-lasting oral wellness and a radiant
              smile.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">

              {/* Card 1 */}
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-white shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mb-5 shadow-lg">
                  <FaSmileBeam className="text-white text-2xl" />
                </div>

                <h3 className="text-[#0f172a] text-2xl font-bold mb-3">
                  Smile Makeovers
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Personalized cosmetic solutions designed to enhance your
                  confidence with natural-looking results.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 border border-white shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center mb-5 shadow-lg">
                  <FaTooth className="text-white text-2xl" />
                </div>

                <h3 className="text-[#0f172a] text-2xl font-bold mb-3">
                  Pain-Free Care
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Gentle and advanced treatments using the latest dental
                  technology for a stress-free experience.
                </p>
              </motion.div>

            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-12">

              {[FaPhoneAlt, FaEnvelope, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    y: -6,
                    rotate: 6,
                    scale: 1.08,
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-16 h-16 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center text-cyan-500 text-2xl hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:text-white transition-all duration-500"
                >
                  <Icon />
                </motion.a>
              ))}

            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-12"
            >
              <Button
                btnContent="Book Your Consultation"
                link="/Appointment"
                className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white py-5 rounded-2xl text-lg font-bold shadow-[0_15px_40px_rgba(59,130,246,0.25)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.45)] transition-all duration-500"
              />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;