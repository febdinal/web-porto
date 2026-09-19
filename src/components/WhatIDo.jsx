import { portfolioData } from '../data/portfolioData';

const getServiceIcon = (iconName) => {
    switch (iconName) {
        case 'cpu':
            return (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
            );
        case 'server':
            return (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
            );
        case 'layout':
            return (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
            );
        case 'package':
        default:
            return (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            );
    }
};

const WhatIDo = () => {
    return (
        <section id="what-i-do" className="section" style={{ position: 'relative', padding: '60px 0 90px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '0.6rem' }}>What I Do</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
                        Transforming complex requirements into scalable, reliable, and user-centric digital solutions.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1100px',
                    margin: '0 auto'
                }}>
                    {portfolioData.whatIDo.map((item) => (
                        <div 
                            key={item.id}
                            className="glass service-card" 
                            style={{ 
                                padding: '2.2rem 1.8rem', 
                                textAlign: 'left', 
                                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)', 
                                cursor: 'default',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.06)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--glass-border)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Accent Icon Container */}
                            <div style={{ 
                                width: '56px',
                                height: '56px',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff', 
                                marginBottom: '1.5rem' 
                            }}>
                                {getServiceIcon(item.iconName)}
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem', color: '#fff', fontWeight: 600 }}>
                                {item.title}
                            </h3>

                            <p style={{ fontSize: '0.94rem', color: '#94a3b8', lineHeight: '1.65', margin: 0, flex: 1 }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatIDo;
