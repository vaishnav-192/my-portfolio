"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Array of titles for dynamic text
const titles = [
  "Guy-who-loves-Coffee.tsx",
  "Code-enthusiast.tsx",
  "Creative-thinker.tsx",
  "Front-end Developer.tsx",
];

export default function Home() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0); // Index of the current title
  const [currentText, setCurrentText] = useState(""); // The text being typed
  const [isDeleting, setIsDeleting] = useState(false); // Whether we're deleting the text
  const [typingSpeed, setTypingSpeed] = useState(150); // Speed of typing

  // Function to handle the typing effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex]; // Get the current title from the array

    // Handle the typing and deleting effect
    if (!isDeleting && currentText.length < currentTitle.length) {
      // If not deleting and there's still more text to type, type a character
      setTimeout(() => {
        setCurrentText(currentTitle.substring(0, currentText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && currentText.length > 0) {
      // If deleting, remove a character
      setTimeout(() => {
        setCurrentText(currentTitle.substring(0, currentText.length - 1));
      }, typingSpeed);
    } else if (!isDeleting && currentText.length === currentTitle.length) {
      // Once the typing of the full text is done, start deleting after a pause
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && currentText.length === 0) {
      // When the text is fully deleted, move to the next title
      setIsDeleting(false);
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }
  }, [currentText, isDeleting, currentTitleIndex, typingSpeed]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      {/* Big Circle */}
      <motion.div
        className="relative flex items-center justify-center border border-yellow rounded-full w-[600px] h-[600px] mt-16"
        initial={{ scale: 1, backgroundColor: "#000" }}
        animate={{
          scale: [1, 1.05, 1],
          backgroundColor: ["#000", "#222", "#000"],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      ></motion.div>
      {/* Container for Circle Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Job Title and Experience */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-gray-400 text-sm uppercase">Software Engineer</h2>
        </motion.div>

        {/* Dynamic Typing Text */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white text-2xl font-bold">
            {currentText}
            <span className="text-yellow">|</span> {/* Cursor effect */}
          </h1>
        </motion.div>

        {/* Section Links */}
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link href="/about" className="text-gray-400 text-xs hover:text-yellow">
            About
          </Link>
          <Link href="/experience" className="text-gray-400 text-xs hover:text-yellow">
            Experience
          </Link>
          <Link href="/skills" className="text-gray-400 text-xs hover:text-yellow">
            Skills
          </Link>
          <Link href="/projects" className="text-gray-400 text-xs hover:text-yellow">
            Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
