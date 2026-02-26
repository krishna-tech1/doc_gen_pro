import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import ourLogo from '../assets/our.png';

const Particle = ({ delay }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Small random offset for organic feel
            const offset = (Math.random() - 0.5) * 40;
            x.set(e.clientX + offset);
            y.set(e.clientY + offset);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: smoothX,
                y: smoothY,
                pointerEvents: 'none',
                zIndex: 5,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 0.4, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        >
            <div className="w-2 h-2 rounded-full bg-indigo-400 blur-[1px]" />
        </motion.div>
    );
};

export default function LandingPage() {
    const navigate = useNavigate();

    // Magnetic Button Logic
    const btnX = useMotionValue(0);
    const btnY = useMotionValue(0);
    const springX = useSpring(btnX, { stiffness: 150, damping: 15 });
    const springY = useSpring(btnY, { stiffness: 150, damping: 15 });

    const handleMagneticMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Move button 35% of the distance to the mouse
        btnX.set(distanceX * 0.35);
        btnY.set(distanceY * 0.35);
    };

    const resetMagnetic = () => {
        btnX.set(0);
        btnY.set(0);
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* ── Background Particles Trail ───────────────────────────────── */}
            {[...Array(8)].map((_, i) => (
                <Particle key={i} delay={i * 0.2} />
            ))}

            {/* ── Soft Background Ambience ──────────────────────────────────── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-purple-50 rounded-full blur-[140px] opacity-60" />
            </div>

            {/* ── Main Content ─────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center"
            >
                {/* Logo Badge */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mb-14 flex items-center gap-3 bg-white px-6 py-2.5 rounded-2xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] cursor-default"
                >
                    <img src={ourLogo} alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-black text-slate-800 tracking-tight">DocGen Pro</span>
                </motion.div>

                {/* Feature Tag */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 text-indigo-600 border border-slate-100 text-sm font-bold mb-10 shadow-sm">
                    <Sparkles size={16} className="text-indigo-500" />
                    <span>Next Generation AI Workspace</span>
                </div>

                {/* Heading - Single Line */}
                <h1 className="text-5xl md:text-7xl lg:text-[110px] font-[1000] text-slate-950 tracking-[-0.06em] leading-none mb-10 whitespace-nowrap">
                    Document{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">
                        Automation
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-16 font-medium">
                    The all-in-one platform for institutional document excellence. Generate circulars, <br className="hidden md:block" />
                    proposals, and reports with unmatched intelligence and speed.
                </p>

                {/* Magnetic Action Button */}
                <motion.div
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={resetMagnetic}
                    style={{ x: springX, y: springY }}
                    className="relative"
                >
                    <button
                        onClick={() => navigate('/selection')}
                        className="group relative px-14 py-6 bg-slate-950 text-white rounded-3xl font-black text-2xl hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-indigo-100 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Get Started <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        {/* Liquid Ripple Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </motion.div>

                {/* Analytics/Trust Badges */}
                <div className="mt-32 flex flex-wrap justify-center gap-x-16 gap-y-6 opacity-30">
                    {[
                        { icon: Zap, label: 'Instant' },
                        { icon: Shield, label: 'Secure' },
                        { icon: Globe, label: 'Standardized' }
                    ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-900 font-extrabold text-[10px] uppercase tracking-[0.3em]">
                            <feat.icon size={18} />
                            {feat.label}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Background Grid (Very subtle) ────────────────────────────── */}
            <div className="absolute inset-0 z-[-1] opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

            {/* ── Footer ────────────────────────────────────────────────────── */}
            <div className="absolute bottom-10 left-0 w-full px-12 flex flex-col md:flex-row items-center justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] gap-4">
                <div>© 2026 Vision Beyond Labs</div>
                <div className="flex gap-10">
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</span>
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">System Status</span>
                </div>
            </div>
        </div>
    );
}
