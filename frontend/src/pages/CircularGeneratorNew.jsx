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
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Document Details</h3>
              <p className="text-sm text-gray-500 mt-1">Fill in the information below</p>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  label="Circular Title"
                  required
                  error={errors.title?.message}
                >
                  <Input
                    placeholder="e.g., Annual Sports Day 2025"
                    {...register('title', { required: 'Title is required' })}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Date"
                    required
                    error={errors.date?.message}
                  >
                    <Input
                      type="date"
                      {...register('date', { required: 'Date is required' })}
                    />
                  </FormField>

                  <FormField
                    label="Time"
                    required
                    error={errors.time?.message}
                  >
                    <Input
                      type="time"
                      {...register('time', { required: 'Time is required' })}
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
                  label="Department"
                  required
                  error={errors.department?.message}
                >
                  <Input
                    placeholder="e.g., Physical Education"
                    {...register('department', { required: 'Department is required' })}
                  />
                </FormField>

                <FormField
                  label="Chief Guest"
                  error={errors.chief_guest?.message}
                >
                  <Input
                    placeholder="e.g., Dr. A. Ramesh, Principal"
                    {...register('chief_guest')}
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
                <Button variant="secondary" size="md">Cancel</Button>
                <Button 
                  type="submit" 
                  loading={isGenerating}
                  size="md"
                >
                  Generate Circular
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Preview Section */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Live Preview</h3>
              <p className="text-sm text-gray-500 mt-1">See how your document will look</p>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[calc(100vh-200px)]">
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
