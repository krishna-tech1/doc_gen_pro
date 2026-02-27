import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { generateReport, fetchSDGGoals, getDownloadUrl } from '../api';
import { MainLayout } from '../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { FormField, Input, Textarea, Select } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { DocumentPreview } from '../components/Common/DocumentPreview';
import { AlertCircle, Upload, X } from 'lucide-react';

export default function ReportGenerator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sdgGoals, setSdgGoals] = useState([]);
  const [preview, setPreview] = useState({});
  const [downloadUrl, setDownloadUrl] = useState('');
  const [apiError, setApiError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSDGGoals()
      .then(res => setSdgGoals(res.data))
      .catch(() => setSdgGoals([]));
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImages(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const onSubmit = async (data) => {
    setApiError('');
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append('event_title', data.event_title);
      formData.append('summary', data.summary);
      formData.append('num_participants', data.num_participants);
      if (data.sdg_id) formData.append('sdg_id', data.sdg_id);
      if (data.date) formData.append('date', data.date);
      if (data.event_time) formData.append('event_time', data.event_time);
      if (data.department) formData.append('department', data.department);
      if (data.chief_guest) formData.append('chief_guest', data.chief_guest);
      if (data.coordinator_name) formData.append('coordinator_name', data.coordinator_name);
      if (data.venue) formData.append('venue', data.venue);

      images.forEach(file => formData.append('images', file));

      // Include any manual edits from the preview
      if (preview && Object.keys(preview).length > 0) {
        formData.append('edited_preview', JSON.stringify(preview));
      }

      const res = await generateReport(formData);
      setPreview(res.data.preview);
      setDownloadUrl(res.data.download_url);
    } catch (err) {
      setApiError(err?.response?.data?.detail || 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainLayout
      title="Report Generator"
      subtitle="Create formal event reports with geo-tagged photos"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Event Details</h3>
              <p className="text-sm text-gray-500 mt-1">Describe your event</p>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  label="Event Name"
                  required
                  error={errors.event_title?.message}
                >
                  <Input
                    placeholder="e.g., International Women's Day Seminar"
                    {...register('event_title', { required: 'Event name is required' })}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Organized by (Department)"
                    required
                    error={errors.department?.message}
                  >
                    <Input
                      placeholder="e.g., BCA Department"
                      {...register('department', { required: 'Department is required' })}
                    />
                  </FormField>

                  <FormField
                    label="Event Time"
                    required
                    error={errors.event_time?.message}
                  >
                    <Input
                      placeholder="e.g., 10:00 AM"
                      {...register('event_time', { required: 'Time is required' })}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Venue"
                  required
                  error={errors.venue?.message}
                >
                  <Input
                    placeholder="e.g., College Auditorium"
                    {...register('venue', { required: 'Venue is required' })}
                  />
                </FormField>

                <FormField
                  label="Chief Guest"
                  required
                  error={errors.chief_guest?.message}
                >
                  <Input
                    placeholder="e.g., Dr. Jane Smith"
                    {...register('chief_guest', { required: 'Chief guest name is required' })}
                  />
                </FormField>

                <FormField
                  label="Brief Description / Summary"
                  required
                  error={errors.summary?.message}
                >
                  <Textarea
                    rows={4}
                    placeholder="Describe the key highlights of the event..."
                    {...register('summary', { required: 'Summary is required' })}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="No. of Participants"
                    required
                    error={errors.num_participants?.message}
                  >
                    <Input
                      type="number"
                      min="1"
                      placeholder="e.g., 120"
                      {...register('num_participants', { required: 'Participant count is required', min: 1 })}
                    />
                  </FormField>

                  <FormField
                    label="Event Date"
                    required
                    error={errors.date?.message}
                  >
                    <Input
                      type="date"
                      {...register('date', { required: 'Date is required' })}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Event Coordinator"
                  required
                  error={errors.coordinator_name?.message}
                >
                  <Input
                    placeholder="e.g., Prof. A. Kumar"
                    {...register('coordinator_name', { required: 'Coordinator name is required' })}
                  />
                </FormField>

                <FormField
                  label="SDG Goal"
                  error={errors.sdg_id?.message}
                >
                  <Select {...register('sdg_id')}>
                    <option value="">Select UN SDG Goal (Optional)</option>
                    {sdgGoals.map(g => (
                      <option key={g.id} value={g.id}>
                        SDG {g.number}: {g.name}
                      </option>
                    ))}
                  </Select>
                </FormField>

                {/* Image Upload */}
                <FormField label="Upload Images (Optional)">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${dragActive
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium text-gray-900">Drag and drop images here</p>
                    <p className="text-xs text-gray-500">or click to select</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImages(prev => [...prev, ...Array.from(e.target.files)])}
                    />
                  </div>

                  {/* Image Thumbnails */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`upload-${idx}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </FormField>

                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{apiError}</p>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button variant="secondary" size="md">Cancel</Button>
                <Button
                  type="submit"
                  loading={isGenerating}
                  size="md"
                >
                  Generate Report
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-7 sticky top-8">
          <Card className="min-h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-500 mt-1">See how your document will look</p>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[calc(100vh-200px)]">
              {preview && Object.keys(preview).length > 0 ? (
                <DocumentPreview
                  docType="report"
                  content={preview}
                  onUpdateField={(field, value) => setPreview(prev => ({ ...prev, [field]: value }))}
                  onDownload={downloadUrl ? () => window.location.href = getDownloadUrl(downloadUrl) : null}
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <p>Fill out the form to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
