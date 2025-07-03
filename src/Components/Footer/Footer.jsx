import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Logo></Logo>
        <p className="text-sm mb-2">© 2025 Recipe Book. All rights reserved.</p>
        <p className="mb-4">
          Contact:{" "}
          <a
            href="mailto:contact@recipebook.com"
            className="text-green-600 hover:underline dark:text-green-400"
          >
            contact@recipebook.com
          </a>
        </p>
        <div className="flex justify-center space-x-6 text-2xl">
          <a
            href="https://www.facebook.com/ibrahim.khalil.tushar.2024"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/iktushar01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            aria-label="X"
          >
            <FaX />
          </a>
          <a
            href="https://instagram.com/iktushar01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/iktushar01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/iktushar01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;