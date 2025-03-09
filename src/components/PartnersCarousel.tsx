
import React from 'react';

const partners = [
  { id: 1, name: 'Partenaire 1', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495639/7_y8h3wf.png' },
  { id: 2, name: 'Partenaire 2', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495635/6_qhwvxz.png' },
  { id: 3, name: 'Partenaire 3', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495626/5_g15qnq.png' },
  { id: 4, name: 'Partenaire 4', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495625/3_tdnwfu.png' },
  { id: 5, name: 'Partenaire 5', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495620/4_kwzafn.png' },
  { id: 6, name: 'Partenaire 6', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495620/2_julldw.png' },
  { id: 7, name: 'Partenaire 7', logo: 'https://res.cloudinary.com/dm4klydoj/image/upload/v1741495619/1_xugyhj.png' },
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
