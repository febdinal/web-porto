import { useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Graceful frontend submission simulation
        setTimeout(() => {
            setStatus('success');
            if (form.current) {
                form.current.reset();
            }
            setTimeout(() => setStatus(''), 6000);
        }, 800);
    };

    return (
        <section id="contact" className="section" style={{ position: 'relative', padding: '90px 0 110px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '0.8rem' }}>Get In Touch</h2>
                    <p style={{ color: '#f1f5f9', fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.4rem' }}>
                        Have a project, idea, or collaboration in mind?
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0 }}>
                        Let's build something useful together.
                    </p>
                </div>

                {/* Direct Contact Buttons */}
                <div className="contact-links" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {/* Email */}
                    <a 
                        href={`mailto:${portfolioData.socialLinks.email}`} 
                        className="contact-link-item glass" 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '10px 20px', borderRadius: '12px', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.92rem', transition: 'all 0.25s' }}
                        onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        Email
                    </a>

                    {/* GitHub */}
                    <a 
                        href={portfolioData.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="contact-link-item glass" 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '10px 20px', borderRadius: '12px', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.92rem', transition: 'all 0.25s' }}
                        onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        GitHub
                    </a>

                    {/* LinkedIn */}
                    <a 
                        href={portfolioData.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="contact-link-item glass" 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '10px 20px', borderRadius: '12px', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.92rem', transition: 'all 0.25s' }}
                        onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                    </a>

                    {/* WhatsApp */}
                    <a 
                        href={portfolioData.socialLinks.whatsapp} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="contact-link-item glass" 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '10px 20px', borderRadius: '12px', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.92rem', transition: 'all 0.25s' }}
                        onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseOut={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        WhatsApp
                    </a>
                </div>

                {/* Contact Form Card */}
                <div className="glass contact-card" style={{ maxWidth: '640px', margin: '0 auto', background: 'rgba(20, 20, 22, 0.7)' }}>
                    <form ref={form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                required 
                                style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '1rem' }} 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                required 
                                style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '1rem' }} 
                            />
                        </div>

                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Subject" 
                            required 
                            style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#fff', outline: 'none', fontSize: '1rem' }} 
                        />

                        <textarea 
                            name="message" 
                            rows="5" 
                            placeholder="Message" 
                            required 
                            style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: '#fff', outline: 'none', resize: 'vertical', fontSize: '1rem', minHeight: '120px' }}
                        ></textarea>

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            disabled={status === 'sending'}
                            style={{ padding: '14px', fontSize: '1rem', marginTop: '0.5rem' }}
                        >
                            {status === 'sending' ? 'Sending Message...' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <div style={{ 
                                padding: '12px 16px', 
                                background: 'rgba(16, 185, 129, 0.12)', 
                                border: '1px solid rgba(16, 185, 129, 0.3)', 
                                borderRadius: '8px', 
                                color: '#34d399', 
                                textAlign: 'center', 
                                fontSize: '0.92rem' 
                            }}>
                                Thank you! Your message has been sent. Felix will get in touch soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div style={{ 
                                padding: '12px 16px', 
                                background: 'rgba(239, 68, 68, 0.12)', 
                                border: '1px solid rgba(239, 68, 68, 0.3)', 
                                borderRadius: '8px', 
                                color: '#f87171', 
                                textAlign: 'center', 
                                fontSize: '0.92rem' 
                            }}>
                                An issue occurred. Please reach out directly via Email or WhatsApp.
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <style>{`
                .contact-card {
                    padding: 3rem;
                }
                .input-group {
                    display: flex;
                    gap: 1.2rem;
                }
                @media (max-width: 768px) {
                    .contact-card {
                        padding: 1.6rem;
                    }
                    .input-group {
                        flex-direction: column;
                        gap: 1.2rem;
                    }
                    .contact-links {
                        gap: 0.75rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .contact-card {
                        padding: 1.25rem 1rem !important;
                    }
                    .contact-links {
                        gap: 0.5rem !important;
                    }
                    .contact-link-item {
                        padding: 8px 14px !important;
                        font-size: 0.85rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;
