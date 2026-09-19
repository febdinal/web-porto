import { useEffect, useState, useMemo } from 'react';
import Lanyard from './Lanyard';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = portfolioData.personal.headline;
    const [index, setIndex] = useState(0);
    const [typingDone, setTypingDone] = useState(false);

    // Rotating role text
    const roles = useMemo(() => portfolioData.rotatingRoles, []);
    const [roleIndex, setRoleIndex] = useState(0);
    const [roleVisible, setRoleVisible] = useState(false);

    // Typewriter effect for headline
    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText(prev => prev + fullText.charAt(index));
                setIndex(prev => prev + 1);
            }, 75);
            return () => clearTimeout(timeout);
        } else {
            const timer = setTimeout(() => {
                setTypingDone(true);
                setRoleVisible(true);
            }, 900);
            return () => clearTimeout(timer);
        }
    }, [index, fullText]);

    // Cycle rotating roles
    useEffect(() => {
        if (!typingDone) return;
        const interval = setInterval(() => {
            setRoleVisible(false);
            setTimeout(() => {
                setRoleIndex(prev => (prev + 1) % roles.length);
                setRoleVisible(true);
            }, 500);
        }, 3500);
        return () => clearInterval(interval);
    }, [typingDone, roles]);

    const floatingBadges = portfolioData.floatingBadges;

    return (
        <section id="home" className="section" style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '90px',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            boxSizing: 'border-box',
            maxWidth: '100vw'
        }}>
            {/* Background Futuristic Radial Glow Elements */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                zIndex: -2,
                opacity: 0.4
            }}></div>
            <div style={{
                position: 'absolute',
                top: '-15%',
                left: '-10%',
                width: '650px',
                height: '650px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
                borderRadius: '50%',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '5%',
                right: '-5%',
                width: '550px',
                height: '550px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 70%)',
                borderRadius: '50%',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>

            <div className="container hero-container">
                {/* Text Content (Left) */}
                <div className="animate-fade-in" style={{ textAlign: 'left', zIndex: 1, position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '30px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', marginBottom: '1.25rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}></span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontFamily: 'var(--font-code)', fontWeight: 500 }}>Hello, I'm</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.4rem, 7.5vw, 4.8rem)',
                        fontWeight: 800,
                        marginBottom: '0.75rem',
                        lineHeight: 1.08,
                        background: 'linear-gradient(135deg, #ffffff 40%, #a1a1aa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1.5px',
                        wordBreak: 'break-word'
                    }}>
                        {portfolioData.personal.name}
                    </h1>

                    <h2 style={{
                        fontSize: 'clamp(1.15rem, 4vw, 1.9rem)',
                        marginBottom: '0.75rem',
                        fontFamily: 'var(--font-code)',
                        minHeight: '2.6rem',
                        color: '#e4e4e7',
                        fontWeight: 600,
                        wordBreak: 'break-word'
                    }}>
                        {text}<span className="cursor">|</span>
                    </h2>

                    {/* Rotating Subtitle / Focus Statement */}
                    <div className="hero-rotating-wrapper">
                        {typingDone && (
                            <p className={`hero-rotating-text ${roleVisible ? 'hero-rotating-text--visible' : ''}`}>
                                {`> ${roles[roleIndex]}`}
                            </p>
                        )}
                    </div>

                    <p style={{
                        maxWidth: '580px',
                        margin: '0 0 2rem 0',
                        color: '#94a3b8',
                        fontSize: 'clamp(0.92rem, 3vw, 1.05rem)',
                        lineHeight: '1.65'
                    }}>
                        {portfolioData.personal.description}
                    </p>

                    {/* CTA Group */}
                    <div className="hero-cta-group" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                        <a href="#projects" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                            View My Work
                        </a>
                        <a href="#contact" className="btn glass" style={{ textDecoration: 'none' }}>
                            Get In Touch
                        </a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="hero-social-links" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        {/* GitHub */}
                        <a
                            href={portfolioData.socialLinks.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Profile"
                            style={{ color: '#8892b0', transition: 'all 0.25s ease' }}
                            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.color = '#8892b0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href={portfolioData.socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn Profile"
                            style={{ color: '#8892b0', transition: 'all 0.25s ease' }}
                            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.color = '#8892b0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href={portfolioData.socialLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram Profile"
                            style={{ color: '#8892b0', transition: 'all 0.25s ease' }}
                            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.color = '#8892b0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href={portfolioData.socialLinks.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="WhatsApp Contact"
                            style={{ color: '#8892b0', transition: 'all 0.25s ease' }}
                            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.color = '#8892b0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                        </a>
                    </div>

                    {/* Floating Tech Badges */}
                    <div className="hero-floating-badges">
                        {floatingBadges.map((badge, i) => (
                            <span
                                key={i}
                                className="hero-floating-badge"
                                style={{
                                    top: badge.top,
                                    left: badge.left,
                                    animationDelay: badge.delay
                                }}
                            >
                                {badge.text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Profile Card / Lanyard (Right) */}
                <div className="hero-lanyard-wrapper">
                    <Lanyard />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="scroll-indicator"
                style={{
                    position: 'absolute',
                    bottom: '28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'bounce 2s infinite',
                    color: '#8892b0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-code)', letterSpacing: '1px' }}>EXPLORE</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>

            <style>{`
                .hero-container {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 2.5rem;
                    align-items: center;
                    width: 100%;
                }
                .hero-lanyard-wrapper {
                    height: 600px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding-top: 0;
                    z-index: 2;
                    width: 100%;
                }
                .cursor {
                    animation: blink 1s step-end infinite;
                    color: var(--accent-color);
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
                    40% {transform: translateY(-8px) translateX(-50%);}
                    60% {transform: translateY(-4px) translateX(-50%);}
                }
                @media (max-width: 968px) {
                    .hero-container {
                        grid-template-columns: 1fr !important;
                        text-align: center !important;
                        gap: 1.5rem !important;
                    }
                    .animate-fade-in {
                        order: 2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 0.5rem !important;
                        text-align: center !important;
                    }
                    .hero-social-links {
                        justify-content: center !important;
                    }
                    .hero-lanyard-wrapper {
                        order: 1;
                        height: 380px !important;
                        margin-bottom: 0 !important;
                        margin-top: 0.5rem !important;
                        width: 100% !important;
                        max-width: 100vw !important;
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                        overflow: hidden !important;
                    }
                }
                @media (max-width: 480px) {
                    .hero-cta-group {
                        flex-direction: column;
                        width: 100%;
                    }
                    .hero-cta-group .btn {
                        width: 100%;
                        text-align: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
