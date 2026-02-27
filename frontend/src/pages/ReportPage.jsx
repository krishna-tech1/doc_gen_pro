import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { generateReport, fetchSDGGoals, getDownloadUrl } from '../api';
import DocumentPreview from '../components/DocumentPreview';

export default function ReportPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const [sdgGoals, setSdgGoals] = useState([]);
    const [result, setResult] = useState(null);
    const [apiError, setApiError] = useState('');
    const [imageNames, setImageNames] = useState([]);

    // Fetch SDG goals for the dropdown
    useEffect(() => {
        fetchSDGGoals()
            .then(res => setSdgGoals(res.data))
            .catch(() => setSdgGoals([]));
    }, []);

    const onSubmit = async (data) => {
        setApiError('');
        try {
            const formData = new FormData();
            formData.append('event_title', data.event_title);
            formData.append('summary', data.summary);
            formData.append('num_participants', data.num_participants);
            if (data.sdg_id) formData.append('sdg_id', data.sdg_id);
            if (data.date) formData.append('date', data.date);

            // Attach image files
            if (data.images && data.images.length > 0) {
                Array.from(data.images).forEach(file => formData.append('images', file));
            }

            const res = await generateReport(formData);
            setResult(res.data);
        } catch (err) {
            setApiError(err?.response?.data?.detail || 'Failed to generate report. Please try again.');
        }
    };

    const handleReset = () => { setResult(null); reset(); setImageNames([]); };

    if (result) return <DocumentPreview result={result} onReset={handleReset} />;

    return (
        <div className="py-6 max-w-2xl mx-auto space-y-6">
            {/* Page header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">📊</span>
                    <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>Event Report Generator</h1>
                </div>
                <p className="text-sm" style={{ color: '#64748b' }}>
                    AI converts your brief summary into a formal report. Upload geo-tagged images for automatic location detection.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-7 space-y-5">
                {/* Event title */}
                <div>
                    <label className="form-label">Event Title</label>
                    <input
                        className="form-input"
                        placeholder="e.g. International Women's Day Seminar"
                        {...register('event_title')}
                    />
                </div>

                {/* Summary */}
                <div>
                    <label className="form-label">Event Summary</label>
                    <textarea
                        rows={4}
                        className="form-input resize-none"
                        placeholder="Briefly describe what happened during the event…"
                        {...register('summary')}
                    />
                </div>

                {/* Participants & Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">No. of Participants</label>
                        <input
                            type="number"
                            min="1"
                            className="form-input"
                            placeholder="e.g. 120"
                            {...register('num_participants')}
                        />
                    </div>
                    <div>
                        <label className="form-label">Event Date</label>
                        <input
                            type="date"
                            className="form-input"
                            {...register('date')}
                        />
                    </div>
                </div>

                {/* SDG Goal dropdown */}
                <div>
                    <label className="form-label">SDG Goal (Optional)</label>
                    <select
                        className="form-input"
                        style={{ appearance: 'auto' }}
                        {...register('sdg_id')}
                    >
                        <option value="">— Select UN SDG Goal —</option>
                        {sdgGoals.map(g => (
                            <option key={g.id} value={g.id}>
                                SDG {g.number}: {g.name}
                            </option>
                        ))}
                    </select>
                    {errors.sdg_id && <p className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.sdg_id.message}</p>}
                </div>

                {/* Image upload */}
                <div>
                    <label className="form-label">Upload Images (optional)</label>
                    <label
                        className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl cursor-pointer transition-colors"
                        style={{ border: '2px dashed #93c5fd', background: '#dbeafe' }}
                    >
                        <span className="text-2xl">🖼️</span>
                        <span className="text-sm" style={{ color: '#475569' }}>
                            {imageNames.length > 0
                                ? `${imageNames.length} file(s) selected`
                                : 'Click to select images (JPEG/PNG with GPS EXIF supported)'}
                        </span>
                        <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/jpg"
                            className="hidden"
                            {...register('images')}
                            onChange={(e) => setImageNames(Array.from(e.target.files).map(f => f.name))}
                        />
                    </label>
                    {imageNames.length > 0 && (
                        <ul className="mt-2 space-y-1">
                            {imageNames.map((name, i) => (
                                <li key={i} className="text-xs flex items-center gap-1" style={{ color: '#059669' }}>
                                    <span>✓</span> {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* API Error */}
                {apiError && (
                    <div className="px-4 py-3 rounded-lg text-sm" style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }}>
                        {apiError}
                    </div>
                )}

                <button type="submit" className="btn-primary w-full py-3" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ Generating…' : '✨ Generate Report'}
                </button>
            </form>
        </div>
    );
}
