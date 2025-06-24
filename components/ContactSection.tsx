"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Globe, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        // Show success message
        toast.success('Message sent successfully!', {
          description: 'We\'ll get back to you within 24 hours.',
          duration: 5000,
          icon: <CheckCircle className="h-4 w-4" />,
        });
        
        // Show success state
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });

        // Hide success message after 10 seconds
        setTimeout(() => setShowSuccess(false), 10000);
        
      } else {
        console.error('Server error:', result);
        toast.error('Failed to send message', {
          description: result.message || 'Please try again later.',
          duration: 5000,
          icon: <AlertCircle className="h-4 w-4" />,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
        duration: 5000,
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-taxventure-black mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to transform your invoice management? Contact us today to learn more about 
            our FBR-integrated solutions and how we can help your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-taxventure-black">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-green-800">Message sent successfully!</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name" 
                      required
                      disabled={isSubmitting}
                      className="focus:ring-taxventure-red focus:border-taxventure-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name" 
                      required
                      disabled={isSubmitting}
                      className="focus:ring-taxventure-red focus:border-taxventure-red"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email" 
                    required
                    disabled={isSubmitting}
                    className="focus:ring-taxventure-red focus:border-taxventure-red"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number" 
                    disabled={isSubmitting}
                    className="focus:ring-taxventure-red focus:border-taxventure-red"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements" 
                    rows={4} 
                    required
                    disabled={isSubmitting}
                    className="focus:ring-taxventure-red focus:border-taxventure-red"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-taxventure-red hover:bg-taxventure-red-dark text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-taxventure-black mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center">
                    <Globe className="text-taxventure-red" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-taxventure-black">Website</div>
                    <div className="text-gray-600">taxventure.net</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-taxventure-red" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-taxventure-black">Email</div>
                    <div className="text-gray-600">info@taxventure.net</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center">
                    <Phone className="text-taxventure-red" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-taxventure-black">Phone</div>
                    <div className="text-gray-600">+92 334 5450600</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-taxventure-red/10 rounded-lg flex items-center justify-center">
                    <MapPin className="text-taxventure-red" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-taxventure-black">Location</div>
                    <div className="text-gray-600">Pakistan</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-taxventure-gray border-none">
              <CardContent className="p-6">
                <h4 className="font-semibold text-taxventure-black mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-taxventure-black">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-taxventure-black">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-taxventure-black">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;