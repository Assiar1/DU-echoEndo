
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const images = [
  '/placeholder1.jpg',
  '/placeholder2.jpg',
  '/placeholder3.jpg',
  '/placeholder4.jpg',
  '/placeholder5.jpg'
];

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProgram = () => {
    const element = document.getElementById('programme');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="accueil" 
      className="relative pt-16 overflow-hidden"
    >
      {/* Banner Slider - Now with controlled height */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-medical-dark-blue/40 z-10"></div>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Content */}
        <div className="container relative z-20 text-white h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6 animate-fade-in">
              Formation Universitaire
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in" style={{animationDelay: '100ms'}}>
              Diplôme Universitaire en Endoscopie Digestive & Thérapeutique
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in" style={{animationDelay: '200ms'}}>
              Formation d'excellence avec des experts internationaux
            </p>
            <button 
              onClick={scrollToProgram}
              className="btn btn-primary group animate-fade-in"
              style={{animationDelay: '300ms'}}
            >
              En savoir plus
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
