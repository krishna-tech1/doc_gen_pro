import React from 'react';
import { getDownloadUrl } from '../api';

/**
 * DocumentPreview — shows AI-generated content sections and a download button.
 *
 * Props:
 *   result  : { preview: {introduction,objectives,outcome,conclusion}, download_url, message }
 *   onReset : function — called when user clicks "Generate Another"
 */
export default function DocumentPreview({ result, onReset }) {
    if (!result) return null;

    const { preview = {}, download_url, message } = result;

    const sections = [
        { key: 'introduction', label: 'Introduction', color: '#2563eb' },
        { key: 'objectives', label: 'Objectives', color: '#7c3aed' },
        { key: 'outcome', label: 'Expected Outcome', color: '#0891b2' },
        { key: 'conclusion', label: 'Conclusion', color: '#059669' },
    ];

    return (
        <div className="mt-8 space-y-4">
            {/* Success banner */}
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{ background: '#d1fae5', border: '1px solid #a7f3d0' }}
            >
                <span className="text-xl">✅</span>
                <p className="text-sm font-medium" style={{ color: '#047857' }}>{message}</p>
            </div>

            {/* AI Content sections */}
            <div className="glass-card p-7 space-y-6">
                <h3 className="text-lg font-bold" style={{ color: '#0f172a' }}>📝 Document Preview</h3>
                {sections.map(({ key, label, color }) =>
                    preview[key] ? (
                        <div key={key}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                                <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
                                    {label}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: '#4b5563', whiteSpace: 'pre-line' }}>
                                {preview[key]}
                            </p>
                        </div>
                    ) : null
                )}
            </div>

            {/* Download button */}
            {download_url && (
                <a href={getDownloadUrl(download_url)} download>
                    <button className="btn-success w-full flex items-center justify-center gap-2 py-3">
                        <span>⬇️</span>
                        <span>Download DOCX</span>
                    </button>
                </a>
            )}

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full text-sm py-2 rounded-lg transition-colors font-medium"
                style={{ color: '#2563eb', background: '#dbeafe', border: '1px solid #93c5fd' }}
            >
                Generate Another
            </button>
        </div>
    );
}
