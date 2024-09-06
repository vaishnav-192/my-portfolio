"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
      <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        {/* Animated Image */}
        <motion.img
          src="/images/coder.png" // Replace with the actual image path
          alt="Profile Picture"
          className="w-60 h-60 rounded-full object-cover absolute top-1/4"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Animated About Section */}
        <motion.p
          className="text-white text-center text-lg max-w-2xl mt-72" // Pushed down to appear below the image
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        >
          Welcome to my portfolio! I'm a passionate developer with a love for
          creating beautiful and functional web applications. My journey in tech
          has led me to explore various frameworks and technologies, and I enjoy
          the challenge of solving complex problems. Take a look around to learn
          more about my work and experiences!
        </motion.p>
      </div>
  );
};

export default About;
