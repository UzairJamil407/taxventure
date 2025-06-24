"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="logo.png" 
              alt="Taxventure Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-taxventure-black">Taxventure</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-taxventure-red transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-taxventure-red transition-colors">About</a>
            <a href="#features" className="text-gray-700 hover:text-taxventure-red transition-colors">Features</a>
            <a href="#contact" className="text-gray-700 hover:text-taxventure-red transition-colors">Contact</a>
            <Button 
              className="bg-taxventure-red hover:bg-taxventure-red-dark text-white"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-taxventure-red transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-taxventure-red transition-colors">About</a>
              <a href="#features" className="text-gray-700 hover:text-taxventure-red transition-colors">Features</a>
              <a href="#contact" className="text-gray-700 hover:text-taxventure-red transition-colors">Contact</a>
              <Button 
                className="bg-taxventure-red hover:bg-taxventure-red-dark text-white w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;