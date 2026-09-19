import { useEffect, useState, useRef, useMemo } from 'react';
import { portfolioData } from '../data/portfolioData';

// Project Images (PNG screenshots added by user + SVGs)
import larisinImg from '../assets/larisin.png';
import jatraImg from '../assets/jatra.png';
import mariscashopImg from '../assets/mariscashop.png';
import mysuzukiImg from '../assets/mysuzuki.png';
import kalkulatorImg from '../assets/kalkulator.png';
import pastertransImg from '../assets/pastertrans.png';
import belibisImg from '../assets/belibis.png';
import faedahImg from '../assets/faedah.png';
import sukseskuImg from '../assets/suksesku.png';
import hotjobImg from '../assets/hotjob.png';
import hellobloodImg from '../assets/helloblood.png';
import presensiImg from '../assets/presensi.png';
import piknikajaImg from '../assets/piknikaja.png';
import virelloImg from '../assets/virello.png';
import yelloImg from '../assets/yello-lcms.svg';

const projectImages = {
    larisin: larisinImg,
    jatra: jatraImg,
    mariscashop: mariscashopImg,
    masarishop: mariscashopImg,
    mysuzuki: mysuzukiImg,
    kalkulator: kalkulatorImg,
    pastertrans: pastertransImg,
    belibis: belibisImg,
    faedah: faedahImg,
    suksesku: sukseskuImg,
    hotjob: hotjobImg,
    helloblood: hellobloodImg,
    presensi: presensiImg,
    piknikaja: piknikajaImg,
    virello: virelloImg,
    yello: yelloImg
};

const Projects = () => {
    const trackRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedModalProject, setSelectedModalProject] = useState(null);

    // Responsive check
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedModalProject(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const featuredProjects = useMemo(() => {
        return portfolioData.featuredProjects.map(p => ({
            ...p,
            image: projectImages[p.imageKey] || mariscashopImg
        }));
    }, []);

    const otherProjects = portfolioData.otherProjects;

    const handleScroll = () => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;

        const children = Array.from(track.children);
        const cards = isMobile ? children : children.slice(1, -1);

        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((child, index) => {
            const rect = child.getBoundingClientRect();
            const childCenter = rect.left + rect.width / 2;
            const distance = Math.abs(childCenter - trackCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    };

    const scrollToIndex = (index) => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const children = Array.from(track.children);
        const cards = isMobile ? children : children.slice(1, -1);

        if (cards[index]) {
            const card = cards[index];
            const cardLeft = card.offsetLeft;
            const cardWidth = card.clientWidth;
            const trackWidth = track.clientWidth;

            track.scrollTo({
                left: cardLeft - (trackWidth / 2) + (cardWidth / 2),
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    const scrollPrev = () => {
        const nextIndex = Math.max(0, activeIndex - 1);
        scrollToIndex(nextIndex);
    };

    const scrollNext = () => {
        const nextIndex = Math.min(featuredProjects.length - 1, activeIndex + 1);
        scrollToIndex(nextIndex);
    };

    return (
        <section id="projects" className="section projects-section" style={{ position: 'relative', padding: '90px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '0.6rem' }}>Featured Projects</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
                        Production systems, business platforms, e-commerce, and mobile applications engineered with modern technologies.
                    </p>
                    
                    {/* Carousel Counter Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '1rem', padding: '4px 14px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Showcasing</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--accent-color)', fontFamily: 'var(--font-code)', fontWeight: 600 }}>
                            {activeIndex + 1} of {featuredProjects.length} Projects
                        </span>
                    </div>
                </div>

                {/* Carousel Viewport */}
                <div className="projects-carousel-viewport">
                    {/* Navigation Arrows (Desktop) */}
                    <button
                        className="carousel-arrow carousel-arrow--left"
                        onClick={scrollPrev}
                        disabled={activeIndex === 0}
                        style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
                        aria-label="Previous Project"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        className="carousel-arrow carousel-arrow--right"
                        onClick={scrollNext}
                        disabled={activeIndex === featuredProjects.length - 1}
                        style={{ opacity: activeIndex === featuredProjects.length - 1 ? 0.3 : 1 }}
                        aria-label="Next Project"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>

                    {/* Scrollable Cards Track */}
                    <div
                        className="projects-carousel-track"
                        ref={trackRef}
                        onScroll={handleScroll}
                    >
                        {/* Start Spacer for Desktop Centering */}
                        {!isMobile && (
                            <div style={{ flex: '0 0 calc(50% - min(480px, 80vw)/2 - 0.75rem)', pointerEvents: 'none' }} />
                        )}

                        {featuredProjects.map((project, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={project.id}
                                    className={`glass project-card ${isActive ? 'project-card--active' : ''}`}
                                    style={{
                                        border: isActive ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                                        background: 'rgba(20, 20, 22, 0.75)'
                                    }}
                                >
                                    {/* Preview Image Frame with Zoom/Lightbox Trigger */}
                                    <div 
                                        className="project-card-image"
                                        onClick={() => setSelectedModalProject(project)}
                                        title="Click to expand screenshot preview"
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-img"
                                            loading="lazy"
                                        />
                                        <div className="project-img-overlay"></div>
                                        {project.status && (
                                            <span className="project-status-badge">
                                                {project.status}
                                            </span>
                                        )}
                                        <div className="project-zoom-badge">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                                <line x1="8" y1="11" x2="14" y2="11"></line>
                                            </svg>
                                            <span>Click to Enlarge</span>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="project-card-body" style={{ padding: 'clamp(1.1rem, 4vw, 1.6rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '0.4rem' }}>
                                            <span style={{ 
                                                fontSize: '0.78rem', 
                                                color: 'var(--accent-color)', 
                                                fontFamily: 'var(--font-code)', 
                                                fontWeight: 600,
                                                letterSpacing: '0.5px',
                                                textTransform: 'uppercase'
                                            }}>
                                                {project.category}
                                            </span>
                                            <h3 style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '1.35rem', color: '#fff', fontWeight: 700 }}>
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="project-description" style={{ color: '#94a3b8', marginBottom: '1.25rem', flex: 1, fontSize: '0.92rem', lineHeight: '1.6' }}>
                                            {project.description}
                                        </p>

                                        {project.role && (
                                            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                                                <span style={{ color: '#94a3b8', fontWeight: 500 }}>Role:</span> {project.role}
                                            </p>
                                        )}

                                        {/* Technology Tags */}
                                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.6rem' }}>
                                            {project.tags.map(tag => (
                                                <span key={tag} style={{ 
                                                    fontSize: '0.74rem', 
                                                    padding: '4px 10px', 
                                                    background: 'rgba(255, 255, 255, 0.05)', 
                                                    color: '#e2e8f0', 
                                                    borderRadius: '6px', 
                                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                                    fontFamily: 'var(--font-code)'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                                            {project.liveUrl && project.liveUrl !== '#' ? (
                                                <a 
                                                    href={project.liveUrl} 
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary" 
                                                    style={{ textAlign: 'center', flex: 1, textDecoration: 'none', fontSize: '0.85rem', padding: '9px 14px' }}
                                                >
                                                    Live Demo ↗
                                                </a>
                                            ) : (
                                                <button 
                                                    type="button"
                                                    className="btn btn-primary" 
                                                    style={{ textAlign: 'center', flex: 1, fontSize: '0.85rem', padding: '9px 14px', cursor: 'pointer' }}
                                                    onClick={() => setSelectedModalProject(project)}
                                                >
                                                    View Preview
                                                </button>
                                            )}
                                            <a 
                                                href={project.githubUrl} 
                                                className="btn glass" 
                                                style={{ textAlign: 'center', flex: 1, textDecoration: 'none', fontSize: '0.85rem', padding: '9px 14px', borderColor: 'rgba(255,255,255,0.15)' }}
                                                onClick={e => { if (project.githubUrl === '#') e.preventDefault(); }}
                                            >
                                                GitHub
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* End Spacer for Desktop Centering */}
                        {!isMobile && (
                            <div style={{ flex: '0 0 calc(50% - min(480px, 80vw)/2 - 0.75rem)', pointerEvents: 'none' }} />
                        )}
                    </div>

                    {/* Dot Indicators */}
                    <div className="carousel-dots" style={{ flexWrap: 'wrap', maxWidth: '360px', margin: '1.25rem auto 0', gap: '6px', justifyContent: 'center' }}>
                        {featuredProjects.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === activeIndex ? 'carousel-dot--active' : ''}`}
                                onClick={() => scrollToIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Mobile Carousel Navigation Controls */}
                    {isMobile && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.2rem' }}>
                            <button
                                onClick={scrollPrev}
                                disabled={activeIndex === 0}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '20px',
                                    background: activeIndex === 0 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)',
                                    color: activeIndex === 0 ? 'rgba(255, 255, 255, 0.25)' : '#ffffff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    cursor: activeIndex === 0 ? 'default' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                                aria-label="Previous project"
                            >
                                ‹ Prev
                            </button>
                            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-code)', color: 'var(--accent-color)', fontWeight: 600 }}>
                                {activeIndex + 1} / {featuredProjects.length}
                            </span>
                            <button
                                onClick={scrollNext}
                                disabled={activeIndex === featuredProjects.length - 1}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '20px',
                                    background: activeIndex === featuredProjects.length - 1 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)',
                                    color: activeIndex === featuredProjects.length - 1 ? 'rgba(255, 255, 255, 0.25)' : '#ffffff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    cursor: activeIndex === featuredProjects.length - 1 ? 'default' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                                aria-label="Next project"
                            >
                                Next ›
                            </button>
                        </div>
                    )}
                </div>

                {/* Other Projects & Experiments Section */}
                <div className="other-projects-section" style={{ marginTop: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff', fontWeight: 600 }}>
                            Other Projects &amp; Experiments
                        </h3>
                        <p style={{ color: '#8892b0', fontSize: '0.95rem' }}>
                            Exploratory prototypes, microservices, automation scripts, and full-stack utilities.
                        </p>
                    </div>

                    <div className="other-projects-grid">
                        {otherProjects.map((project, index) => (
                            <div key={index} className="glass other-project-card">
                                <div className="other-project-info" style={{ marginTop: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h4 className="other-project-title" style={{ fontSize: '1.05rem', color: '#fff' }}>
                                            {project.title}
                                        </h4>
                                        <span style={{ color: 'var(--accent-color)', fontSize: '0.85rem' }}>↗</span>
                                    </div>
                                    <p className="other-project-description" style={{ color: '#94a3b8', fontSize: '0.86rem', marginTop: '0.4rem', lineHeight: '1.55' }}>
                                        {project.description}
                                    </p>
                                    <div className="other-project-tags" style={{ marginTop: '0.8rem' }}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className="other-project-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Lightbox Modal */}
            {selectedModalProject && (
                <div 
                    className="project-lightbox-backdrop"
                    onClick={() => setSelectedModalProject(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(5, 5, 8, 0.92)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: isMobile ? '0.5rem' : '1.25rem',
                        animation: 'fadeIn 0.2s ease'
                    }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: '1000px',
                            width: '100%',
                            maxHeight: isMobile ? '96vh' : '92vh',
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'rgba(18, 19, 26, 0.98)',
                            border: '1px solid rgba(255, 255, 255, 0.18)',
                            borderRadius: isMobile ? '12px' : '16px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: isMobile ? '0.75rem 1rem' : '1rem 1.25rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            background: 'rgba(255, 255, 255, 0.02)'
                        }}>
                            <div style={{ minWidth: 0, paddingRight: '0.5rem' }}>
                                <h4 style={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {selectedModalProject.title}
                                </h4>
                                <span style={{ fontSize: '0.72rem', color: 'var(--accent-color)', fontFamily: 'var(--font-code)' }}>
                                    {selectedModalProject.category}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedModalProject(null)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: '#fff',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease'
                                }}
                                aria-label="Close Preview"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Image Body */}
                        <div style={{ 
                            padding: isMobile ? '0.5rem' : '1rem', 
                            overflowY: 'auto', 
                            maxHeight: isMobile ? 'calc(96vh - 65px)' : 'calc(92vh - 80px)', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            background: '#0a0a0f' 
                        }}>
                            <img 
                                src={selectedModalProject.image} 
                                alt={selectedModalProject.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: isMobile ? 'calc(92vh - 85px)' : 'calc(85vh - 100px)',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    display: 'block',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .project-card-image {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 9;
                    overflow: hidden;
                    background: #11131e;
                    cursor: pointer;
                }
                .project-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top center;
                    display: block;
                    transition: transform 0.5s ease;
                }
                .project-card:hover .project-img {
                    transform: scale(1.05);
                }
                .project-img-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent 40%, rgba(10, 10, 14, 0.85) 100%);
                    pointer-events: none;
                }
                .project-status-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    font-size: 0.7rem;
                    padding: 4px 10px;
                    background: rgba(10, 10, 14, 0.85);
                    color: var(--accent-color);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(6px);
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    z-index: 2;
                }
                .project-zoom-badge {
                    position: absolute;
                    bottom: 12px;
                    right: 12px;
                    font-size: 0.72rem;
                    padding: 4px 9px;
                    background: rgba(10, 10, 14, 0.82);
                    color: #cbd5e1;
                    border-radius: 6px;
                    border: 1px solid rgba(255, 255, 255, 0.22);
                    backdrop-filter: blur(6px);
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    opacity: 0;
                    transform: translateY(4px);
                    transition: all 0.25s ease;
                    z-index: 2;
                }
                .project-card:hover .project-zoom-badge {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
};

export default Projects;
