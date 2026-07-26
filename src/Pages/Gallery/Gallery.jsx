import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CommonBanner from '../../Components/CommonBanner/CommonBanner';
import CommonHeading from '../../Components/CommonHeading/CommonHeading';

const API_BASE_URL = 'http://localhost:8081';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/gallery`);
        setImages(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
        setError('Unable to load the gallery right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="relative pt-[80px] font-poppins overflow-hidden bg-gradient-to-br from-white via-sky-50 to-cyan-50">

      {/* Background floating blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Banner */}
      <CommonBanner
        backgroundImage="/galleryBanner.png"
        title="3D Dental Experience Gallery"
        subtitle="Explore modern dentistry in a visually immersive way"
        className="bg-center"
      />

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-[1280px]">

          <CommonHeading
            mainContent="Interactive Smile Gallery"
            subContent="Hover, explore and experience dental care in 3D"
          />

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

          {!loading && !error && images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No gallery images available yet.</p>
            </div>
          )}

          {/* 3D GRID */}
          {!loading && !error && images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-16 perspective-1000">

              {images.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, rotateX: 20, y: 80 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative"
                >

                  {/* 3D CARD */}
                  <div
                    className="relative rounded-[28px] overflow-hidden shadow-2xl bg-white transform transition-all duration-500
                    group-hover:scale-[1.05] group-hover:rotate-x-6 group-hover:rotate-y-6"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >

                    {/* IMAGE */}
                    <img
                      src={`${API_BASE_URL}${item.imageUrl}`}
                      alt={item.title}
                      className="w-full h-[280px] object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                    {/* TEXT */}
                    <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                      <h3 className="text-lg font-semibold tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* GLOW EFFECT */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl transition"></div>

                  </div>

                </motion.div>
              ))}

            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-14 rounded-[35px] shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">
              Experience Dentistry in 3D
            </h2>
            <p className="max-w-2xl mx-auto text-white/90">
              Our clinic combines modern technology and patient care to deliver
              a smooth and comfortable dental experience.
            </p>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

export default Gallery;