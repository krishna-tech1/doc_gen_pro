import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { generateCircular, getDownloadUrl } from '../api';
import { MainLayout } from '../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { FormField, Input, Textarea } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { DocumentPreview } from '../components/Common/DocumentPreview';
import { AlertCircle } from 'lucide-react';

export default function CircularGenerator() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [preview, setPreview] = useState({});
  const [downloadUrl, setDownloadUrl] = useState('');
  const [apiError, setApiError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const formData = watch();

  const onSubmit = async (data) => {
    setApiError('');
    setIsGenerating(true);
    try {
      const res = await generateCircular(data);
      setPreview(res.data.preview);
      setDownloadUrl(res.data.download_url);
    } catch (err) {
      setApiError(err?.response?.data?.detail || 'Failed to generate circular');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainLayout
      title="Circular Generator"
      subtitle="Create formal institutional circulars with AI enhancement"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Document Details</h3>
              <p className="text-sm text-gray-500 mt-1">Fill in the information below</p>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  label="Event Name"
                  required
                  error={errors.event_name?.message}
                >
                  <Input
                    placeholder="e.g., Annual Sports Day 2025"
                    {...register('event_name', { required: 'Event name is required' })}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Start Date"
                    required
                    error={errors.date?.message}
                  >
                    <Input
                      type="date"
                      {...register('date', { required: 'Start date is required' })}
                    />
                  </FormField>

                  <FormField
                    label="End Date (Optional)"
                    error={errors.end_date?.message}
                  >
                    <Input
                      type="date"
                      {...register('end_date')}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Time (Optional)"
                    error={errors.time?.message}
                  >
                    <Input
                      type="time"
                      {...register('time')}
                    />
                  </FormField>

                  <FormField
                    label="Department"
                    required
                    error={errors.department?.message}
                  >
                    <Input
                      placeholder="e.g., Computer Applications"
                      {...register('department', { required: 'Department is required' })}
                    />
                  </FormField>
                </div>

                <FormField
                  label="Chief Guest"
                  required
                  error={errors.chief_guest?.message}
                >
                  <Input
                    placeholder="e.g., Dr. A. Ramesh, Principal"
                    {...register('chief_guest', { required: 'Chief Guest is required' })}
                  />
                </FormField>

                <FormField
                  label="Custom Description (Optional)"
                  subtitle="If filled, this will be used as the body"
                  error={errors.description?.message}
                >
                  <Textarea
                    rows={5}
                    placeholder="Enter custom content for the circular body..."
                    {...register('description')}
                  />
                </FormField>

                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{apiError}</p>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button variant="secondary" size="md" onClick={() => navigate(-1)}>Cancel</Button>
                <Button
                  type="submit"
                  loading={isGenerating}
                  size="md"
                >
                  Generate Circular
                </Button>
              </CardFooter>
            </form>
            <CardContent className="pt-0">
              <div className="text-xs text-gray-400 mt-2">
                * Note: If description is left blank, AI will generate the body based on the template.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-7 sticky top-8">
          <Card className="min-h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-500 mt-1">See how your document will look</p>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)] custom-scrollbar">
              {preview && Object.keys(preview).length > 0 ? (
                <DocumentPreview
                  content={preview}
                  onDownload={() => window.location.href = getDownloadUrl(downloadUrl)}
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
