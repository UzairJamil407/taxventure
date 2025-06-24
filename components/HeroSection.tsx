"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-taxventure-gray to-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-taxventure-black leading-tight mb-6">
              Digital Invoice Management 
              <span className="text-taxventure-red"> Simplified</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Streamline your business operations with Taxventure's cutting-edge SaaS platform. 
              Fully integrated with FBR for seamless digital invoicing solutions in Pakistan.
            </p>
            
            {/* Key Benefits */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-taxventure-red" size={20} />
                <span className="text-gray-700">FBR Compliant & Integrated</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-taxventure-red" size={20} />
                <span className="text-gray-700">Cloud-Based SaaS Solution</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-taxventure-red" size={20} />
                <span className="text-gray-700">Real-time Invoice Processing</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-taxventure-red hover:bg-taxventure-red-dark text-white">
                Start Free Trial
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-taxventure-black text-taxventure-black hover:bg-taxventure-black hover:text-white">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image Element */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img 
                src="banner.png" 
                alt="Taxventure Digital Invoice Management Platform" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-taxventure-red opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-taxventure-black opacity-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;