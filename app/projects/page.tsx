"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import AnimatedHeading from "../animateHeading";

// Define the Project type
interface Project {
  id: number;
  image: string;
  name: string;
  techStack: string[];
  description: string[];
}

const Projects = ({ projectsInView }: { projectsInView: boolean }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Fetch projects data from JSON file
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects.json"); // Path to your JSON file
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Autoplay logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex, projects]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Handle swipe gestures
  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handlePrev();
    } else if (info.offset.x < -100) {
      handleNext();
    }
  };

  if (projects.length === 0) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="bg-cover bg-center bg-fixed text-yellow p-8 min-h-screen flex flex-col items-center justify-start"
      // style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
      {/* Heading */}
      <motion.h2
        className="text-6xl font-bold text-white mb-8 flex space-x-10"
        initial={{ opacity: 0, y: 50 }} // Initial state when out of view
        animate={projectsInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
        transition={{ duration: 0.7 }} // Animation duration
        style={{
          textShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Animate each letter separately for a cool effect */}
        <AnimatedHeading text="PROJECTS" inView={projectsInView} />
      </motion.h2>

      {/* Slider Container */}
      <div className="relative w-full max-w-6xl h-auto flex flex-col items-center justify-center">
        {/* Slide with Glass Effect and Swipe Gesture Support */}
        <motion.div
          key={projects[currentIndex].id}
          className="w-full max-w-3xl bg-opacity-30 bg-gray-900 p-8 rounded-lg shadow-lg backdrop-blur-lg text-center flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {/* Project Image */}
          <Image
            src={projects[currentIndex].image}
            alt="Project Image"
            width={150}
            height={150}
            priority={true}
            className="w-full max-h-64 object-contain mb-4 rounded-lg"
          />

          {/* Tech Stack */}
          <div className="text-white mb-4">
            <h2 className="text-xl mb-2">{projects[currentIndex].name}</h2>
            <div className="flex flex-wrap justify-center items-center">
              {projects[currentIndex].techStack.map((tech, index) => (
                <React.Fragment key={index}>
                  <motion.span
                    className="whitespace-nowrap"
                    whileHover={{ scale: 1.2, color: "#facc15" }} // Scale up and change color on hover
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tech}
                  </motion.span>
                  {index < projects[currentIndex].techStack.length - 1 && (
                    <span className="text-yellow mx-1">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Project Description */}
          <ul className="text-white text-left list-disc pl-6">
            {projects[currentIndex].description.map((desc, index) => (
              <li key={index} className="mb-2">
                {desc}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Navigation Buttons */}
        <button
          onClick={handleNext}
          className="absolute right-0 p-4 text-white text-3xl top-1/2 transform -translate-y-1/2"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Projects;
