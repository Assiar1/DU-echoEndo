
import React, { useEffect, useRef } from 'react';
import { School, Hospital, Video, Globe } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <Hospital className="h-10 w-10 text-medical-blue" />,
    title: "Formation théorique et pratique",
    description: "Une approche complète combinant les connaissances théoriques essentielles et la pratique clinique supervisée."
  },
  {
    id: 2,
    icon: <School className="h-10 w-10 text-medical-blue" />,
    title: "Diplôme reconnu universitaire",
    description: "Une qualification reconnue par la communauté médicale et les institutions universitaires de premier plan."
  },
  {
    id: 3,
    icon: <Video className="h-10 w-10 text-medical-blue" />,
    title: "Workshops live et hands-on",
    description: "Des sessions pratiques et des démonstrations en direct pour développer vos compétences techniques."
  },
  {
    id: 4,
    icon: <Globe className="h-10 w-10 text-medical-blue" />,
    title: "Encadrement par des experts internationaux",
    description: "Bénéficiez de l'expertise de professionnels reconnus dans le domaine de l'endoscopie digestive."
  }
];

const ProgramHighlights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      id="programme" 
      ref={sectionRef}
      className="section-padding bg-medical-lightest-blue"
    >
      <div className="container">
        <div className="section-title">
          <h2>Pourquoi choisir ce diplôme?</h2>
          <p>
            Notre programme offre une formation complète et approfondie pour les professionnels de santé souhaitant se spécialiser en endoscopie digestive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (elementsRef.current[index] = el)}
              className="feature-card animate-on-scroll"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 neumorph-sm inline-flex p-4 rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-medical-dark-blue">
                {feature.title}
              </h3>
              <p className="text-medical-dark-gray">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
