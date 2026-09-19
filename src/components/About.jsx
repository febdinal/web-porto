import { portfolioData } from '../data/portfolioData';

const About = () => {
    return (
        <section id="about" className="section" style={{ position: 'relative', padding: '100px 0 80px 0' }}>
            {/* Ambient Background Radial Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
                zIndex: -1,
                pointerEvents: 'none'
            }}></div>

            <div className="container">
                <h2 className="section-title">About Me</h2>

                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    {/* Glass Container for About Me narrative */}
                    <div 
                        className="glass" 
                        style={{ 
                            padding: 'clamp(2rem, 5vw, 3.2rem)', 
                            textAlign: 'left',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative top accent line */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '10%',
                            right: '10%',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)'
                        }}></div>

                        {portfolioData.personal.aboutText.map((paragraph, idx) => (
                            <p 
                                key={idx} 
                                style={{ 
                                    fontSize: idx === 0 ? '1.18rem' : '1.05rem', 
                                    marginBottom: idx === portfolioData.personal.aboutText.length - 1 ? '2rem' : '1.35rem', 
                                    lineHeight: '1.75', 
                                    color: idx === 0 ? '#f1f5f9' : '#cbd5e1',
                                    fontWeight: idx === 0 ? 500 : 400
                                }}
                            >
                                {paragraph}
                            </p>
                        ))}

                        {/* Professional Focus Areas */}
                        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.75rem', marginTop: '1rem' }}>
                            <h4 style={{ 
                                fontSize: '0.88rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: '1.5px', 
                                color: 'var(--accent-color)', 
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-code)'
                            }}>
                                Professional Focus
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                                {portfolioData.personal.focusAreas.map((area) => (
                                    <span 
                                        key={area} 
                                        style={{
                                            fontSize: '0.82rem',
                                            padding: '6px 14px',
                                            borderRadius: '8px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            color: '#e2e8f0',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            fontFamily: 'var(--font-code)',
                                            transition: 'all 0.25s ease'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
