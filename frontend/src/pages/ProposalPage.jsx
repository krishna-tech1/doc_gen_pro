import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateProposal } from '../api';
import DocumentPreview from '../components/DocumentPreview';

export default function ProposalPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [result, setResult] = useState(null);
    const [apiError, setApiError] = useState('');

    const onSubmit = async (data) => {
        setApiError('');
        try {
            const payload = { ...data, budget: parseFloat(data.budget) };
            const res = await generateProposal(payload);
            setResult(res.data);
        } catch (err) {
            setApiError(err?.response?.data?.detail || 'Failed to generate proposal. Please try again.');
        }
    };

    const handleReset = () => { setResult(null); reset(); };

    if (result) return <DocumentPreview result={result} onReset={handleReset} />;

    return (
        <div className="py-6 max-w-2xl mx-auto space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">📄</span>
                    <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>Proposal Generator</h1>
                </div>
                <p className="text-sm" style={{ color: '#64748b' }}>
                    AI will expand your brief objectives into comprehensive, formal proposal language.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-7 space-y-5">
                {/* Event name */}
                <div>
                    <label className="form-label">Event Name</label>
                    <input
                        className="form-input"
                        placeholder="e.g. National Science Symposium 2025"
                        {...register('event_name')}
                    />
                </div>

                {/* Objectives */}
                <div>
                    <label className="form-label">Brief Objectives</label>
                    <textarea
                        rows={3}
                        className="form-input resize-none"
                        placeholder="e.g. Promote research culture among students and faculty"
                        {...register('objectives')}
                    />
                </div>

                {/* Target audience */}
                <div>
                    <label className="form-label">Target Audience</label>
                    <input
                        className="form-input"
                        placeholder="e.g. UG and PG students, Faculty members"
                        {...register('target_audience')}
                    />
                </div>

                {/* Budget */}
                <div>
                    <label className="form-label">Proposed Budget (₹)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-input"
                        placeholder="e.g. 50000"
                        {...register('budget')}
                    />
                </div>

                {apiError && (
                    <div className="px-4 py-3 rounded-lg text-sm" style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }}>
                        {apiError}
                    </div>
                )}

                <button type="submit" className="btn-primary w-full py-3" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ Generating…' : '✨ Generate Proposal'}
                </button>
            </form>
        </div>
    );
}
