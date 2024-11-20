import React from 'react'
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full h-[70px] justify-between bg-white font-elmessiri flex px-8 items-center">
      <div className="flex gap-3 items-center">
        <a
          href="https://github.com/a7x3a"
          target="_blank"
          className="transition duration-700 hover:text-gray-400 active:scale-90 "
        >
          <FaGithub size={30} />
        </a>
      </div>
      <div className="text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Menuly. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer
