import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'What I Do', href: '#what-i-do' },
        { name: 'Skills', href: '#skills' },
        { name: 'Activities', href: '#achievements' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                left: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
                padding: scrolled ? '14px 0' : '22px 0',
                backgroundColor: scrolled ? 'rgba(10, 10, 14, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                {/* Brand Logo */}
                <a
                    href="#home"
                    className="logo"
                    style={{
                        fontWeight: 700,
                        fontFamily: 'var(--font-code)',
                        zIndex: 1001,
                        color: '#fff',
                        fontSize: '1.35rem',
                        letterSpacing: '-0.5px'
                    }}
                >
                    <span style={{ color: 'var(--accent-color)' }}>&lt;</span>
                    {portfolioData.personal.name}
                    <span style={{ color: 'var(--accent-color)' }}> /&gt;</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="desktop-menu" style={{ display: 'flex', listStyle: 'none', gap: '1.8rem', alignItems: 'center', margin: 0, padding: 0 }}>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                style={{
                                    fontSize: '0.92rem',
                                    fontWeight: 500,
                                    color: '#b4b7c9',
                                    transition: 'color 0.25s ease'
                                }}
                                onMouseOver={e => e.currentTarget.style.color = '#fff'}
                                onMouseOut={e => e.currentTarget.style.color = '#b4b7c9'}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#contact"
                            className="btn btn-primary"
                            style={{
                                fontSize: '0.85rem',
                                padding: '8px 18px',
                                borderRadius: '8px',
                                textDecoration: 'none'
                            }}
                        >
                            Get In Touch
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="mobile-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        zIndex: 1001,
                        padding: '6px'
                    }}
                >
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>

                {/* Mobile Navigation Drawer */}
                <div
                    className={`mobile-menu ${isOpen ? 'open' : ''}`}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(10, 10, 14, 0.98)',
                        backdropFilter: 'blur(16px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1.8rem',
                        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
                        zIndex: 1000
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '1.4rem',
                                fontWeight: 600,
                                color: '#e2e8f0',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.color = 'var(--accent-color)'}
                            onMouseOut={e => e.currentTarget.style.color = '#e2e8f0'}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="btn btn-primary"
                        style={{ marginTop: '0.5rem', padding: '10px 24px' }}
                    >
                        Get In Touch
                    </a>
                </div>
            </div>

            <style>{`
                .desktop-menu {
                    display: flex !important;
                }
                .mobile-toggle {
                    display: none !important;
                }
                .mobile-menu {
                    display: none !important;
                }

                @media (max-width: 860px) {
                    .desktop-menu {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                    .mobile-menu {
                        display: flex !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
