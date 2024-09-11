"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'

interface Skill {
  name: string;
  src: string;
}

interface SkillsData {
  Languages: Skill[];
  Frameworks: Skill[];
  Database: Skill[];
  DeveloperTools: Skill[];
}

const Skills = () => {
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);

  // Fetch skills data from JSON file
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills.json'); // Path to your JSON file
        const data = await response.json();
        setSkillsData(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };

    fetchSkills();
  }, []);

  if (!skillsData) {
    return <div>Loading skills...</div>; // Loading state while data is being fetched
  }

  // Animation variants for each letter
  const letterAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 500, damping: 20 },
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Heading with fancy styling and animation */}
      <motion.h2
        className="text-6xl font-bold text-white mb-8 flex space-x-10"
        style={{
          textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8)', // Adds depth to the text
        }}
      >
        {/* Animate each letter separately for a cool effect */}
        {'SKILLS'.split('').map((letter, index) => (
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

      {/* Skills section */}
      {Object.keys(skillsData).map((category) => (
        <div key={category} className="mb-12 w-full">
          <div className="flex justify-center gap-6">
            {/* Loop through each skill in the current category */}
            {skillsData[category as keyof SkillsData].map((tech) => (
              <motion.div
                key={tech.name}
                className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={tech.src}
                  alt={tech.name}
                  priority= {true}
                  width={50}
                  height={50}
                  className="w-full h-full object-contain p-2"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
