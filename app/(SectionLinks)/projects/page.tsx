"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    image: '/path-to-image1.jpg', // Replace with your project image paths
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    description: [
      'Developed a fully responsive web app.',
      'Implemented animations for smooth user experience.',
      'Used React hooks for state management.'
    ]
  },
  {
    id: 2,
    image: '/path-to-image2.jpg',
    techStack: ['Next.js', 'TypeScript', 'Styled Components'],
    description: [
      'Built a server-side rendered application.',
      'Optimized performance using Next.js features.',
      'Utilized TypeScript for static typing and better maintainability.'
    ]
  },
  // Add more projects as needed
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Handle swipe gestures
  const handleDragEnd = (event: any, info: { offset: { x: number; }; }) => {
    if (info.offset.x > 100) {
      handlePrev();
    } else if (info.offset.x < -100) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed text-yellow p-8 h-screen flex items-center justify-center relative"
    style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <h1 className="text-4xl mb-8 absolute top-8">Projects</h1>
      
      {/* Slider Container */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
        
        {/* Left Arrow */}
        <button onClick={handlePrev} className="absolute left-0 p-4 text-white text-3xl">
          <FaArrowLeft />
        </button>

        {/* Slide with Glass Effect and Swipe Gesture Support */}
        <motion.div
          key={projects[currentIndex].id}
          className="w-full max-w-lg bg-opacity-30 bg-gray-900 p-8 rounded-lg shadow-lg backdrop-blur-lg text-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {/* Project Image */}
          <img
            src={projects[currentIndex].image}
            alt="Project Image"
            className="w-full h-40 object-cover mb-4 rounded-lg"
          />
          
          {/* Tech Stack */}
          <div className="text-white mb-4">
            <h2 className="text-xl mb-2">Tech Stack</h2>
            <p>{projects[currentIndex].techStack.join(', ')}</p>
          </div>
          
          {/* Project Description */}
          <ul className="text-white text-left list-disc pl-6">
            {projects[currentIndex].description.map((desc, index) => (
              <li key={index} className="mb-2">{desc}</li>
            ))}
          </ul>
        </motion.div>

        {/* Right Arrow */}
        <button onClick={handleNext} className="absolute right-0 p-4 text-white text-3xl">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Projects;
