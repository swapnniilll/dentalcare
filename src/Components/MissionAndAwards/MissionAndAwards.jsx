import React from "react";
import {
  FaCheckCircle,
  FaAward,
  FaUserMd,
  FaSmileBeam,
} from "react-icons/fa";
import CommonHeading from "../CommonHeading/CommonHeading";

const MissionAndValues = () => {
  return (
    <section className="relative py-24 bg-[#EAF2FF] overflow-hidden font-poppins">
      {/* Background Effects */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00E0FF]/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#003BC4]/10 rounded-full blur-3xl"></div>

      <div className="max-w-[1300px] mx-auto px-5 relative z-10">

        {/* Heading */}

        <div className="text-center mb-20">
          <CommonHeading mainContent="Our Mission & Vision" />

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto leading-relaxed">
            We are committed to delivering advanced, comfortable, and
            compassionate dental care that creates confident smiles and
            lifelong oral health.
          </p>
        </div>

        {/* Main Section */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left Image Section */}

          <div className="relative group">

            {/* Floating Glow */}

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00E0FF]/20 rounded-full blur-3xl animate-pulse"></div>

            {/* Main Image */}

            <div className="relative overflow-hidden rounded-[35px] shadow-2xl">

              <img
                src="/ourMissionUpdate.jpg"
                alt="Dental Clinic"
                className="w-full h-[650px] object-cover group-hover:scale-110 transition-all duration-700"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#071739]/80 via-[#071739]/20 to-transparent"></div>

              {/* Floating Card */}

              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-[320px] shadow-xl animate-bounce">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#00E0FF] to-[#003BC4] flex items-center justify-center text-white text-2xl shadow-lg">
                    <FaSmileBeam />
                  </div>

                  <div>
                    <h3 className="text-white text-2xl font-bold">
                      15+ Years
                    </h3>

                    <p className="text-gray-200 text-sm">
                      Trusted Dental Experience
                    </p>
                  </div>
                </div>

                <p className="text-gray-100 leading-relaxed text-sm">
                  Creating healthy and confident smiles with modern
                  technology and expert care.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}

          <div>

            {/* Tag */}

            <div className="inline-flex items-center gap-3 bg-[#00E0FF]/10 border border-[#00E0FF]/20 px-5 py-3 rounded-full text-[#003BC4] font-semibold mb-8">

              <FaAward />

              Excellence In Dental Care
            </div>

            {/* Title */}

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#071739] mb-8">

              Advanced Dentistry
              <span className="text-[#00B7AA]"> With A Human Touch</span>
            </h2>

            {/* Description */}

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Our mission is to provide world-class dental treatments in
              a calm, welcoming, and patient-focused environment. We use
              advanced dental technologies combined with compassionate
              care to ensure every patient enjoys a stress-free and
              comfortable experience.
            </p>

            {/* Features */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

              {[
                "Modern Dental Technology",
                "Comfortable Patient Care",
                "Personalized Treatments",
                "Experienced Specialists",
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >

                  <div className="min-w-[55px] h-[55px] rounded-2xl bg-gradient-to-r from-[#00E0FF] to-[#003BC4] flex items-center justify-center text-white text-xl group-hover:rotate-12 transition-all duration-500">

                    <FaCheckCircle />

                  </div>

                  <div>

                    <h4 className="text-lg font-bold text-[#071739]">
                      {item}
                    </h4>

                    <p className="text-gray-500 text-sm mt-1">
                      Premium dental care designed for healthier smiles.
                    </p>

                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-gradient-to-r from-[#071739] to-[#102C6B] rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-500">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                    <FaUserMd />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold">20K+</h3>
                    <p className="text-gray-300 text-sm">
                      Happy Patients
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#00B7AA] to-[#00E0FF] rounded-3xl p-7 text-white shadow-xl hover:scale-105 transition duration-500">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                    <FaAward />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold">98%</h3>
                    <p className="text-white/80 text-sm">
                      Satisfaction Rate
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndValues;