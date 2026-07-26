import React from "react";
import {
  FaTooth,
  FaUserMd,
  FaSmile,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import CommonHeading from "../CommonHeading/CommonHeading";
import dentalImage from "../../assets/dentist_1.jpg";

const features = [
  {
    icon: <FaTooth />,
    title: "Modern Technology",
    desc: "Advanced digital dentistry for precise and painless treatment.",
  },
  {
    icon: <FaUserMd />,
    title: "Expert Specialists",
    desc: "Highly experienced dental professionals dedicated to your smile.",
  },
  {
    icon: <FaSmile />,
    title: "Comfort First",
    desc: "Relaxing and stress-free dental care experience for patients.",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Emergency Support",
    desc: "Quick emergency dental assistance whenever you need us.",
  },
];

function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#ffffff] via-[#f6fcff] to-[#eaf7ff] font-poppins">

      {/* Soft Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-300/20 blur-[160px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-400/20 blur-[150px] rounded-full"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#0ea5e910_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e910_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto max-w-[1180px] px-4 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">

          <CommonHeading mainContent="Why Patients Trust Our Dental Care" />

          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            We combine modern dental innovation with compassionate care to
            create healthy, confident, and beautiful smiles for every patient.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* Glow */}
            <div className="absolute -inset-5 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 rounded-[40px] blur-3xl opacity-20 animate-pulse"></div>

            {/* Main Image */}
            <motion.div
              whileHover={{
                rotateY: 6,
                rotateX: -3,
                scale: 1.02,
              }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[35px] overflow-hidden border border-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >

              <img
                src={dentalImage}
                alt="Dental Care"
                className="w-full h-[650px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021526]/70 via-transparent to-transparent"></div>

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-5 shadow-2xl"
              >
                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
                    <FaSmile />
                  </div>

                  <div>
                    <h3 className="text-[#0f172a] text-xl font-bold">
                      15+ Years Experience
                    </h3>

                    <p className="text-gray-600 text-sm">
                      Advanced & Personalized Dental Care
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
                Advanced Smile Care
              </span>

            </div>

            {/* Title */}
            <h2 className="text-5xl lg:text-6xl font-black text-[#0f172a] leading-tight">

              Experience

              <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dentistry Reimagined
              </span>

            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mt-8">
              From preventive dentistry to smile makeovers, our clinic focuses
              on delivering high-quality treatments using advanced technology,
              gentle techniques, and patient-focused care.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">

              {features.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-cyan-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,180,255,0.18)] transition-all duration-500"
                >

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="relative z-10">

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg mb-5 group-hover:rotate-6 transition-all duration-500">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-[#0f172a] text-2xl font-bold mb-3">
                      {item.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {item.desc}
                    </p>

                  </div>

                </motion.div>
              ))}
            </div>

            {/* Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-12"
            >

              <Button
                btnContent={
                  <div className="flex items-center justify-center gap-3">
                    Schedule Your Visit
                    <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                }
                link="/Appointment"
                className="group w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white py-5 rounded-2xl text-lg font-bold shadow-[0_15px_40px_rgba(0,180,255,0.20)] hover:shadow-[0_20px_50px_rgba(0,180,255,0.35)] transition-all duration-500"
              />

            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;