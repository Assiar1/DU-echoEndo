
import React from 'react';
import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-medical-dark-blue text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">DU Endoscopie</h3>
            <p className="text-white/80 max-w-xs">
              Diplôme Universitaire en Endoscopie Digestive et Thérapeutique, 
              formation d'excellence avec des experts internationaux.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="flex items-start mb-2">
              <Mail className="h-5 w-5 mr-3 text-medical-light-blue flex-shrink-0 mt-0.5" />
              <span className="text-white/80">contact@du-endoscopie.fr</span>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 text-medical-light-blue flex-shrink-0 mt-0.5" />
              <span className="text-white/80">+33 (0)1 23 45 67 89</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} DU Endoscopie. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors mr-6">
              Mentions légales
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
