"use client";
import { ExternalLink } from "lucide-react";

const PartnersSection = () => {
  const partners = [
    {
      name: "ATVENTURE",
      website: "https://theatventure.com/",
      logo: "atventure.png", // Add your ATVENTURE logo to public folder
      description: "Technology Innovation Partner"
    },
    {
      name: "AMC",
      website: "http://arettemc.com/",
      logo: "/amc.webp", // Add your AMC logo to public folder
      description: "Strategic Business Partner"
    }
  ];

  const handlePartnerClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-taxventure-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-taxventure-black mb-4">
            A Collaborative Project
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Taxventure is proudly developed through the strategic partnership of leading technology 
            and business consulting firms, bringing together expertise in innovation and industry knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              onClick={() => handlePartnerClick(partner.website)}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="text-center">
                {/* Logo Container */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'text-2xl font-bold text-taxventure-red';
                        fallback.textContent = partner.name;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                </div>

                {/* Partner Info */}
                <h3 className="text-xl sm:text-2xl font-bold text-taxventure-black mb-2 group-hover:text-taxventure-red transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {partner.description}
                </p>

                {/* Visit Website Link */}
                <div className="inline-flex items-center text-taxventure-red font-medium group-hover:text-taxventure-red-dark transition-colors">
                  <span className="mr-2">Visit Website</span>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            This partnership combines cutting-edge technology development with strategic business 
            insights to deliver world-class digital invoice management solutions for Pakistani businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;