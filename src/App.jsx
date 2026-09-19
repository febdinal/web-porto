import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Statistics from './components/Statistics';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import MouseTrail from './components/MouseTrail';
import ScrollReveal from './components/ScrollReveal';
import { portfolioData } from './data/portfolioData';

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <MouseTrail />
      
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero */}
      <Hero />

      {/* 3. About Me */}
      <ScrollReveal>
        <About />
      </ScrollReveal>

      {/* 4. What I Do */}
      <ScrollReveal>
        <WhatIDo />
      </ScrollReveal>

      {/* 5. Statistics */}
      <ScrollReveal>
        <Statistics />
      </ScrollReveal>

      {/* 6. My Skills */}
      <ScrollReveal>
        <Skills />
      </ScrollReveal>

      {/* 7. Achievements & Activities */}
      <ScrollReveal>
        <Achievements />
      </ScrollReveal>

      {/* 8 & 9. Featured Projects & Other Projects & Experiments */}
      <ScrollReveal>
        <Projects />
      </ScrollReveal>

      {/* 10. Get In Touch (Contact) */}
      <ScrollReveal>
        <Contact />
      </ScrollReveal>

      {/* 11. Footer */}
      <footer style={{ 
        padding: '3rem 1.5rem 2.5rem', 
        textAlign: 'center', 
        fontSize: '0.92rem', 
        color: '#8892b0', 
        background: 'rgba(8, 9, 13, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.07)' 
      }}>
        <div className="container">
          {/* Social Links inside Footer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <a 
              href={portfolioData.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#8892b0', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = '#8892b0'}
            >
              GitHub
            </a>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>•</span>
            <a 
              href={portfolioData.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#8892b0', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = '#8892b0'}
            >
              LinkedIn
            </a>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>•</span>
            <a 
              href={portfolioData.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#8892b0', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = '#8892b0'}
            >
              Instagram
            </a>
            <span style={{ color: 'rgba(255,255,255,0.1)' }}>•</span>
            <a 
              href={portfolioData.socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#8892b0', transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = '#8892b0'}
            >
              WhatsApp
            </a>
          </div>

          <p style={{ margin: 0, fontWeight: 500, color: '#cbd5e1' }}>
            &copy; 2026 {portfolioData.personal.displayName}. All rights reserved.
          </p>
          <p style={{ marginTop: '0.4rem', color: '#64748b', fontSize: '0.85rem' }}>
            Built with passion &amp; code.
          </p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
