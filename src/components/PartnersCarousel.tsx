
import React from 'react';

const partners = [
  { id: 1, name: 'Partenaire 1', logo: '/src/assets/1.png' },
  { id: 2, name: 'Partenaire 2', logo: '/src/assets/2.png' },
  { id: 3, name: 'Partenaire 3', logo: '/src/assets/3.png' },
  { id: 4, name: 'Partenaire 4', logo: '/src/assets/4.png' },
  { id: 5, name: 'Partenaire 5', logo: '/src/assets/5.png' },
  { id: 6, name: 'Partenaire 6', logo: '/src/assets/6.png' },
  { id: 7, name: 'Partenaire 7', logo: '/src/assets/7.png' },
];

const PartnersCarousel: React.FC = () => {
  return (
    <section 
      id="partenaires" 
      className="py-5 bg-medical-lightest-blue overflow-hidden"
    >
      <div className="container">
        <div className="flex flex-col items-center mb-0">
          <h3 className="text-xl md:text-2xl font-medium text-medical-dark-blue mb-2">
            Ils nous font confiance
          </h3>
          <div className="h-1 w-16 bg-medical-blue rounded-full"></div>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className="partner-carousel">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="flex-shrink-0 w-48 h-32 mx-8 flex items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-20 max-w-full object-contain filter  hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate for infinite scroll effect */}
          {partners.map((partner) => (
            <div 
              key={`duplicate-${partner.id}`} 
              className="flex-shrink-0 w-48 h-32 mx-8 flex items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-20 max-w-full object-contain filter hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
