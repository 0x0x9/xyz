
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils'; // Assuming cn is a utility for combining class names
import { motion, useScroll, useTransform } from 'framer-motion';

const FeaturesClient = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // IntersectionObserver for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.ecosystem-card, .premium-item, .product-card').forEach(el => {
      observer.observe(el);
    });

    // Typing effect on hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      setTimeout(typeWriter, 1000);
    }

    return () => {
      document.querySelectorAll('.ecosystem-card, .premium-item, .product-card').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Hero Section Premium */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden bg-gradient-to-b from-black to-[#1a1a1a]">
        <motion.div style={{ y }} className="absolute inset-0 bg-radial-gradient-hero animate-pulse-hero"></motion.div>
        <div className="relative z-10">
          <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-medium mb-6 backdrop-blur-xl border border-white/20 inline-block">Nouveau</div>
          <h1 className="hero-title text-clamp-6xl font-bold mb-4 tracking-[-0.022em] bg-gradient-to-r from-white via-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            (X)OS
          </h1>
          <p className="text-xl font-normal mb-2 opacity-90">De l'Ωméga à l'αlpha.</p>
          <h2 className="text-3xl font-semibold mb-8 max-w-3xl">L'harmonie entre l'univers Windows et macOS.<br />L'élégance d'un outil, la puissance d'un studio.</h2>
          <div className="flex gap-5 mt-10">
            <a href="#" className="btn-primary">Découvrir (X)OS</a>
            <a href="#" className="btn-secondary">Regarder la présentation</a>
          </div>
        </div>
      </section>

      {/* Section Écosystème */}
      <section className="py-24 px-5 bg-[#f5f5f7]">
        <div className="max-w-[1024px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 tracking-[-0.022em]">Un écosystème. Trois mondes.</h2>
            <p className="text-xl text-[#6e6e73] max-w-2xl mx-auto">L'alliance parfaite entre Windows et macOS sur une seule machine, nous révolutionnons votre façon de travailler.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="ecosystem-card bg-white rounded-xl p-10 text-center shadow-lg transition-all duration-400 ease-cubic-bezier relative overflow-hidden group">
                <div className="card-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-3xl">🖥️</div>
                <h3 className="text-2xl font-semibold mb-3">
                  <span className="dark:text-black">(X)OS</span>
                </h3>
                <p className="text-[#6e6e73] leading-relaxed">Une interface innovante et réactive. Conçue pour optimiser l'expérience utilisateur dans l'harmonie parfaite entre Windows et macOS.</p>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            
            <div className="ecosystem-card bg-white rounded-xl p-10 text-center shadow-lg transition-all duration-400 ease-cubic-bezier relative overflow-hidden group">
                <div className="card-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-3xl">☁️</div>
                <h3 className="text-2xl font-semibold mb-3">
                  <span className="dark:text-black">(X)Cloud</span>
                </h3>
                <p className="text-[#6e6e73] leading-relaxed">Récupère instantanément votre environnement de travail, même après un crash. Avec (X)SYNC, sauvegarde et restauration automatique.</p>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            
            <div className="ecosystem-card bg-white rounded-xl p-10 text-center shadow-lg transition-all duration-400 ease-cubic-bezier relative overflow-hidden group">
                <div className="card-icon w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-3xl">🤖</div>
                <h3 className="text-2xl font-semibold mb-3">
                  <span className="dark:text-black">(X)AI</span>
                </h3>
                <p className="text-[#6e6e73] leading-relaxed">Poursuivez votre créativité avec un transfert intelligent de fichiers et presets sans perte de qualité. Collaboration en temps réel.</p>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Premium Performance */}
      <section className="bg-black text-white py-32 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient-premium"></div>
        <div className="relative z-10 text-center max-w-[1024px] mx-auto">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#667eea] bg-clip-text text-transparent">Performance. Révolutionnée.</h2>
          <p className="text-xl mb-10 opacity-90">Une interface pensée pour inspirer et fluidifier votre processus créatif</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            <div className="premium-item text-center p-8 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Multi-GPU</div>
                <div className="text-lg opacity-80">Support avancé</div>
            </div>
            <div className="premium-item text-center p-8 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">1 Po</div>
                <div className="text-lg opacity-80">Stockage cloud</div>
            </div>
            <div className="premium-item text-center p-8 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">0s</div>
                <div className="text-lg opacity-80">Commutation OS</div>
            </div>
            <div className="premium-item text-center p-8 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">∞</div>
                <div className="text-lg opacity-80">Possibilités créatives</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Gamme Produits */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-[1024px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 tracking-[-0.022em]">Explorez la gamme.</h2>
            <p className="text-xl text-[#6e6e73] max-w-2xl mx-auto">Workstation (X)yzz. - L'ordinateur pensé par et pour les créatifs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="product-card bg-[#f5f5f7] rounded-xl p-10 text-center transition-all duration-300 relative overflow-hidden group">
                <div className="text-5xl font-light mb-4 text-[#6e6e73]">Ω</div>
                <h3 className="text-2xl font-semibold mb-2">
                  <span className="dark:text-black">oméga</span>
                </h3>
                <div className="text-xl font-semibold text-[#007aff] mb-6">À partir de 1 999 €</div>
                <ul className="list-none mb-6 text-left">
                    <li className="py-1 text-sm text-[#6e6e73]">• (X)OS complet</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• Dual-OS Windows/macOS</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• 32 Go RAM</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• 1 To SSD</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• (X)Cloud inclus</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
                <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
            
            <div className="product-card bg-[#f5f5f7] rounded-xl p-10 text-center transition-all duration-300 relative overflow-hidden group">
                <div className="text-5xl font-light mb-4 text-[#6e6e73]">α</div>
                <h3 className="text-2xl font-semibold mb-2">
                  <span className="dark:text-black">alpha</span>
                </h3>
                <div className="text-xl font-semibold text-[#007aff] mb-6">À partir de 2 999 €</div>
                <ul className="list-none mb-6 text-left">
                    <li className="py-1 text-sm text-[#6e6e73]">• (X)OS Pro</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• Triple-OS + Linux</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• 64 Go RAM</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• 2 To SSD</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• (X)AI intégré</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
                <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
            
            <div className="product-card bg-[#f5f5f7] rounded-xl p-10 text-center transition-all duration-300 relative overflow-hidden group">
                <div className="text-5xl font-light mb-4 text-[#6e6e73]">φ</div>
                <h3 className="text-2xl font-semibold mb-2">
                  <span className="dark:text-black">fi</span>
                </h3>
                <div className="text-xl font-semibold text-[#007aff] mb-6">À partir de 4 499 €</div>
                <ul className="list-none mb-6 text-left">
                    <li className="py-1 text-sm text-[#6e6e73]">• (X)OS Studio</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• Multi-GPU dédié</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• 128 Go RAM</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• 4 To SSD</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• Support prioritaire</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
                <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
            
            <div className="product-card bg-[#f5f5f7] rounded-xl p-10 text-center transition-all duration-300 relative overflow-hidden group">
                <div className="text-5xl font-light mb-4 text-[#6e6e73]">👁️</div>
                <h3 className="text-2xl font-semibold mb-2">
                  <span className="dark:text-black">(X)Vision</span>
                </h3>
                <div className="text-xl font-semibold text-[#007aff] mb-6">À partir de 1 899 €</div>
                <ul className="list-none mb-6 text-left">
                    <li className="py-1 text-sm text-[#6e6e73]">• Spécialisé création visuelle</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• Écrans 5K intégrés</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• GPU créatif optimisé</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• Calibration colorimétrique</li>
                    <li className="py-1 text-sm text-[#6e6e73]">• (X)AI Vision</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
                <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesClient;
