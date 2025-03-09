
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/90 backdrop-blur-md shadow-md' 
          : 'py-100 bg-transparent'
      }`}
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://res.cloudinary.com/dm4klydoj/image/upload/v1741523227/logo_fmpr_hafvak.png" 
            alt="DU ENDOSCOPIE Logo" 
            className="h-16 w-auto" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <button onClick={() => scrollToSection('accueil')} className="nav-link active">
            Accueil
          </button>
          <button onClick={() => scrollToSection('programme')} className="nav-link">
            Programme
          </button>
          <button onClick={() => scrollToSection('fondateurs')} className="nav-link">
            Fondateurs
          </button>
          <button onClick={() => scrollToSection('partenaires')} className="nav-link">
            Partenaires
          </button>
          <button onClick={() => scrollToSection('videos')} className="nav-link">
            Vidéos
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-medical-dark-blue"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex justify-end p-4">
            <button 
              onClick={closeMenu}
              className="text-medical-dark-blue p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 pt-8">
            <button onClick={() => scrollToSection('accueil')} className="nav-link text-xl">
              Accueil
            </button>
            <button onClick={() => scrollToSection('programme')} className="nav-link text-xl">
              Programme
            </button>
            <button onClick={() => scrollToSection('fondateurs')} className="nav-link text-xl">
              Fondateurs
            </button>
            <button onClick={() => scrollToSection('partenaires')} className="nav-link text-xl">
              Partenaires
            </button>
            <button onClick={() => scrollToSection('videos')} className="nav-link text-xl">
              Vidéos
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link text-xl">
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
