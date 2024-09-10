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
  Languages: Skill[];
  Frameworks: Skill[];
  Database: Skill[];
  DeveloperTools: Skill[];
} = {
  Languages: [
    { name: "C/C++", src: "/images/c++.png" },
    { name: "JavaScript", src: "/images/JavaScript.png" },
    { name: "Python", src: "/images/python.svg" },
    { name: "Java", src: "/images/java.png" },
    { name: "C#", src: "/images/cSharp.png" },
  ],
  Frameworks: [
    { name: "Node Js", src: "/images/nodejs.svg" },
    { name: "Express Js", src: "/images/ExpressJS.png" },
    { name: "React", src: "/images/react.svg" },
    { name: "Dot Net", src: "/images/dotnet.png" },
  ],
  Database: [
    { name: "MySQL", src: "/images/mysql.svg" },
    { name: "MongoDB", src: "/images/mongodb.png" },
    { name: "PostgreSQL", src: "/images/postgresql.png" },
    { name: "Redis", src: "/images/Redis.png" },
    { name: "PySpark", src: "/images/PySpark.png" },
  ],
  DeveloperTools: [
    { name: "GitHub Actions", src: "/images/github.png" },
    { name: "Azure Data Factory", src: "/images/Azure.png" },
    { name: "Docker", src: "/images/Docker.png" },
    { name: "Power BI", src: "/images/Powerbi.png" },
    { name: "REST API", src: "/images/RESTapi.png" },
    { name: "Blockchain", src: "/images/blockchain.png" },
    { name: "Kafka", src: "/images/kafka.png" },
  ],
};

const Skills = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center p-8"
    style={{ backgroundImage: "url('/images/bg.jpg')" }}>
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
