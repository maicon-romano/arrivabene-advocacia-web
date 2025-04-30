
import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import QuemSomosSection from '../components/QuemSomosSection';
import ServicosSection from '../components/ServicosSection';
import PorQueNosSection from '../components/PorQueNosSection';
import ContatoSection from '../components/ContatoSection';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <QuemSomosSection />
        <ServicosSection />
        <PorQueNosSection />
        <ContatoSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
