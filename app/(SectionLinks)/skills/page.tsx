// app/skills/page.tsx
"use client";

import { motion } from "framer-motion";

// Define the structure of skills data
interface Skill {
  name: string;
  src: string;
}

// Define the structure of the skillsData object
const skillsData: {
  Backend: Skill[];
  Frontend: Skill[];
  Database: Skill[];
  CI_CD: Skill[];
} = {
  Backend: [
    { name: "Node.js", src: "/images/nodejs.svg" },
    { name: "Python", src: "/images/python.svg" },
    { name: "Django", src: "/images/django.svg" },
  ],
  Frontend: [
    { name: "React", src: "/images/react.svg" },
    { name: "Angular", src: "/images/angular.svg" },
    { name: "Tailwind CSS", src: "/images/tailwind.png" },
  ],
  Database: [
    { name: "MySQL", src: "/images/mysql.svg" },
    { name: "MongoDB", src: "/images/mongodb.svg" },
    { name: "PostgreSQL", src: "/images/postgresql.svg" },
  ],
  CI_CD: [
    { name: "Jenkins", src: "/images/jenkins.svg" },
    { name: "GitHub Actions", src: "/images/github.png" },
    { name: "Docker", src: "/images/Docker.png" },
  ],
};

const Skills = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-8">
      <h2 className="text-yellow text-4xl mb-8">Skills</h2>
      {/* Loop through skill categories */}
      {Object.keys(skillsData).map((category) => (
        <div key={category} className="mb-12 w-full">
          {/* <h3 className="text-white text-2xl mb-4">{category}</h3> */}
          <div className="flex justify-center gap-6">
            {/* Loop through each skill in the current category */}
            {skillsData[category as keyof typeof skillsData].map((tech) => (
              <motion.div
                key={tech.name}
                className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={tech.src}
                  alt={tech.name}
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
