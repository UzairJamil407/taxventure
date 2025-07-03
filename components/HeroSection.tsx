"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, X, User, Building, Phone, Mail, ExternalLink } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    contactNumber: '',
    email: ''
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTrialSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send trial signup data to your API
      const response = await fetch('/api/trial-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Show demo credentials
        setShowTrialForm(false);
        setShowDemoCredentials(true);
        // Reset form
        setFormData({
          name: '',
          companyName: '',
          contactNumber: '',
          email: ''
        });
      } else {
        alert('Failed to submit trial request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting trial form:', error);
      alert('Failed to submit trial request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowTrialForm(false);
    setShowDemoCredentials(false);
  };

  return (
    <>
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
                <Button 
                  size="lg" 
                  className="bg-taxventure-red hover:bg-taxventure-red-dark text-white"
                  onClick={() => setShowTrialForm(true)}
                >
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

      {/* Trial Signup Modal */}
      {showTrialForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-taxventure-black">Start Your Free Trial</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2" size={16} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taxventure-red focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline mr-2" size={16} />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taxventure-red focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taxventure-red focus:border-transparent"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taxventure-red focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleTrialSubmit}
                    className="flex-1 bg-taxventure-red hover:bg-taxventure-red-dark text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Demo Access'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Credentials Modal */}
      {showDemoCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-taxventure-black">Demo Access Ready!</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <p className="text-gray-700 mb-4">
                  Thank you for your interest! We've sent your trial request to our team. 
                  You can start exploring our platform right away with the demo credentials below.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-taxventure-black mb-3">Demo Credentials:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Username:</span>
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded">demo@taxventure.net</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Password:</span>
                    <span className="font-mono text-sm bg-white px-2 py-1 rounded">welcome123</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  className="flex-1 bg-taxventure-red hover:bg-taxventure-red-dark text-white"
                  onClick={() => window.open('https://demo.taxventure.net/', '_blank')}
                >
                  Open Demo
                  <ExternalLink className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;