
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const founders = [
  {
    id: 1,
    name: "Pr. Jean Dupont",
    title: "Professeur en Gastro-entérologie",
    specialty: "Expert en Endoscopie Thérapeutique",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Pr. Marie Laurent",
    title: "Professeur en Chirurgie Digestive",
    specialty: "Spécialiste en Echoendoscopie",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Dr. Philippe Martin",
    title: "Maître de Conférences",
    specialty: "Endoscopie Interventionnelle",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Pr. Sophie Durand",
    title: "Professeur en Hépato-gastroentérologie",
    specialty: "Endoscopie Digestive Avancée",
    image: "/placeholder.svg"
  }
];

const FoundersCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = Math.max(0, founders.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1));
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating || currentIndex <= 0) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section 
      id="fondateurs" 
      ref={sectionRef}
      className="section-padding bg-medical-gray animate-on-scroll"
    >
      <div className="container">
        <div className="section-title">
          <h2>Les Fondateurs</h2>
          <p>
            Notre équipe d'experts reconnus internationalement dans le domaine de l'endoscopie digestive.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                ${currentIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-medical-blue shadow-md hover:bg-medical-blue hover:text-white transition-colors'
                }`}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
            <button 
              onClick={nextSlide} 
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                ${currentIndex >= maxIndex 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-medical-blue shadow-md hover:bg-medical-blue hover:text-white transition-colors'
                }`}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Carousel Container */}
          <div className="overflow-hidden mx-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)` }}
            >
              {founders.map((founder) => (
                <div 
                  key={founder.id} 
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="founder-card h-full">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                      <img 
                        src={founder.image} 
                        alt={founder.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-medical-dark-blue mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-medical-blue font-medium mb-1">
                      {founder.title}
                    </p>
                    <p className="text-sm text-medical-dark-gray">
                      {founder.specialty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-medical-blue' : 'bg-medical-blue/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersCarousel;
