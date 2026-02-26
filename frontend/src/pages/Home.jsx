import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
    {
        to: '/circular',
        emoji: '📋',
        title: 'Circular Generator',
        desc: 'Create formal institutional circulars with AI-enhanced content and downloadable DOCX.',
        color: '#2563eb',
        lightBg: '#dbeafe',
    },
    {
        to: '/proposal',
        emoji: '📄',
        title: 'Proposal Generator',
        desc: 'Generate structured event proposals with AI-expanded objectives and budget breakdown.',
        color: '#7c3aed',
        lightBg: '#ede9fe',
    },
    {
        to: '/report',
        emoji: '📊',
        title: 'Event Report Generator',
        desc: 'Produce formal event reports with geo-tagged photos, SDG alignment, and AI summaries.',
        color: '#059669',
        lightBg: '#d1fae5',
    },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="py-8 space-y-12">
            {/* Hero */}
            <div className="text-center space-y-4">
                <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd' }}
                >
                    🎓 Powered by AI
                </div>
                <h1
                    className="text-4xl md:text-5xl font-extrabold"
                    style={{ color: '#0f172a' }}
                >
                    Institutional Document<br />Automation System
                </h1>
                <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b' }}>
                    Generate production-ready academic documents — Circulars, Proposals, and Event Reports —
                    in seconds with AI-enhanced formal content.
                </p>
            </div>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {cards.map(({ to, emoji, title, desc, color, lightBg }) => (
                    <button
                        key={to}
                        onClick={() => navigate(to)}
                        className="glass-card p-6 text-left space-y-3 hover:shadow-md transition-all duration-200 cursor-pointer w-full"
                    >
                        <div className="text-4xl">{emoji}</div>
                        <h2 className="font-bold text-lg" style={{ color: '#0f172a' }}>{title}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
                        <span
                            className="inline-flex items-center gap-1 text-xs font-semibold mt-2"
                            style={{ color }}
                        >
                            Get started →
                        </span>
                    </button>
                ))}
            </div>

            {/* How it works */}
            <div className="glass-card p-6 space-y-4">
                <h2 className="font-bold text-lg" style={{ color: '#0f172a' }}>⚡ How it works</h2>
                <ol className="space-y-3">
                    {[
                        'Fill in the document details in the form',
                        'AI generates formal institutional content sections',
                        'Preview the AI-enriched content instantly',
                        'Download the fully formatted DOCX file',
                    ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span
                                className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                                style={{ background: '#dbeafe', color: '#2563eb' }}
                            >
                                {i + 1}
                            </span>
                            <span className="text-sm" style={{ color: '#4b5563' }}>{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
