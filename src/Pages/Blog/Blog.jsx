import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles } from 'lucide-react';
import axios from 'axios';

import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

// Update this to match your backend base URL (use an env var in production)
const API_BASE_URL = 'http://localhost:8081';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/blog`);
        setBlogPosts(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Unable to load blog posts right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="pt-[80px] bg-gradient-to-b from-cyan-50 via-white to-sky-50 overflow-hidden font-poppins">
      {/* Banner */}
      <CommonBanner
        backgroundImage="/blogBanner.jpg"
        className="bg-center"
        title="Smile Stories & Dental Insights"
        subtitle="Fresh ideas and expert guidance for a healthier smile"
      />

      {/* Background Effects */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute top-[700px] right-0 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full"></div>

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1250px]">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <CommonHeading
              mainContent="Explore Modern Dental Care"
              subContent="Helpful insights, wellness tips, and smile inspiration"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-2xl mx-auto mt-5 mb-16 text-[15px] leading-7"
          >
            Stay updated with the latest dental trends, oral care routines,
            and expert wellness advice designed to help you achieve a brighter,
            healthier, and more confident smile.
          </motion.p>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          )}

          {/* Cards */}
          {!loading && !error && blogPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-[30px] overflow-hidden border border-white shadow-lg hover:shadow-cyan-200/60 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${post.imageUrl}`}
                      alt={post.title}
                      className="w-full h-[240px] object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-cyan-500 text-white text-xs px-4 py-2 rounded-full flex items-center gap-1 shadow-md">
                        <Sparkles size={14} />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <CalendarDays size={16} />
                      {formatDate(post.date)}
                    </div>

                    {/* Title */}
                    <h3 className="text-[22px] font-bold text-gray-800 leading-[32px] mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Text */}
                    <p className="text-gray-600 text-[15px] leading-7">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-[30px] border border-cyan-400/0 group-hover:border-cyan-400/40 transition-all duration-500"></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Blog;