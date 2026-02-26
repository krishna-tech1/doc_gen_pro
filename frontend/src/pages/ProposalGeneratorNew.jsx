import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generateProposal, getDownloadUrl } from '../api';
import { MainLayout } from '../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { FormField, Input, Textarea } from '../components/ui/FormField';
import { Button } from '../components/ui/Button';
import { DocumentPreview } from '../components/Common/DocumentPreview';
import { AlertCircle } from 'lucide-react';

export default function ProposalGenerator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [preview, setPreview] = useState({});
  const [downloadUrl, setDownloadUrl] = useState('');
  const [apiError, setApiError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmit = async (data) => {
    setApiError('');
    setIsGenerating(true);
    try {
      const payload = { ...data, budget: parseFloat(data.budget) };
      const res = await generateProposal(payload);
      setPreview(res.data.preview);
      setDownloadUrl(res.data.download_url);
    } catch (err) {
      setApiError(err?.response?.data?.detail || 'Failed to generate proposal');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MainLayout
      title="Proposal Generator"
      subtitle="Create structured event proposals with AI enhancement"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Proposal Details</h3>
              <p className="text-sm text-gray-500 mt-1">Describe your event proposal</p>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  label="Event Name"
                  required
                  error={errors.event_name?.message}
                >
                  <Input
                    placeholder="e.g., National Science Symposium"
                    {...register('event_name', { required: 'Event name is required' })}
                  />
                </FormField>

                <FormField
                  label="Brief Objectives"
                  required
                  error={errors.objectives?.message}
                >
                  <Textarea
                    rows={4}
                    placeholder="Describe the main objectives..."
                    {...register('objectives', { required: 'Objectives are required' })}
                  />
                </FormField>

                <FormField
                  label="Target Audience"
                  required
                  error={errors.target_audience?.message}
                >
                  <Input
                    placeholder="e.g., UG and PG students, Faculty"
                    {...register('target_audience', { required: 'Target audience is required' })}
                  />
                </FormField>

                <FormField
                  label="Proposed Budget (₹)"
                  required
                  error={errors.budget?.message}
                >
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 50000"
                    {...register('budget', { required: 'Budget is required', min: 0 })}
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
                  Generate Proposal
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
