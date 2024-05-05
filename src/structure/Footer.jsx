import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-50 py-8">
      <div className="container mx-auto flex flex-col justify-center items-center">
        {/* Redes sociales */}
        <div className="flex items-center mb-6">
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300 mx-4 md:mx-8 transition duration-300"><FaTwitter size={24} /></a>
          <a href="https://instagram.com" className="text-pink-400 hover:text-pink-300 mx-4 md:mx-8 transition duration-300"><FaInstagram size={24} /></a>
          <a href="https://telegram.org" className="text-blue-500 hover:text-blue-400 mx-4 md:mx-8 transition duration-300"><FaTelegram size={24} /></a>
          <a href="https://youtube.com" className="text-red-500 hover:text-red-400 mx-4 md:mx-8 transition duration-300"><FaYoutube size={24} /></a>
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-500 mx-4 md:mx-8 transition duration-300"><FaFacebookF size={24} /></a>
        </div>
        {/* Texto */}
        <p className="text-center md:text-left">Don't forget to follow us on our social media to stay updated!</p>
      </div>
    </footer>
  );
}

export default Footer;
