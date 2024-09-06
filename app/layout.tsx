'use client';

import "./globals.css";

import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Animation for easing in from the right
  const iconVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2, // Stagger the animations
        ease: "easeInOut",
        duration: 0.5,
      },    
    }),
  };

  return (
    <html lang="en">
      <body className="bg-black text-white">
      <header className="flex justify-between items-center p-4 md:px-12 md:py-6">
          {/* Social Media Icons */}
          <motion.div className="flex space-x-4">
            {[
              { href: "https://facebook.com", icon: <FaFacebookF /> },
              { href: "https://instagram.com", icon: <FaInstagram /> },
              { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
              { href: "https://github.com", icon: <FaGithub /> },
              { href: "https://twitter.com", icon: <FaTwitter /> },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${social.href}`}
                className="text-yellow w-6 h-6 hover:text-white"
                custom={i} // Custom delay based on the index
                initial="hidden"
                animate="visible"
                variants={iconVariants}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Email Icon */}
          <motion.div
            custom={5} // Add delay for the email icon
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <a href="mailto:your-email@example.com" aria-label="Email" className="text-yellow w-6 h-6 hover:text-white">
              <FaEnvelope />
            </a>
          </motion.div>
        </header>

        <main>{children}</main>

        {/* <footer className="p-4 text-center text-yellow">
          © {new Date().getFullYear()} My Portfolio
        </footer> */}
      </body>
    </html>
  );
}
