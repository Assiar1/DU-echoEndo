
import React, { useRef, useEffect } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { MessageCircleQuestion } from 'lucide-react';

// FAQ data
const faqItems = [
  {
    id: 'faq-1',
    question: "Quelles sont les conditions d'admission au diplôme?",
    answer: "Le programme est ouvert aux médecins spécialistes, gastro-entérologues, et internes en dernière année de spécialisation. Un CV et une lettre de motivation sont requis pour l'inscription."
  },
  {
    id: 'faq-2',
    question: "Quelle est la durée totale de la formation?",
    answer: "La formation s'étend sur 12 mois, avec des modules théoriques en ligne et des sessions pratiques en présentiel réparties tout au long de l'année."
  },
  {
    id: 'faq-3',
    question: "Comment se déroulent les évaluations?",
    answer: "Les évaluations comprennent des examens théoriques, des évaluations pratiques sur simulateurs, et la présentation d'un mémoire de fin de formation."
  },
  {
    id: 'faq-4',
    question: "Est-ce que la formation est reconnue à l'international?",
    answer: "Oui, notre diplôme est reconnu par plusieurs associations internationales d'endoscopie digestive et offre des crédits de formation continue valables dans l'Union Européenne."
  },
  {
    id: 'faq-5',
    question: "Quels sont les frais d'inscription?",
    answer: "Les frais d'inscription varient selon votre statut et pays d'origine. Nous proposons des tarifs préférentiels pour les médecins des pays en développement. Contactez-nous pour plus d'informations."
  }
];

const FaqSection: React.FC = () => {
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
      id="faq" 
      className="section-padding bg-white"
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-title">
          <h2>Questions fréquentes</h2>
          <p>
            Voici les réponses aux questions les plus courantes sur notre diplôme universitaire en endoscopie digestive.
          </p>
        </div>

        <div 
          ref={(el) => (elementsRef.current[0] = el)}
          className="max-w-3xl mx-auto mt-12 animate-on-scroll"
        >
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex justify-center mb-8">
              <div className="neumorph-sm inline-flex p-4 rounded-xl">
                <MessageCircleQuestion className="h-10 w-10 text-medical-blue" />
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id}
                  className="border-b border-medical-light-blue/30 last:border-0"
                >
                  <AccordionTrigger className="text-left text-medical-dark-blue hover:text-medical-blue py-4 font-medium text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-medical-dark-gray pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;