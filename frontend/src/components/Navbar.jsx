import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/', label: 'Home' },
    { to: '/circular', label: '📋 Circular' },
    { to: '/proposal', label: '📄 Proposal' },
    { to: '/report', label: '📊 Report' },
];

export default function Navbar() {
    return (
        <nav
            className="sticky top-0 z-50"
            style={{
                background: '#fff',
                borderBottom: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
        >
            <div className="container mx-auto max-w-5xl flex items-center justify-between px-4 py-4">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
                        style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
                    >
                        IDA
                    </div>
                    <div>
                        <span className="font-bold text-sm block" style={{ color: '#0f172a' }}>
                            Doc Automation
                        </span>
                        <span className="text-xs" style={{ color: '#64748b' }}>Professional Document Generation</span>
                    </div>
                </div>

                {/* Nav links */}
                <div className="flex items-center gap-1">
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`
                            }
                            style={({ isActive }) => ({
                                background: isActive ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'transparent',
                            })}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
