import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import profilePhoto from '../profile.jpeg';
import pythonLogo from '../assets/python.svg';
import pytorchLogo from '../assets/pytorch.svg';
import reactLogo from '../assets/react.svg';
import sqlLogo from '../assets/database.svg';
import { portfolioData } from '../data/portfolioData';

// Custom spring constants for easy tuning
const STRAP_STIFFNESS = 0.045;       // Low stiffness for realistic fabric lag
const STRAP_DAMPING = 0.82;          // High damping to avoid endless wobbling
const STRAP_SAG = 28;                // Vertical sag offset for the control point loop
const STRAP_CURVE_OFFSET = 38;       // Horizontal outward bend offset for the neck loop

const Lanyard = () => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    // SVG strap element refs
    const leftPathRef = useRef(null);
    const rightPathRef = useRef(null);
    const leftPathHighlightRef = useRef(null);
    const rightPathHighlightRef = useRef(null);
    const leftPathShadowRef = useRef(null);
    const rightPathShadowRef = useRef(null);

    // Physics refs
    const engineRef = useRef(null);
    const runnerRef = useRef(null);
    const mouseRef = useRef(null);

    // Interaction refs
    const hoverTiltRef = useRef({ x: 0, y: 0 });
    const isHoveredRef = useRef(false);
    const isDraggingRef = useRef(false);

    // Responsive Scale
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            // 400px is the base container width. Scale down responsively if needed.
            const newScale = Math.min((window.innerWidth - 30) / 400, 1);
            setScale(newScale);
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Constraint = Matter.Constraint;

        // Create Matter.js physics engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create bodies
        // 1. Anchor (Top point) - Static pin on the wall
        const anchor = Bodies.circle(200, 20, 5, {
            isStatic: true,
            render: { visible: false }
        });

        // 2. Card Body - Matching the frosted plastic sleeve dimensions (240x360)
        const cardBody = Bodies.rectangle(200, 200, 240, 360, {
            chamfer: { radius: 24 },
            density: 0.014, // Heavy pass feel
            frictionAir: 0.03, // Damped movement
            restitution: 0.1,
            render: { visible: false }
        });

        // 3. Spring pivot constraint representing the lanyard wire hang
        const elastic = Constraint.create({
            bodyA: anchor,
            bodyB: cardBody,
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: -180 }, // Attachment point at top center of holder
            stiffness: 0.04, // Low elasticity, acts like standard strap
            damping: 0.1,
            length: 125,
            render: { visible: false }
        });

        Composite.add(world, [anchor, cardBody, elastic]);

        // Mouse Drag Interaction
        const mouse = Mouse.create(containerRef.current);
        mouseRef.current = mouse;

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.15,
                render: { visible: false }
            }
        });

        Composite.add(world, mouseConstraint);

        // Keep track of dragging states to block 3d hover tilt
        Matter.Events.on(mouseConstraint, 'startdrag', () => {
            isDraggingRef.current = true;
        });

        Matter.Events.on(mouseConstraint, 'enddrag', () => {
            isDraggingRef.current = false;
        });

        // Runner
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Setup spring control point coordinates for ribbon loop
        let ctrlLeftX = 185 - STRAP_CURVE_OFFSET;
        let ctrlLeftY = 20 + STRAP_SAG;
        let ctrlLeftVx = 0;
        let ctrlLeftVy = 0;

        let ctrlRightX = 215 + STRAP_CURVE_OFFSET;
        let ctrlRightY = 20 + STRAP_SAG;
        let ctrlRightVx = 0;
        let ctrlRightVy = 0;

        // Render Loop
        let animationFrameId;
        let currentRotationY = 0;
        let currentTiltX = 0;
        let currentTiltY = 0;

        const updateLoop = () => {
            if (!cardRef.current) return;

            // 1. Physics mapping
            const { position, angle } = cardBody;
            const displacementX = position.x - 200;

            // Twisting angle calculations on X-swing
            const targetRotationY = displacementX * 1.35;
            currentRotationY += (targetRotationY - currentRotationY) * 0.08;

            // Subtle 3D tilt adjustments for hover state
            const targetTiltX = isHoveredRef.current && !isDraggingRef.current ? hoverTiltRef.current.x : 0;
            const targetTiltY = isHoveredRef.current && !isDraggingRef.current ? hoverTiltRef.current.y : 0;

            currentTiltX += (targetTiltX - currentTiltX) * 0.1;
            currentTiltY += (targetTiltY - currentTiltY) * 0.1;

            // Move the main card container in physics coordinate space
            cardRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}rad)`;

            const innerCard = cardRef.current.children[0];
            if (innerCard) {
                // Apply 3D matrix swing + hover tilts
                innerCard.style.transform = `rotateY(${currentRotationY + currentTiltY}deg) rotateX(${currentTiltX}deg)`;
            }

            // 2. Spring-driven fabric strap calculations
            // Attachment coordinates on card body (offset from center)
            const attachPointX = cardBody.position.x + (-180 * Math.sin(-angle));
            const attachPointY = cardBody.position.y + (-180 * Math.cos(-angle));

            // Dynamic mid-targets
            const midLeftX = (185 + attachPointX) / 2;
            const midLeftY = (20 + attachPointY) / 2;
            const targetLeftX = midLeftX - STRAP_CURVE_OFFSET;
            const targetLeftY = midLeftY + STRAP_SAG;

            const midRightX = (215 + attachPointX) / 2;
            const midRightY = (20 + attachPointY) / 2;
            const targetRightX = midRightX + STRAP_CURVE_OFFSET;
            const targetRightY = midRightY + STRAP_SAG;

            // Left control point spring update
            const axL = (targetLeftX - ctrlLeftX) * STRAP_STIFFNESS;
            const ayL = (targetLeftY - ctrlLeftY) * STRAP_STIFFNESS;
            ctrlLeftVx = (ctrlLeftVx + axL) * STRAP_DAMPING;
            ctrlLeftVy = (ctrlLeftVy + ayL) * STRAP_DAMPING;
            ctrlLeftX += ctrlLeftVx;
            ctrlLeftY += ctrlLeftVy;

            // Right control point spring update
            const axR = (targetRightX - ctrlRightX) * STRAP_STIFFNESS;
            const ayR = (targetRightY - ctrlRightY) * STRAP_STIFFNESS;
            ctrlRightVx = (ctrlRightVx + axR) * STRAP_STIFFNESS;
            ctrlRightVy = (ctrlRightVy + ayR) * STRAP_DAMPING;
            ctrlRightX += ctrlRightVx;
            ctrlRightY += ctrlRightVy;

            // Format SVG paths (Quadratic curves)
            const dLeft = `M 185 20 Q ${ctrlLeftX} ${ctrlLeftY} ${attachPointX} ${attachPointY}`;
            const dRight = `M 215 20 Q ${ctrlRightX} ${ctrlRightY} ${attachPointX} ${attachPointY}`;

            // Update DOM SVG elements directly to run at 60fps/120fps with zero React lag
            if (leftPathRef.current) leftPathRef.current.setAttribute('d', dLeft);
            if (rightPathRef.current) rightPathRef.current.setAttribute('d', dRight);

            if (leftPathHighlightRef.current) leftPathHighlightRef.current.setAttribute('d', dLeft);
            if (rightPathHighlightRef.current) rightPathHighlightRef.current.setAttribute('d', dRight);

            if (leftPathShadowRef.current) leftPathShadowRef.current.setAttribute('d', dLeft);
            if (rightPathShadowRef.current) rightPathShadowRef.current.setAttribute('d', dRight);

            animationFrameId = requestAnimationFrame(updateLoop);
        };

        updateLoop();

        return () => {
            Runner.stop(runner);
            Engine.clear(engine);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Sync drag scale coordinate map
    useEffect(() => {
        if (mouseRef.current) {
            Matter.Mouse.setScale(mouseRef.current, { x: 1 / scale, y: 1 / scale });
        }
    }, [scale]);

    // Track mouse coordinates for subtle perspective card hover tilt
    const handleMouseMove = (e) => {
        if (isDraggingRef.current || window.innerWidth <= 768) return;
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const normalizedX = (x / rect.width) - 0.5;
        const normalizedY = (y / rect.height) - 0.5;

        const maxTilt = 8; // subtle 3d hover tilt boundary
        hoverTiltRef.current = {
            x: -normalizedY * maxTilt,
            y: normalizedX * maxTilt
        };
    };

    const handleMouseEnter = () => {
        if (window.innerWidth <= 768) return;
        isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        hoverTiltRef.current = { x: 0, y: 0 };
    };

    return (
        <div style={{
            position: 'relative',
            width: '400px',
            height: '600px',
            margin: '0 auto',
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
        }}>
            <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible', userSelect: 'none', pointerEvents: 'none' }}>

                {/* SVG Flexible Strap (Behind the card layer) */}
                <svg
                    viewBox="0 0 400 600"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                >
                    <defs>
                        {/* Premium dark gray fabric strap ribbon gradient */}
                        <linearGradient id="strap-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#121217" />
                            <stop offset="50%" stopColor="#1c1c20" />
                            <stop offset="100%" stopColor="#0d0d11" />
                        </linearGradient>

                        {/* Drop shadow filter for physical ribbon separation */}
                        <filter id="strap-shadow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.45" />
                        </filter>
                    </defs>

                    {/* 1. Underlying Drop Shadows */}
                    <path ref={leftPathShadowRef} fill="none" stroke="#000" strokeWidth="15" opacity="0.4" filter="url(#strap-shadow)" />
                    <path ref={rightPathShadowRef} fill="none" stroke="#000" strokeWidth="15" opacity="0.4" filter="url(#strap-shadow)" />

                    {/* 2. Edge Highlights (Wider stroke drawn beneath) */}
                    <path ref={leftPathHighlightRef} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="15.5" strokeLinecap="round" />
                    <path ref={rightPathHighlightRef} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="15.5" strokeLinecap="round" />

                    {/* 3. Main Fabric Ribbon Bodies */}
                    <path id="left-ribbon" ref={leftPathRef} fill="none" stroke="url(#strap-fill)" strokeWidth="14" strokeLinecap="round" />
                    <path id="right-ribbon" ref={rightPathRef} fill="none" stroke="url(#strap-fill)" strokeWidth="14" strokeLinecap="round" />

                    {/* 4. Imprinted Repeated Text Paths (Centered and clean) */}
                    <text fill="rgba(255, 255, 255, 0.55)" fontSize="7" fontWeight="bold" fontFamily="monospace" letterSpacing="0.8">
                        <textPath href="#left-ribbon" startOffset="48%" textAnchor="middle">
                            FELIX • SOFTWARE ENGINEER • WEB &amp; BACKEND
                        </textPath>
                    </text>

                    <text fill="rgba(255, 255, 255, 0.55)" fontSize="7" fontWeight="bold" fontFamily="monospace" letterSpacing="0.8">
                        <textPath href="#right-ribbon" startOffset="48%" textAnchor="middle">
                            FELIX • SOFTWARE ENGINEER • WEB &amp; BACKEND
                        </textPath>
                    </text>

                    {/* 5. Silver mount anchor bolt/pin */}
                    <circle cx="200" cy="20" r="9" fill="url(#metal-radial)" filter="url(#strap-shadow)" />
                    <circle cx="200" cy="20" r="5" fill="none" stroke="#202025" strokeWidth="1" />
                </svg>

                {/* Swinging Card Element */}
                <div
                    ref={cardRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '240px',
                        height: '360px',
                        marginTop: '-180px',
                        marginLeft: '-120px',
                        zIndex: 2,
                        cursor: 'grab',
                        perspective: '1000px',
                        pointerEvents: 'auto'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.08s ease-out'
                    }}>

                        {/* EMBEDDED SILVER CLIP: Nesting here means it tilts and moves with the 3D card layout */}
                        <div style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '32px',
                            height: '42px',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}>
                            <svg width="32" height="42" viewBox="0 0 32 42">
                                <defs>
                                    <linearGradient id="clip-silver" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#505057" />
                                        <stop offset="30%" stopColor="#cccccc" />
                                        <stop offset="50%" stopColor="#fbfbfb" />
                                        <stop offset="70%" stopColor="#b0b0b6" />
                                        <stop offset="100%" stopColor="#404045" />
                                    </linearGradient>
                                    <radialGradient id="metal-radial" cx="35%" cy="35%" r="65%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="30%" stopColor="#dddddd" />
                                        <stop offset="70%" stopColor="#888888" />
                                        <stop offset="100%" stopColor="#333338" />
                                    </radialGradient>
                                </defs>

                                {/* D-Ring ring loop */}
                                <path d="M 6 15 A 10 10 0 0 1 26 15 Z" fill="none" stroke="url(#clip-silver)" strokeWidth="3.2" strokeLinecap="round" />

                                {/* Buckle clasp body neck */}
                                <rect x="11" y="14" width="10" height="8" fill="url(#clip-silver)" rx="1" />

                                {/* Silver trigger snap loop hook catching the slot */}
                                <path d="M 12 22 L 12 35 A 4 4 0 0 0 20 35 L 20 22 L 18 22 L 18 33 A 2 2 0 0 1 14 33 L 14 22 Z" fill="url(#clip-silver)" />
                            </svg>
                        </div>

                        {/* Front Face - Frosted Sleeve pocket */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '24px',
                            border: '1.5px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: 'inset 0 0 24px rgba(255, 255, 255, 0.04), 0 30px 60px rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'hidden',
                            padding: '12px',
                            boxSizing: 'border-box'
                        }}>
                            {/* Transparent sleeve slot hole cutout */}
                            <div style={{
                                width: '46px',
                                height: '11px',
                                borderRadius: '6px',
                                background: 'rgba(0, 0, 0, 0.72)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                                marginBottom: '14px',
                                marginTop: '4px',
                                zIndex: 5
                            }}></div>

                            {/* Inner Card layout */}
                            <div style={{
                                width: '216px',
                                height: '308px',
                                background: '#0a0a0f',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.55)',
                                zIndex: 2
                            }}>
                                {/* Card header */}
                                <div style={{
                                    width: '100%',
                                    height: '82px',
                                    background: 'linear-gradient(135deg, var(--accent-color) 0%, #20202d 100%)',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        fontFamily: 'var(--font-code)',
                                        fontSize: '0.6rem',
                                        color: 'rgba(255, 255, 255, 0.45)',
                                        letterSpacing: '3.5px',
                                        fontWeight: 'bold',
                                        position: 'absolute',
                                        top: '10px'
                                    }}>PASSPORT // MEMBER</span>
                                </div>

                                {/* Circular Profile Photo (fixed non-stretched aspect ratio with flex-shrink protection) */}
                                <div style={{
                                    width: '94px',
                                    height: '94px',
                                    flexShrink: 0,
                                    flexGrow: 0,
                                    marginTop: '34px',
                                    zIndex: 3,
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        border: '4.5px solid #0a0a0f',
                                        background: '#15151b',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxSizing: 'border-box',
                                        aspectRatio: '1 / 1'
                                    }}>
                                        <img
                                            src={profilePhoto}
                                            alt="Profile Avatar"
                                            draggable={false}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                display: 'block',
                                                pointerEvents: 'none'
                                            }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                </div>

                                {/* Name & Role */}
                                <div style={{ marginTop: '0.75rem', textAlign: 'center', zIndex: 3 }}>
                                    <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, fontWeight: 700, letterSpacing: '0.5px' }}>{portfolioData.personal.displayName}</h2>
                                    <p style={{ color: 'var(--accent-color)', fontSize: '0.78rem', marginTop: '0.12rem', fontFamily: 'var(--font-code)' }}>{portfolioData.personal.role}</p>
                                </div>

                                {/* Badge domains */}
                                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 3, padding: '0 8px' }}>
                                    <Badge text="Web Dev" />
                                    <Badge text="Mobile Dev" />
                                    <Badge text="AI Automation" />
                                    <Badge text="APIs" />
                                </div>

                                {/* Pass Footer Details */}
                                <div style={{
                                    marginTop: 'auto',
                                    marginBottom: '10px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 3,
                                    padding: '0 12px',
                                    boxSizing: 'border-box'
                                }}>
                                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '8px' }}></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.58rem', color: '#55555e', fontFamily: 'var(--font-code)' }}>
                                        <span style={{ fontWeight: 'bold' }}>BUILDER PASS</span>
                                        <span style={{ color: '#88888e' }}>ID: PASS-2026-FELIX</span>
                                    </div>

                                    {/* Small barcode strip decoration */}
                                    <div style={{ display: 'flex', gap: '1.5px', height: '12px', marginTop: '6px', opacity: 0.5 }}>
                                        {[2, 4, 1, 3, 1, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1].map((w, idx) => (
                                            <div key={idx} style={{ width: `${w}px`, height: '100%', background: '#fff' }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Plastic sleeve gloss overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 35%, transparent 55%, rgba(255,255,255,0.01) 100%)',
                                pointerEvents: 'none',
                                zIndex: 4,
                                mixBlendMode: 'overlay'
                            }}></div>
                        </div>

                        {/* Back Face - Builder Passport & Playful Notes */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '24px',
                            border: '1.5px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: 'inset 0 0 24px rgba(255, 255, 255, 0.04), 0 30px 60px rgba(0, 0, 0, 0.6)',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'hidden',
                            padding: '12px',
                            boxSizing: 'border-box'
                        }}>
                            {/* Plastic slot punch hole cutout */}
                            <div style={{
                                width: '46px',
                                height: '11px',
                                borderRadius: '6px',
                                background: 'rgba(0, 0, 0, 0.72)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                                marginBottom: '14px',
                                marginTop: '4px',
                                zIndex: 5
                            }}></div>

                            {/* Inner Back Card (Builder Passport details) */}
                            <div style={{
                                width: '216px',
                                height: '308px',
                                background: '#0a0a0f',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.55)',
                                zIndex: 2,
                                padding: '16px',
                                boxSizing: 'border-box'
                            }}>
                                {/* Passport Header */}
                                <div style={{
                                    textAlign: 'center',
                                    borderBottom: '1.5px dashed rgba(255, 255, 255, 0.15)',
                                    paddingBottom: '8px',
                                    marginBottom: '12px'
                                }}>
                                    <h3 style={{ color: '#fff', fontSize: '0.92rem', margin: 0, fontWeight: 700, letterSpacing: '2px', fontFamily: 'var(--font-code)' }}>BUILDER PASSPORT</h3>
                                    <span style={{ fontSize: '0.52rem', color: 'var(--accent-color)', fontFamily: 'var(--font-code)', letterSpacing: '0.5px' }}>SECTOR: SOFTWARE & SYSTEMS</span>
                                </div>

                                {/* Passport Details */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                    fontFamily: 'var(--font-code)',
                                    fontSize: '0.65rem',
                                    color: '#bbb',
                                    textAlign: 'left'
                                }}>
                                    <div>
                                        <span style={{ color: '#555' }}>ALIAS:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>Felix</span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#555' }}>ROLE:</span> <span style={{ color: '#fff' }}>Software Engineer</span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#555' }}>FOCUS:</span> <span style={{ color: '#fff' }}>Web / Backend / SaaS / APIs</span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#555' }}>STATUS:</span> <span style={{ color: 'var(--accent-color)' }}>Building solutions</span>
                                    </div>
                                </div>

                                {/* Playful builder notes */}
                                <div style={{
                                    marginTop: '12px',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px dashed rgba(255, 255, 255, 0.08)',
                                    fontFamily: 'var(--font-code)',
                                    fontSize: '0.55rem',
                                    color: '#777',
                                    lineHeight: '1.4'
                                }}>
                                    <div style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '4px' }}>PHILOSOPHY:</div>
                                    <div>⚡ Clean architecture</div>
                                    <div>🛠️ Scalable backend systems</div>
                                    <div>🚀 Reliable digital products</div>
                                </div>

                                {/* Tech stack icons embedded at bottom */}
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center',
                                    marginTop: 'auto',
                                    opacity: 0.65
                                }}>
                                    <img src={pythonLogo} alt="Python" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                    <img src={pytorchLogo} alt="PyTorch" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                    <img src={reactLogo} alt="React" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                    <img src={sqlLogo} alt="SQL" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                                </div>
                            </div>

                            {/* Plastic sleeve gloss overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 35%, transparent 55%, rgba(255,255,255,0.01) 100%)',
                                pointerEvents: 'none',
                                zIndex: 4,
                                mixBlendMode: 'overlay'
                            }}></div>
                        </div>
                    </div>
                </div>

                <p style={{
                    position: 'absolute',
                    bottom: '12px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.22)',
                    fontSize: '0.75rem',
                    pointerEvents: 'none',
                    fontFamily: 'var(--font-code)'
                }}>
                    Drag to swing card
                </p>
            </div>
        </div>
    );
};

const Badge = ({ text }) => (
    <span style={{
        fontSize: '0.68rem',
        background: 'rgba(255, 255, 255, 0.07)',
        color: '#e4e4e7',
        padding: '4px 10px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        fontFamily: 'var(--font-code)',
        fontWeight: '500'
    }}>
        {text}
    </span>
);

export default Lanyard;
