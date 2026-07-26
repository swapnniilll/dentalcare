import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

import {
  FaStar,
  FaQuoteLeft,
  FaHeartbeat,
  FaUserFriends,
  FaSmileBeam,
  FaShieldAlt,
  FaPaperPlane,
  FaUserAlt,
  FaBriefcase,
  FaRegCommentDots,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

const API_BASE_URL = 'http://localhost:8081';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    reviewText: '',
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const highlights = [
    {
      icon: <FaSmileBeam />,
      title: 'Modern Smile Care',
      desc: 'Advanced treatments designed for healthier and brighter smiles.',
    },
    {
      icon: <FaHeartbeat />,
      title: 'Comfortable Experience',
      desc: 'Relaxing environment with patient-focused dental solutions.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Trusted Professionals',
      desc: 'Experienced dental experts providing reliable care every day.',
    },
    {
      icon: <FaUserFriends />,
      title: 'Family Friendly',
      desc: 'Personalized treatments for children, adults, and seniors.',
    },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError('Unable to load reviews right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const res = await axios.post(`${API_BASE_URL}/api/reviews`, formData);

      // Show new review instantly at the top
      setReviews([res.data, ...reviews]);

      setFormData({ name: '', role: '', reviewText: '', rating: 5 });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Something went wrong while submitting your review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-[80px] overflow-hidden font-poppins bg-gradient-to-br from-[#ffffff] via-[#f0fdfa] to-[#ccfbf1]">
      {/* Banner */}
      <CommonBanner
        backgroundImage="/reviewBanner.jpg"
        title="Patient Experiences"
        subtitle="Stories of confidence, comfort, and healthy smiles"
        className="bg-center"
      />

      {/* Background Effects */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute top-[900px] right-0 w-80 h-80 bg-blue-300/20 blur-3xl rounded-full"></div>

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1280px]">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <CommonHeading
              mainContent="Trusted by Happy Patients"
              subContent="Real feedback from people who transformed their smiles with us"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-3xl mx-auto mt-5 mb-16 leading-8 text-[15px]"
          >
            Every smile tells a story. We are proud to provide personalized
            dental care that helps our patients feel confident, comfortable,
            and cared for during every stage of their treatment journey.
          </motion.p>

          {/* Write a Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl rounded-[35px] p-8 md:p-12 shadow-2xl border border-white relative overflow-hidden mb-20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-100 blur-3xl opacity-70"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Share Your Experience
              </h2>
              <p className="text-gray-600 mb-8 text-[15px]">
                Let others know how your visit went — your feedback helps future patients.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="group">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Your Name
                    </label>
                    <div className="flex items-center bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                      <FaUserAlt className="text-cyan-500 mr-4" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent outline-none text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Treatment / Role
                    </label>
                    <div className="flex items-center bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                      <FaBriefcase className="text-cyan-500 mr-4" />
                      <input
                        type="text"
                        name="role"
                        placeholder="e.g. Dental Implant Patient"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent outline-none text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Your Review
                  </label>
                  <div className="flex bg-white rounded-2xl px-5 py-4 border border-gray-200 shadow-sm group-focus-within:border-cyan-500 transition-all">
                    <FaRegCommentDots className="text-cyan-500 mr-4 mt-1" />
                    <textarea
                      rows="4"
                      name="reviewText"
                      placeholder="Tell us about your experience..."
                      value={formData.reviewText}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent outline-none text-gray-700 resize-none"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Your Rating
                  </label>
                  <div className="flex gap-2 text-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className={`cursor-pointer transition-colors ${
                          star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white py-4 px-10 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>

              {showPopup && (
                <div className="popup-success">
                  <div className="popup-box">
                    <div className="check-icon">✔</div>
                    <h3>Review Submitted Successfully!</h3>
                    <p>Thank you for sharing your experience.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Review Cards */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && reviews.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          )}

          {!loading && !error && reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {reviews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group bg-white/70 backdrop-blur-xl rounded-[30px] p-8 border border-white shadow-xl hover:shadow-cyan-100 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 blur-3xl opacity-50"></div>

                  {/* Quote */}
                  <div className="w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl mb-6">
                    <FaQuoteLeft />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-400 mb-6 text-lg">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-600 leading-8 text-[15px] mb-8 relative z-10">
                    {item.reviewText}
                  </p>

                  {/* User Info */}
                  <div className="border-t pt-5 relative z-10">
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-cyan-600 mt-1 text-sm">
                      {item.role}
                    </p>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 rounded-[30px] border border-cyan-400/0 group-hover:border-cyan-400/40 transition-all duration-500"></div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Extra Highlight Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-24">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[28px] p-8 shadow-lg border border-gray-100 hover:shadow-cyan-100 transition-all duration-500 text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8 text-[15px]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[35px] p-14 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-6">
              Creating Healthy & Confident Smiles
            </h2>

            <p className="max-w-3xl mx-auto text-lg leading-9 text-white/90">
              Our goal is to provide exceptional dental care with comfort,
              precision, and compassion. We believe every patient deserves
              a confident smile and a positive treatment experience.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Reviews;