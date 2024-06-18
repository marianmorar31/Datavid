import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} Cake Tracker. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="/" className="text-gray-300 hover:text-white mx-2">
            Home
          </a>
          <a href="/about" className="text-gray-300 hover:text-white mx-2">
            About
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white mx-2">
            Contact
          </a>
          <a
            href="/privacy-policy"
            className="text-gray-300 hover:text-white mx-2"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
