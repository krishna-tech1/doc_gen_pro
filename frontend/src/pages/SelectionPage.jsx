import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, BarChart3, ArrowRight, CornerDownRight } from 'lucide-react';

const toolboxes = [
    {
        id: 'circular',
        title: 'Circular Generator',
        description: 'Create professional institutional circulars with AI-enhanced content',
        icon: FileText,
        path: '/circular',
        color: 'indigo',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        id: 'proposal',
        title: 'Proposal Generator',
        description: 'Generate structured event proposals with budget breakdown',
        icon: BookOpen,
        path: '/proposal',
        color: 'purple',
        gradient: 'from-purple-500 to-indigo-600',
    },
    {
        id: 'report',
        title: 'Report Generator',
        description: 'Produce formal event reports with geo-tags and analytics',
        icon: BarChart3,
        path: '/report',
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-600',
    },
];

export default function SelectionPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 md:p-12 lg:p-24">
                {/* Header */}
                <div className="text-center mb-16 space-y-4 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        What are we crafting today?
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Choose the document type you'd like to automate. Each tool is designed to save you hours of work.
                    </p>
                </div>

                {/* 3 boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {toolboxes.map((tool, idx) => {
                        const Icon = tool.icon;

                        return (
                            <div
                                key={tool.id}
                                onClick={() => navigate(tool.path)}
                                className="premium-card group p-8 rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-500 border border-slate-200 bg-white"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Icon Container */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon size={32} className="text-white" />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {tool.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed text-base">
                                        {tool.description}
                                    </p>
                                </div>

                                {/* Footer with arrow */}
                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-bold">
                                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                        Generate Now <CornerDownRight size={18} />
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Back Link */}
                <button
                    onClick={() => navigate('/')}
                    className="mt-16 text-slate-400 hover:text-indigo-500 transition-colors flex items-center gap-2 font-medium"
                >
                    ← Return to home
                </button>
            </div>

            <div className="p-8 text-center text-slate-400 text-sm">
                Managed by Institutional Document Automation System v1.0
            </div>
        </div>
    );
}
