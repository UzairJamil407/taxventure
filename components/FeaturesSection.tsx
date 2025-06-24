"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cloud, Zap, FileText, BarChart3, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "FBR Integration",
      description: "Seamlessly integrated with Federal Board of Revenue for complete compliance and automated tax calculations."
    },
    {
      icon: Cloud,
      title: "Cloud-Based Platform",
      description: "Access your invoice management system from anywhere with our secure, scalable cloud infrastructure."
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Generate, send, and track invoices in real-time with instant notifications and updates."
    },
    {
      icon: FileText,
      title: "Digital Documentation",
      description: "Paperless invoicing with digital signatures and automated document management."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track your business performance and tax obligations."
    },
    {
      icon: Users,
      title: "Multi-User Access",
      description: "Role-based access control for teams with secure user management and permissions."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-taxventure-black mb-4">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive invoice management system provides everything you need to streamline 
            your financial operations and ensure FBR compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-taxventure-red">
              <CardHeader>
                <div className="w-12 h-12 bg-taxventure-red/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-taxventure-red" size={24} />
                </div>
                <CardTitle className="text-taxventure-black">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
