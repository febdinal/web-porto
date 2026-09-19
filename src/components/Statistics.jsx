import { portfolioData } from '../data/portfolioData';

const Statistics = () => {
    return (
        <section id="statistics" style={{ position: 'relative', padding: '30px 0 80px 0' }}>
            <div className="container">
                <div 
                    className="glass stats-wrapper" 
                    style={{ 
                        maxWidth: '960px', 
                        margin: '0 auto', 
                        padding: '2.5rem 2rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem',
                        position: 'relative',
                        background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.7) 0%, rgba(12, 12, 14, 0.9) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
                    }}
                >
                    {portfolioData.stats.map((stat, idx) => (
                        <div 
                            key={idx} 
                            style={{ 
                                textAlign: 'center', 
                                position: 'relative', 
                                borderRight: idx !== portfolioData.stats.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                                padding: '0.5rem 1rem'
                            }}
                            className="stat-col"
                        >
                            <h3 style={{ 
                                fontSize: 'clamp(2.5rem, 5vw, 3.4rem)', 
                                color: 'var(--accent-color)', 
                                marginBottom: '0.2rem', 
                                fontWeight: 800,
                                fontFamily: 'var(--font-code)',
                                letterSpacing: '-1px',
                                background: 'linear-gradient(135deg, #ffffff 20%, #a1a1aa 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                {stat.value}
                            </h3>
                            <p style={{ 
                                fontSize: '0.98rem', 
                                color: '#f8fafc', 
                                fontWeight: 600, 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px',
                                marginBottom: '0.25rem'
                            }}>
                                {stat.label}
                            </p>
                            {stat.subtext && (
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                    {stat.subtext}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .stats-wrapper {
                        grid-template-columns: 1fr !important;
                        gap: 1.8rem !important;
                        padding: 2rem 1.5rem !important;
                    }
                    .stat-col {
                        border-right: none !important;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        padding-bottom: 1.5rem !important;
                    }
                    .stat-col:last-child {
                        border-bottom: none !important;
                        padding-bottom: 0 !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Statistics;
