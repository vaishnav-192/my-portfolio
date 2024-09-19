import { motion } from "framer-motion";

const AnimatedHeading = ({ text, inView }) => {
  return (
    <motion.h2
      className="text-6xl font-bold text-white mb-16 flex space-x-10"
      style={{
        textShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)", // Adds depth to the text
      }}
      initial={{ opacity: 0, y: 50 }} // Initial state when out of view
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
      transition={{ duration: 0.7 }} // Animation duration
    >
      {/* Animate each letter separately for a cool effect */}
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          className="text-yellow"
          initial={{ opacity: 0, y: 50 }} // Initial state for each letter
          animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
          transition={{ delay: index * 0.1 }} // Slight delay for each letter
        >
          {letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedHeading;
