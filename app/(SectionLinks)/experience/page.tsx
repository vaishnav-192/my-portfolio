"use client";

import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    logo: '/images/MAQsoftware.png',
    companyName: 'MAQ Software',
    jobPosition: 'Associate Software Engineer',
    dateRange: 'Jan 2024 - July 2024',
  },
  {
    id: 2,
    logo: '/images/MAQsoftware.png',
    companyName: 'MAQ Software',
    jobPosition: 'Software Engineer 1',
    dateRange: 'July 2024 - Present',
  },
  // Add more experiences as needed
];

const Experience = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white p-8"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <h1 className="text-4xl mb-8 text-center">Experience</h1>

      {/* Timeline container */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-yellow" />

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className={`mb-12 flex flex-col items-center ${
              index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
            } relative`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Glassy Node with Gradient and Shadow */}
            <motion.div
              className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl backdrop-blur-md text-center max-w-sm w-full hover:shadow-[0px_0px_30px_5px_rgba(0,0,0,0.8)] transition-shadow"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: 'easeInOut' },
              }}
            >
              {/* Company Logo */}
              <img
                src={experience.logo}
                alt={`${experience.companyName} logo`}
                className="mx-auto mb-4 object-cover"
              />

              {/* Company Name and Position */}
              <h2 className="text-2xl font-semibold mb-2">{experience.companyName}</h2>
              <p className="text-lg text-yellow mb-2">{experience.jobPosition}</p>

              {/* Date Range */}
              <p className="text-sm text-gray-300">{experience.dateRange}</p>
            </motion.div>

            {/* Line connector */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow rounded-full border-4 border-black z-10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;


