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
    <div className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
    style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      <div className="flex items-center justify-between w-full max-w-screen-xl relative">

        {/* Container for Circle Content */}
        <div className="relative z-10 flex flex-col items-start ml-[620px] space-y-6">
          {/* Job Title and Experience */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-gray-400 text-lg uppercase font-light tracking-widest">
              Software Engineer
            </h2>
          </motion.div>

          {/* Dynamic Typing Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-white text-4xl font-extrabold">
              {currentText}
              <span className="text-yellow">|</span> {/* Cursor effect */}
            </h1>
          </motion.div>

          {/* Section Links */}
          <motion.div
            className="flex space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href="/about" className="text-gray-400 text-sm hover:text-yellow transition duration-300">
              About
            </Link>
            <Link href="/experience" className="text-gray-400 text-sm hover:text-yellow transition duration-300">
              Experience
            </Link>
            <Link href="/skills" className="text-gray-400 text-sm hover:text-yellow transition duration-300">
              Skills
            </Link>
            <Link href="/projects" className="text-gray-400 text-sm hover:text-yellow transition duration-300">
              Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
