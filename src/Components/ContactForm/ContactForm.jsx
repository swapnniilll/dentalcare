import React, { useState } from 'react';
import "./ContactForm.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaUserAlt,
  FaRegCommentDots,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';

import { motion } from 'framer-motion';
import CommonHeading from '../CommonHeading/CommonHeading';

function ContactForm() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:8081/api/contact/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {

            // Show popup
            setShowPopup(true);

            // Clear all fields
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: ""
            });

            // Hide popup after 2.5 sec
            setTimeout(() => {
                setShowPopup(false);
            }, 2500);

        } else {
            alert("Something went wrong!");
        }

    } catch (error) {
        console.log(error);
        alert("Server Error!");
    }
};

  return (
    <section className="relative overflow-hidden py-20 px-6 font-poppins bg-gradient-to-br from-white via-sky-50 to-cyan-50">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 blur-3xl rounded-full"></div>

      <div className="container mx-auto max-w-[1280px] relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <CommonHeading
            mainContent="Let’s Start Your Smile Journey"
            subContent="Connect with our dental experts for personalized care and guidance"
          />
        </motion.div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-10 mt-16 items-stretch">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl rounded-[35px] p-8 md:p-12 shadow-2xl border border-white relative overflow-hidden h-full flex flex-col"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-100 blur-3xl opacity-70"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                We’d Love to Hear From You
              </h2>

              <p className="text-gray-600 mt-5 leading-8 text-[15px]">
                Whether you want to book an appointment, ask questions,
                or learn more about our treatments, our team is ready
                to help you achieve a healthier and brighter smile.
              </p>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      First Name
                    </label>

                    <div className="flex items-center bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                      <FaUserAlt className="text-cyan-500 mr-4" />

                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent outline-none text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Last Name
                    </label>

                    <div className="flex items-center bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                      <FaUserAlt className="text-cyan-500 mr-4" />

                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent outline-none text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address
                  </label>

                  <div className="flex items-center bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                    <FaEnvelope className="text-cyan-500 mr-4" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent outline-none text-gray-700"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </label>

                  <div className="flex items-center bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                    <FaPhoneAlt className="text-cyan-500 mr-4" />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/[^0-9]/g, '')
                          .slice(0, 10);

                        setFormData({
                          ...formData,
                          phone: value,
                        });
                      }}
                      required
                      className="w-full bg-transparent outline-none text-gray-700"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Your Message
                  </label>

                  <div className="flex bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                    <FaRegCommentDots className="text-cyan-500 mr-4 mt-1" />

                    <textarea
                      rows="5"
                      name="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent outline-none text-gray-700 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-500 flex items-center justify-center gap-3"
                >
                  Send Your Message
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* 3D Animated Smile Cards */}
<div className="mt-10 perspective-[1200px]">
  
  <div className="grid grid-cols-2 gap-5">

    {/* Card 1 */}
    <div className="group relative overflow-hidden rounded-[30px] p-6 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 shadow-[0_20px_50px_rgba(168,85,247,0.35)] transform hover:-translate-y-3 hover:rotate-1 transition-all duration-700">

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div>

      {/* Floating Blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10">
        <div className="text-5xl animate-bounce">😁</div>

        <h4 className="text-white text-xl font-bold mt-5">
          Smile With Confidence
        </h4>

        <p className="text-white/90 text-[15px] leading-7 mt-3">
        A confident smile begins with healthy teeth.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="group relative overflow-hidden rounded-[30px] p-6 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_20px_50px_rgba(59,130,246,0.35)] transform hover:-translate-y-3 hover:-rotate-1 transition-all duration-700">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-lg"></div>

      {/* Animated Ring */}
      <div className="absolute top-5 right-5 w-20 h-20 border-4 border-white/20 rounded-full animate-spin"></div>

      <div className="relative z-10">
        <div className="text-5xl animate-pulse">🦷</div>

        <h4 className="text-white text-xl font-bold mt-5">
          Modern Dental Care
        </h4>

        <p className="text-white/90 text-[15px] leading-7 mt-3">
        Your smile is our favorite masterpiece.
        </p>
      </div>
    </div>

  </div>

  {/* Floating Badge */}
  <div className="flex justify-center mt-6">
    <div className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold shadow-2xl animate-pulse backdrop-blur-xl">
      ✨ Creating Beautiful Smiles Everyday ✨
    </div>
  </div>
</div>


{showPopup && (
    <div className="popup-success">
        <div className="popup-box">
            <div className="check-icon">✔</div>

            <h3>Message Sent Successfully!</h3>

            <p>Thank you for contacting us.</p>
        </div>
    </div>
)}
              </form>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8 h-full flex flex-col"
          >
            {/* Contact Cards */}
            <div className="grid gap-4">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  title: 'Visit Our Clinic',
                  text: 'Mhada Colony, Khat Road Bhandara',
                },
                {
                  icon: <FaPhoneAlt />,
                  title: 'Call Us Anytime',
                  text: '+91 123456789',
                },
                {
                  icon: <FaEnvelope />,
                  title: 'Email Support',
                  text: 'support@smartdental.com',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100 hover:shadow-cyan-100 transition-all duration-500 flex items-start gap-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center text-2xl shadow-lg">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 leading-7">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-[35px] p-10 shadow-2xl border border-gray-100 relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-100 blur-3xl opacity-60"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-800 mb-8">
                  Clinic Hours
                </h3>

                <div className="space-y-5">
                  {[
                    ['Monday', '09:00 AM - 06:00 PM'],
                    ['Tuesday', '09:00 AM - 06:00 PM'],
                    ['Wednesday', '09:00 AM - 06:00 PM'],
                    ['Thursday', '09:00 AM - 06:00 PM'],
                    ['Friday', '09:00 AM - 06:00 PM'],
                    ['Saturday', '10:00 AM - 02:00 PM'],
                    ['Sunday', 'Closed'],
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-100 pb-4"
                    >
                      <div className="flex items-center gap-3">
                        <FaClock className="text-cyan-500" />

                        <span className="font-medium text-gray-700">
                          {item[0]}
                        </span>
                      </div>

                      <span className="text-gray-600 font-medium">
                        {item[1]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Note */}
                <div className="mt-8 bg-cyan-50 rounded-2xl p-5 flex items-start gap-4">
                  <FaCheckCircle className="text-cyan-500 text-2xl mt-1" />

                  <p className="text-gray-600 leading-7">
                    Emergency appointments and personalized consultations
                    are available for patients requiring urgent dental care.
                  </p>
                </div>
                <div className="flex justify-center mt-6">
  <div className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.45)] animate-bounce backdrop-blur-xl border border-white/20">
    🦷 Transforming Smiles With Care & Confidence ✨
  </div>
</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GOOGLE MAP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-[35px] p-6 md:p-8 shadow-2xl border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-100 blur-3xl opacity-60"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center text-xl shadow-lg">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Find Us Here</h3>
                <p className="text-gray-600 text-sm">Mhada Colony, Khat Road Bhandara</p>
              </div>
            </div>

            <div className="rounded-[25px] overflow-hidden border border-gray-200 shadow-inner">
              <iframe
                title="Smart Dental Clinic Location"
                src="https://maps.google.com/maps?q=Mhada%20Colony%2C%20Khat%20Road%2C%20Bhandara&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default ContactForm;