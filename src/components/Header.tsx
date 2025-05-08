import React, { useState } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 py-4 px-6 shadow-xl relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="/SRM_logo.jpg" 
            alt="SRM Logo" 
            className="h-20 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="hidden md:block text-white text-lg font-medium">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-pulse">
            College Information Bot
          </span>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-blue-100 transition-colors transform hover:scale-110 duration-300"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              About
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              This AI-powered chatbot provides comprehensive information about SRM Ramapuram College, including courses, departments, facilities, admissions, and more.
            </p>
            
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Developer
            </h3>
            <p className="text-blue-100 mb-6">Sanjay and Team</p>
            
            <div className="flex flex-col space-y-4 mt-8">
              <a 
                href="https://www.linkedin.com/in/sanjay-a-749a90223/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all duration-300 group"
              >
                <Linkedin size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/sanjay-here" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all duration-300 group"
              >
                <Github size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;