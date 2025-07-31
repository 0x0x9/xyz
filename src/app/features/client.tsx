
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';

const FeaturesClient = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
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

    document.querySelectorAll('.ecosystem-card, .premium-item, .product-card, .feature-section').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.ecosystem-card, .premium-item, .product-card, .feature-section').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      {/* Hero Section Premium */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden bg-gradient-to-b from-black to-[#1a1a1a]">
        <motion.div style={{ y }} className="absolute inset-0 bg-radial-gradient-hero animate-pulse-hero"></motion.div>
        <div className="relative z-10 px-4">
          <div className="hero-badge">Nouveau</div>
          <h1 className="hero-title text-clamp-6xl font-bold mb-4 tracking-[-0.022em] bg-gradient-to-r from-white via-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            (X)OS
          </h1>
          <p className="hero-tagline text-xl font-normal mb-2 opacity-90">De l'Ωméga à l'αlpha.</p>
          <h2 className="hero-subtitle text-3xl font-semibold mb-8 max-w-3xl">L'harmonie entre l'univers Windows et macOS.<br />L'élégance d'un outil, la puissance d'un studio.</h2>
          <div className="hero-cta">
            <a href="#" className="btn-primary">Découvrir (X)OS</a>
            <a href="#" className="btn-secondary">Regarder la présentation</a>
          </div>
        </div>
      </section>

      {/* Section Écosystème */}
      <section className="ecosystem py-24 px-5 bg-[#f5f5f7]">
        <div className="container mx-auto">
          <div className="section-header">
            <h2 className="section-title">Un écosystème. Trois mondes.</h2>
            <p className="section-subtitle">L'alliance parfaite entre Windows et macOS sur une seule machine, nous révolutionnons votre façon de travailler.</p>
          </div>
          
          <div className="ecosystem-grid">
            <div className="ecosystem-card animate-on-scroll">
                <div className="card-icon">🖥️</div>
                <h3 className="card-title">(X)OS</h3>
                <p className="card-description">Une interface innovante et réactive. Conçue pour optimiser l'expérience utilisateur dans l'harmonie parfaite entre Windows et macOS.</p>
            </div>
            
            <div className="ecosystem-card animate-on-scroll">
                <div className="card-icon">☁️</div>
                <h3 className="card-title">(X)Cloud</h3>
                <p className="card-description">Récupère instantanément votre environnement de travail, même après un crash. Avec (X)SYNC, sauvegarde et restauration automatique.</p>
            </div>
            
            <div className="ecosystem-card animate-on-scroll">
                <div className="card-icon">🤖</div>
                <h3 className="card-title">(X)AI</h3>
                <p className="card-description">Poursuivez votre créativité avec un transfert intelligent de fichiers et presets sans perte de qualité. Collaboration en temps réel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Premium Performance */}
      <section className="premium-section">
        <div className="absolute inset-0 bg-radial-gradient-premium"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h2 className="premium-title">Performance. Révolutionnée.</h2>
          <p className="text-xl mb-10 opacity-90">Une interface pensée pour inspirer et fluidifier votre processus créatif</p>
          
          <div className="premium-grid">
            <div className="premium-item">
                <div className="premium-number">Multi-GPU</div>
                <div className="premium-label">Support avancé</div>
            </div>
            <div className="premium-item">
                <div className="premium-number">1 Po</div>
                <div className="premium-label">Stockage cloud</div>
            </div>
            <div className="premium-item">
                <div className="premium-number">0s</div>
                <div className="premium-label">Commutation OS</div>
            </div>
            <div className="premium-item">
                <div className="premium-number">∞</div>
                <div className="premium-label">Possibilités créatives</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEW OS SECTION */}
      <section className="feature-section py-24 px-5 bg-white text-center">
        <div className="container">
          <h2 className="section-title text-5xl font-bold mb-4 tracking-[-0.022em]">Un OS. Tous les OS.</h2>
          <p className="section-subtitle text-xl text-[#6e6e73] max-w-3xl mx-auto mb-16">
            (X)OS est le premier système qui vous permet d'exécuter macOS, Windows et Linux simultanément, sans compromis. Passez de l'un à l'autre instantanément.
          </p>
          <div className="relative aspect-video max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1618423484838-b1ce696e52c9?auto=format&fit=crop&w=1600&q=80" data-ai-hint="futuristic os interface" alt="(X)OS interface" className="w-full h-full object-cover"/>
          </div>
        </div>
      </section>


      {/* Section Gamme Produits */}
      <section className="products py-24 px-5 bg-[#f5f5f7]">
        <div className="container mx-auto">
          <div className="section-header">
            <h2 className="section-title">Explorez la gamme.</h2>
            <p className="section-subtitle">Workstation (X)yzz. - L'ordinateur pensé par et pour les créatifs</p>
          </div>
          
          <div className="products-grid">
            <div className="product-card">
                <div className="product-greek">Ω</div>
                <h3 className="product-name">oméga</h3>
                <div className="product-price">À partir de 1 999 €</div>
                <ul className="product-features">
                    <li>• (X)OS complet</li>
                    <li>• Dual-OS Windows/macOS</li>
                    <li>• 32 Go RAM</li>
                    <li>• 1 To SSD</li>
                    <li>• (X)Cloud inclus</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
            </div>
            
            <div className="product-card">
                <div className="product-greek">α</div>
                <h3 className="product-name">alpha</h3>
                <div className="product-price">À partir de 2 999 €</div>
                <ul className="product-features">
                    <li>• (X)OS Pro</li>
                    <li>• Triple-OS + Linux</li>
                    <li>• 64 Go RAM</li>
                    <li>• 2 To SSD</li>
                    <li>• (X)AI intégré</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
            </div>
            
            <div className="product-card">
                <div className="product-greek">φ</div>
                <h3 className="product-name">fi</h3>
                <div className="product-price">À partir de 4 499 €</div>
                <ul className="product-features">
                    <li>• (X)OS Studio</li>
                    <li>• Multi-GPU dédié</li>
                    <li>• 128 Go RAM</li>
                    <li>• 4 To SSD</li>
                    <li>• Support prioritaire</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
            </div>
            
            <div className="product-card">
                <div className="product-greek">👁️</div>
                <h3 className="product-name">(X)Vision</h3>
                <div className="product-price">À partir de 1 899 €</div>
                <ul className="product-features">
                    <li>• Spécialisé création visuelle</li>
                    <li>• Écrans 5K intégrés</li>
                    <li>• GPU créatif optimisé</li>
                    <li>• Calibration colorimétrique</li>
                    <li>• (X)AI Vision</li>
                </ul>
                <a href="#" className="btn-primary">Choisir</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesClient;
