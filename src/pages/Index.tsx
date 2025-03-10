
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PartnersCarousel from '@/components/PartnersCarousel';
import ProgramHighlights from '@/components/ProgramHighlights';
import VideoSection from '@/components/VideoSection';
import FoundersCarousel from '@/components/FoundersCarousel';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import CommentsCarousel from '@/components/CommentsCaroussel';
import FaqSection from '@/components/FaqSection';
import ChatbotButton from '@/components/ChatbotButton';

const Index: React.FC = () => {
  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PartnersCarousel />
        <ProgramHighlights />
        <VideoSection />
        <FoundersCarousel />
        
        {/* FAQ and Contact sections side by side */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:pr-4">
                <ContactForm />
                
              </div>
              <div className="lg:pl-4">
                <FaqSection />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
};

export default Index;
