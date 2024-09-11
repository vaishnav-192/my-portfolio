"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image'

interface ExperienceData {
  id: number;
  logo: string;
  companyName: string;
  jobPosition: string;
  dateRange: string;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences data from JSON file
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experience.json"); // Path to your JSON file
        const data = await response.json();
        setExperiences(data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  // Animation variants for each letter
  const letterAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 500, damping: 20 },
  };

  if (loading) {
    return <div>Loading experiences...</div>; // Loading state while fetching data
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Heading with fancy styling and animation */}
      <motion.h2
        className="text-6xl font-bold text-white mb-16 flex space-x-10"
        style={{
          textShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)", // Adds depth to the text
        }}
      >
        {/* Animate each letter separately for a cool effect */}
        {"EXPERIENCE".split("").map((letter, index) => (
          <motion.span
            key={index}
            className="text-yellow"
            initial="initial"
            animate="animate"
            variants={letterAnimation}
            transition={{ delay: index * 0.1 }} // Slight delay for each letter
          >
            {letter}
          </motion.span>
        ))}
      </motion.h2>

      {/* Timeline container */}
      <div className="relative w-full max-w-5xl mx-auto mt-12">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-yellow" />

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className={`mb-12 flex flex-col items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            } relative`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Glassy Node with Gradient and Shadow */}
            <motion.div
              className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl backdrop-blur-md text-center max-w-sm w-full hover:shadow-[0px_0px_30px_5px_rgba(0,0,0,0.8)] transition-shadow"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
            >
              {/* Company Logo */}
              <Image
                src={experience.logo}
                alt={`${experience.companyName} logo`}
                priority = {true}
                className="mx-auto mb-4 object-cover"
              />

              {/* Company Name and Position */}
              <h2 className="text-2xl font-semibold mb-2">
                {experience.companyName}
              </h2>
              <p className="text-lg text-yellow mb-2">
                {experience.jobPosition}
              </p>

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
