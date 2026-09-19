import { useEffect, useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

const Achievements = () => {
    const [visibleItems, setVisibleItems] = useState({});
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = entry.target.getAttribute('data-index');
                        if (index !== null) {
                            setVisibleItems(prev => ({ ...prev, [index]: true }));
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        if (sectionRef.current) {
            const items = sectionRef.current.querySelectorAll('.timeline-item');
            items.forEach(item => observer.observe(item));
        }

        return () => observer.disconnect();
    }, []);

    const activities = portfolioData.achievements;

    return (
        <section id="achievements" className="section" style={{ position: 'relative', padding: '90px 0' }} ref={sectionRef}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '0.6rem' }}>Achievements &amp; Activities</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
                        Key engineering milestones, development initiatives, and ongoing technological explorations.
                    </p>
                </div>

                <div className="timeline">
                    {activities.map((item, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className={`timeline-item ${visibleItems[index] ? 'timeline-item--visible' : ''}`}
                            style={{
                                transitionDelay: visibleItems[index] ? `${(index % 3) * 0.1}s` : '0s'
                            }}
                        >
                            <div className="timeline-dot"></div>
                            <div className="glass timeline-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                                    <span style={{ 
                                        fontSize: '0.85rem', 
                                        fontFamily: 'var(--font-code)', 
                                        color: 'var(--accent-color)', 
                                        fontWeight: 700,
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(255, 255, 255, 0.15)'
                                    }}>
                                        {item.number}
                                    </span>
                                    {item.year && (
                                        <span className="timeline-card-year">{item.year}</span>
                                    )}
                                </div>

                                <h4 className="timeline-card-title">{item.title}</h4>
                                <p className="timeline-card-event">{item.event}</p>

                                {item.tags && (
                                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                                        {item.tags.map(tag => (
                                            <span 
                                                key={tag} 
                                                style={{ 
                                                    fontSize: '0.7rem', 
                                                    padding: '2px 8px', 
                                                    background: 'rgba(255, 255, 255, 0.04)', 
                                                    color: '#94a3b8', 
                                                    borderRadius: '4px',
                                                    fontFamily: 'var(--font-code)'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
