"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Experience from './experience/page';
import Skills from './skills/page';
import Projects from './projects/page';
import About from "./about/page";

const titles = [
  "Guy-who-loves-Coffee.tsx",
  "Code-enthusiast.tsx",
  "Creative-thinker.tsx",
  "Front-end Developer.tsx",
];

export default function Home() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed] = useState(150);
  const controls = useAnimation();

  // UseInView hooks
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
  });
  const { ref: experienceRef, inView: experienceInView } = useInView({
    triggerOnce: true,
  });
  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: projectsRef, inView: projectsInView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    if (!isDeleting && currentText.length < currentTitle.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentTitle.substring(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText.length > 0) {
      const timeout = setTimeout(() => {
        setCurrentText(currentTitle.substring(0, currentText.length - 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentText.length === currentTitle.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false);
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }
  }, [currentText, isDeleting, currentTitleIndex, typingSpeed]);

  useEffect(() => {
    controls.start({
      opacity: [1, 0],
      transition: {
        duration: 4,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="flex flex-col items-center justify-between w-full max-w-screen-xl relative">
        <motion.section className="h-screen flex items-center justify-between w-full">
          <div className="relative w-1/2 flex items-center justify-center">
            <motion.div
              className="flex flex-wrap z-10"
              initial={{ opacity: 1 }}
              animate={controls}
            >
              {Array.from({ length: 4 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex w-full justify-center">
                  {Array.from({ length: 4 }).map((_, cubeIndex) => (
                    <div key={cubeIndex} className="cube w-48 h-48">
                      <div className="wall front"></div>
                      <div className="wall back"></div>
                      <div className="wall left"></div>
                      <div className="wall right"></div>
                      <div className="wall top"></div>
                      <div className="wall bottom"></div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative w-1/2 flex flex-col items-start space-y-6 z-10">
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
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-white text-4xl font-extrabold">
                {currentText}
                <span className="text-yellow">|</span>
              </h1>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          ref={aboutRef}
          initial={{ y: 50, opacity: 0 }}
          animate={aboutInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          exit={{ y: 50, opacity: 0 }}
          id="about"
          className="w-full py-20 text-white flex flex-col items-center justify-center relative"
        >
          <About aboutInView={aboutInView} />
        </motion.section>

        <motion.section
          ref={experienceRef}
          initial={{ y: 50, opacity: 0 }}
          animate={experienceInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          exit={{ y: 50, opacity: 0 }}
          id="experience"
          className="w-full py-20"
        >
          {/* Pass in `experienceInView` prop */}
          <Experience experienceInView={experienceInView} />
        </motion.section>

        <motion.section
          ref={skillsRef}
          initial={{ y: 50, opacity: 0 }}
          animate={skillsInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          id="skills"
          className="w-full py-20"
        >
          <Skills skillsInView={skillsInView} />
        </motion.section>

        <motion.section
          ref={projectsRef}
          initial={{ y: 50, opacity: 0 }}
          animate={projectsInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          id="projects"
          className="w-full py-20"
        >
          <Projects projectsInView={projectsInView} />
        </motion.section>
      </div>
    </div>
  );
}
