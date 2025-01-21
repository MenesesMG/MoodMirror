import React, { useState } from 'react';

export const Navigation = ({ onSelectEmotion }) => {
  const [activeLink, setActiveLink] = useState('All Items');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = ['All Items', 'Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise'];

  const handleClick = (link, event) => {
    event.preventDefault();
    setActiveLink(link);
    onSelectEmotion(link); // Call the passed function
    setDropdownOpen(false); // Close dropdown after selecting an option
  };

  return (
    <nav className="pt-5 pb-5">
      {/* Mobile dropdown */}
      <div className="block lg:hidden relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white text-gray-700 px-4 py-2 rounded shadow-md focus:outline-none"
        >
          {activeLink}
          <svg
            className={`w-5 h-5 inline-block ml-2 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-10">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className={`block px-4 py-2 text-gray-700 hover:bg-pink-500 hover:text-white ${activeLink === link ? 'bg-pink-500 text-white' : ''}`}
                  onClick={(e) => handleClick(link, e)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop navigation */}
      <ul className="hidden lg:flex flex-wrap gap-2 lg:gap-3 justify-start lg:justify-between">
          {links.map((link) => (
              <li key={link}>
                  <a
                      href="#"
                      className={`hover:text-pink-500 ${activeLink === link ? 'font-bold text-gray-700 border-b-2 border-pink-500 pb-1' : ''}`}
                      onClick={(e) => handleClick(link, e)}
                  >
                      {link}
                  </a>
              </li>
          ))}
      </ul>
    </nav>
  );
};
