import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateCircular } from '../api';
import DocumentPreview from '../components/DocumentPreview';

export default function CircularPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [result, setResult] = useState(null);
    const [apiError, setApiError] = useState('');

    const onSubmit = async (data) => {
        setApiError('');
        try {
            const res = await generateCircular(data);
            setResult(res.data);
        } catch (err) {
            setApiError(err?.response?.data?.detail || 'Failed to generate circular. Please try again.');
        }
    };

    const handleReset = () => { setResult(null); reset(); };

    if (result) return <DocumentPreview result={result} onReset={handleReset} />;

    return (
        <div className="py-6 max-w-2xl mx-auto space-y-6">
            {/* Page header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">📋</span>
                    <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>Circular Generator</h1>
                </div>
                <p className="text-sm" style={{ color: '#64748b' }}>
                    Fill in the details below. AI will generate formal institutional content automatically.
                </p>
            </div>

            {/* Form card */}
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-7 space-y-5">
                {/* Title */}
                <div>
                    <label className="form-label">Event / Circular Title *</label>
                    <input
                        className="form-input"
                        placeholder="e.g. Annual Sports Day 2025"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.title.message}</p>}
                </div>

                {/* Date & Time row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">Date *</label>
                        <input
                            type="date"
                            className="form-input"
                            {...register('date', { required: 'Date is required' })}
                        />
                        {errors.date && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.date.message}</p>}
                    </div>
                    <div>
                        <label className="form-label">Time *</label>
                        <input
                            type="time"
                            className="form-input"
                            {...register('time', { required: 'Time is required' })}
                        />
                        {errors.time && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.time.message}</p>}
                    </div>
                </div>

                {/* Venue */}
                <div>
                    <label className="form-label">Venue *</label>
                    <input
                        className="form-input"
                        placeholder="e.g. College Auditorium"
                        {...register('venue', { required: 'Venue is required' })}
                    />
                    {errors.venue && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.venue.message}</p>}
                </div>

                {/* Department */}
                <div>
                    <label className="form-label">Department *</label>
                    <input
                        className="form-input"
                        placeholder="e.g. Computer Science and Engineering"
                        {...register('department', { required: 'Department is required' })}
                    />
                    {errors.department && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.department.message}</p>}
                </div>

                {/* Chief Guest */}
                <div>
                    <label className="form-label">Chief Guest</label>
                    <input
                        className="form-input"
                        placeholder="e.g. Dr. A. Ramesh, Principal"
                        {...register('chief_guest')}
                    />
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="px-4 py-3 rounded-lg text-sm" style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }}>
                        {apiError}
                    </div>
                )}

                <button type="submit" className="btn-primary w-full py-3" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ Generating…' : '✨ Generate Circular'}
                </button>
            </form>
        </div>
    );
}
