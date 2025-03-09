import React, { useRef, useEffect, useState } from 'react';
import { Play } from 'lucide-react';

const VideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

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

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section 
      id="videos" 
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container">
        <div className="section-title">
          <h2>Module 1: Echoendoscopie</h2>
          <p>
            Découvrez notre premier module axé sur l'échoendoscopie bilio-pancréatique, 
            combinant formation pratique et démonstrations en direct.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div 
            ref={(el) => (elementsRef.current[0] = el)}
            className="animate-on-scroll"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
              {/* Replace the <video> tag with the Google Drive <iframe> */}
              <iframe
                src="https://drive.google.com/file/d/1u3XIbI1maTzJdo8hkRjuNFc5qUMK5xaI/preview"
                width="100%"
                height="100%"
                allow="autoplay"
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </iframe>
            </div>
          </div>

          <div 
            ref={(el) => (elementsRef.current[1] = el)}
            className="animate-on-scroll"
          >
            <h3 className="text-2xl font-semibold mb-4 text-medical-dark-blue">
              Echoendoscopie bilio-pancréatique
            </h3>
            <p className="text-medical-dark-gray mb-6">
              Ce module vous permet d'acquérir les compétences essentielles en échoendoscopie bilio-pancréatique. 
              Vous apprendrez les techniques de diagnostic et les approches thérapeutiques les plus récentes, 
              sous la supervision d'experts reconnus dans le domaine.
            </p>
            <p className="text-medical-dark-gray mb-6">
              La formation combine des sessions théoriques approfondies et des ateliers pratiques 
              permettant la manipulation directe des équipements dans un environnement contrôlé.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-block px-3 py-1 bg-medical-lightest-blue text-medical-blue rounded-full text-sm">
                Démonstrations live
              </span>
              <span className="inline-block px-3 py-1 bg-medical-lightest-blue text-medical-blue rounded-full text-sm">
                Hands-on training
              </span>
              <span className="inline-block px-3 py-1 bg-medical-lightest-blue text-medical-blue rounded-full text-sm">
                Cas cliniques complexes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;