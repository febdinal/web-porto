import { useEffect, useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

const getCategoryIcon = (area) => {
    switch (area) {
        case 'ai':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h2a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 0-2 2v1a2 2 0 0 1-2 2h-2v1.27c.6.34 1 .99 1 1.73a2 2 0 0 1-4 0c0-.74.4-1.39 1-1.73V17H9a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2 2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h2V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                </svg>
            );
        case 'web':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
            );
        case 'backend':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
            );
        case 'db':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
            );
        case 'frontend':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            );
        case 'devops':
        default:
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 3 21 3 21 8"></polyline>
                    <line x1="4" y1="20" x2="21" y2="3"></line>
                    <polyline points="21 16 21 21 16 21"></polyline>
                    <line x1="15" y1="15" x2="21" y2="21"></line>
                    <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
            );
    }
};

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const skillCategories = portfolioData.skills;

    return (
        <section id="skills" className="section" style={{ background: 'rgba(12, 13, 18, 0.6)', padding: '90px 0' }} ref={sectionRef}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '0.6rem' }}>My Skills</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
                        Modern technologies and tools I utilize to craft performant, reliable applications.
                    </p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((cat, index) => (
                        <div
                            key={cat.category}
                            className={`skills-card glass ${isVisible ? 'skills-card--visible' : ''}`}
                            style={{
                                transitionDelay: isVisible ? `${index * 0.08}s` : '0s'
                            }}
                        >
                            <div className="skills-card-header">
                                <div className="skills-card-icon">
                                    {getCategoryIcon(cat.area)}
                                </div>
                                <h3 className="skills-card-title">{cat.category}</h3>
                            </div>
                            <div className="skills-tags">
                                {cat.skills.map(skill => (
                                    <span key={skill} className="skills-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .skills-card {
                    padding: 1.6rem 1.4rem;
                    border-radius: 16px;
                    background: rgba(20, 20, 28, 0.45);
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .skills-card--visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .skills-card:hover {
                    border-color: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.06);
                    transform: translateY(-3px);
                }
                .skills-card-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.2rem;
                }
                .skills-card-icon {
                    color: var(--accent-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    flex-shrink: 0;
                }
                .skills-card-title {
                    font-size: 1.12rem;
                    color: #fff;
                    font-weight: 600;
                    margin: 0;
                }
                .skills-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.45rem;
                }
                .skills-tag {
                    font-size: 0.78rem;
                    padding: 5px 11px;
                    background: rgba(255, 255, 255, 0.05);
                    color: #cbd5e1;
                    border-radius: 7px;
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    font-family: var(--font-code);
                    transition: all 0.2s ease;
                }
                .skills-tag:hover {
                    background: rgba(255, 255, 255, 0.14);
                    border-color: rgba(255, 255, 255, 0.3);
                    color: #fff;
                }
                @media (max-width: 960px) {
                    .skills-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 580px) {
                    .skills-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
};

export default Skills;
