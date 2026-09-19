import { useEffect, useState } from 'react';

const MouseTrail = () => {
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const point = {
                x: e.clientX,
                y: e.clientY,
                id: Date.now()
            };

            setTrail(prev => [...prev.slice(-15), point]); // Keep last 15 points
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup old points
        const interval = setInterval(() => {
            setTrail(prev => prev.filter(p => Date.now() - p.id < 500));
        }, 50);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
            {trail.map((point, index) => (
                <div
                    key={point.id}
                    style={{
                        position: 'absolute',
                        left: point.x,
                        top: point.y,
                        width: '20px',
                        height: '20px',
                        background: `radial-gradient(circle, var(--accent-color) 0%, transparent 70%)`,
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%) scale(' + (index / trail.length) + ')',
                        opacity: index / trail.length,
                        transition: 'opacity 0.1s'
                    }}
                />
            ))}
        </div>
    );
};

export default MouseTrail;
