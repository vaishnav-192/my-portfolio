"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedHeading from "../animateHeading";

interface AboutProps {
  aboutInView: boolean;
}

const About: React.FC<AboutProps> = ({ aboutInView }) => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center relative">
      <AnimatedHeading text="ABOUT" inView={aboutInView} />
      <motion.div
        className="w-200 h-200 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: -100 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        exit={{ opacity: 0, y: -100 }}
      >
        
        <Image
          src="/images/coder.png"
          alt="Profile Picture"
          layout="responsive"
          width={200}
          height={200}
          objectFit="cover"
        />
      </motion.div>

      <motion.p
        className="text-white text-center text-lg max-w-2xl mt-8"
        initial={{ opacity: 0, y: 100 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, y: 100 }}
      >
        Welcome to my portfolio! I&apos;m a passionate developer with a love
        for creating beautiful and functional web applications. My journey
        in tech has led me to explore various frameworks and technologies,
        and I enjoy the challenge of solving complex problems. Take a look
        around to learn more about my work and experiences!
      </motion.p>
    </div>
  );
};

export default About;
