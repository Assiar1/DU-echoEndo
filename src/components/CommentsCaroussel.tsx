import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Dr. Jean Martin",
    title: "Gastro-entérologue",
    comment: "Une formation exceptionnelle qui m'a permis d'améliorer considérablement mes compétences en endoscopie. L'équipe pédagogique est remarquable.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Dr. Sophie Bernard",
    title: "Chirurgienne Digestive",
    comment: "La qualité de l'enseignement et le matériel mis à disposition sont excellents. Je recommande vivement cette formation à mes collègues.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Dr. Pierre Dubois",
    title: "Hépato-gastroentérologue",
    comment: "Les cas pratiques et les sessions hands-on sont particulièrement enrichissants. Une formation qui répond parfaitement aux besoins des praticiens.",
    rating: 4,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Dr. Marie Lambert",
    title: "Endoscopiste",
    comment: "J'ai beaucoup apprécié l'approche pédagogique et l'expertise des formateurs. Une expérience très formatrice.",
    rating: 5,
    image: "/placeholder.svg"
  }
];

const CommentsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = Math.max(0, reviews.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1));
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

  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (!isPaused && !isAnimating) {
        if (currentIndex >= maxIndex) {
          setIsAnimating(true);
          setCurrentIndex(0);
          setTimeout(() => setIsAnimating(false), 500);
        } else {
          nextSlide();
        }
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoSlide);
  }, [currentIndex, isPaused, isAnimating, maxIndex]);

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
      id="temoignages" 
      ref={sectionRef}
      className="section-padding bg-medical-gray animate-on-scroll"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="section-title">
          <h2>Témoignages</h2>
          <p>
            Ce que nos participants disent de leur expérience de formation.
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
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-medical-blue">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-medical-dark-blue">
                          {review.name}
                        </h3>
                        <p className="text-medical-blue text-sm">
                          {review.title}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={index < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>

                    <p className="text-medical-dark-gray text-sm italic">
                      "{review.comment}"
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

export default CommentsCarousel;
