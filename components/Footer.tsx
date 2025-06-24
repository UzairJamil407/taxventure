"use client";
import { Mail, Phone, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-taxventure-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="logo.png" 
                alt="Taxventure Logo" 
                className="h-8 w-auto filter brightness-0 invert"
              />
              <span className="text-xl font-bold">Taxventure</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading provider of digital invoice management solutions in Pakistan. 
              FBR-integrated SaaS platform for modern businesses.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-taxventure-red" />
                <span className="text-gray-300">taxventure.net</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-taxventure-red" />
                <span className="text-gray-300">info@taxventure.net</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-taxventure-red" />
                <span className="text-gray-300">+92 334 5450600</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-taxventure-red transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-taxventure-red transition-colors">About</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-taxventure-red transition-colors">Features</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-taxventure-red transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Invoice Management</span></li>
              <li><span className="text-gray-300">FBR Integration</span></li>
              <li><span className="text-gray-300">Digital Documentation</span></li>
              <li><span className="text-gray-300">Business Analytics</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Taxventure. All rights reserved. | FBR-Integrated Invoice Management Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
