"use client";
import { Button } from "@/components/ui/button";
import { Award, Target, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-taxventure-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-taxventure-black mb-6">
              About Taxventure
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Taxventure is Pakistan's leading provider of digital invoice management solutions. 
              We specialize in creating SaaS platforms that integrate seamlessly with the Federal 
              Board of Revenue (FBR) to ensure complete compliance and streamlined operations.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center mt-1">
                  <Target className="text-taxventure-red" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-taxventure-black mb-2">Our Mission</h3>
                  <p className="text-gray-600">To digitize and simplify invoice management for businesses across Pakistan, ensuring FBR compliance and operational efficiency.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center mt-1">
                  <Lightbulb className="text-taxventure-red" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-taxventure-black mb-2">Our Vision</h3>
                  <p className="text-gray-600">To become the most trusted digital partner for businesses seeking innovative financial technology solutions in Pakistan.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center mt-1">
                  <Award className="text-taxventure-red" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-taxventure-black mb-2">Our Commitment</h3>
                  <p className="text-gray-600">Delivering reliable, secure, and user-friendly solutions that meet the highest standards of quality and compliance.</p>
                </div>
              </div>
            </div>

            <Button className="bg-taxventure-red hover:bg-taxventure-red-dark text-white">
              Learn More About Us
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-taxventure-red mb-2">100+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-taxventure-red mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-taxventure-red mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl font-bold text-taxventure-red mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
