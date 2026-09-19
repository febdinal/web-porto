import { useState, useEffect } from 'react';

const Playground = () => {
    const [score, setScore] = useState(0);
    const [bugs, setBugs] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    // Initial game loop
    useEffect(() => {
        let interval;
        let timer;

        if (gameActive && timeLeft > 0) {
            // Spawn bugs
            interval = setInterval(() => {
                if (bugs.length < 5) {
                    const newBug = {
                        id: Date.now(),
                        x: Math.random() * 90, // percent
                        y: Math.random() * 80, // percent
                        speed: Math.random() * 2 + 1
                    };
                    setBugs(prev => [...prev, newBug]);
                }
            }, 800);

            // Countdown
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameActive(false);
                        setBugs([]);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, [gameActive, timeLeft, bugs.length]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        setBugs([]);
    };

    const catchBug = (id) => {
        setBugs(prev => prev.filter(bug => bug.id !== id));
        setScore(prev => prev + 10);
    };

    return (
        <section id="playground" className="section">
            <div className="container">
                <h2 className="section-title">Playground</h2>
                <div className="glass" style={{ padding: '2rem', textAlign: 'center', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>

                    {!gameActive && timeLeft === 30 && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, width: '90%', maxWidth: '380px' }}>
                            <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '0.75rem' }}>Catch the Bugs!</h3>
                            <p style={{ marginBottom: '1.5rem', fontSize: 'clamp(0.9rem, 3vw, 1rem)', color: '#cbd5e1' }}>Click on the bugs before time runs out!</p>
                            <button onClick={startGame} className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2.2rem' }}>
                                Start Game
                            </button>
                        </div>
                    )}

                    {!gameActive && timeLeft === 0 && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, width: '90%', maxWidth: '380px' }}>
                            <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '0.75rem' }}>Game Over!</h3>
                            <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>Final Score: {score}</p>
                            <button onClick={startGame} className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2.2rem' }}>
                                Play Again
                            </button>
                        </div>
                    )}

                    {/* HUD */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span>Score: {score}</span>
                        <span>Time: {timeLeft}s</span>
                    </div>

                    {/* Game Area */}
                    {gameActive && (
                        <div style={{ position: 'relative', height: '300px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px' }}>
                            {bugs.map(bug => (
                                <div
                                    key={bug.id}
                                    onClick={() => catchBug(bug.id)}
                                    style={{
                                        position: 'absolute',
                                        left: `${bug.x}%`,
                                        top: `${bug.y}%`,
                                        fontSize: '2rem',
                                        cursor: 'pointer',
                                        animation: 'fadeIn 0.2s ease-out',
                                        userSelect: 'none'
                                    }}
                                >
                                    🐛
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Playground;
