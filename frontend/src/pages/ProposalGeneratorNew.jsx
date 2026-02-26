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
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [apiError, setApiError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const formData = watch();

  const onSubmit = async (data) => {
    setApiError('');
    setIsGenerating(true);
    try {
      const res = await generateProposal(data);
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
      subtitle="Create formal institutional permission letters"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Proposal Details</h3>
              <p className="text-sm text-gray-500 mt-1">Fill in the institutional details</p>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Proposal Date" required error={errors.proposal_date?.message}>
                    <Input type="date" {...register('proposal_date', { required: 'Required' })} />
                  </FormField>
                  <FormField label="Department" required error={errors.department?.message}>
                    <Input placeholder="BCM / BCA / CS" {...register('department', { required: 'Required' })} />
                  </FormField>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg space-y-4 border border-slate-100">
                  <h4 className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-2 italic">From Information</h4>
                  <FormField label="Name" required error={errors.from_name?.message}>
                    <Input placeholder="Your Full Name" {...register('from_name', { required: 'Required' })} />
                  </FormField>
                  <FormField label="Designation" required error={errors.from_designation?.message}>
                    <Input placeholder="Assistant Professor" {...register('from_designation', { required: 'Required' })} />
                  </FormField>
                </div>

                <div className="p-4 bg-indigo-50/30 rounded-lg space-y-4 border border-indigo-100">
                  <h4 className="text-sm font-medium text-indigo-900 border-b border-indigo-200 pb-2 italic">Event Highlights</h4>
                  <FormField label="Event Name" required error={errors.event_name?.message}>
                    <Input placeholder="Workshop / Symposium Name" {...register('event_name', { required: 'Required' })} />
                  </FormField>
                  <FormField label="Event Topic" required error={errors.event_topic?.message}>
                    <Input placeholder="Machine Learning / UI Design" {...register('event_topic', { required: 'Required' })} />
                  </FormField>
                  <FormField label="Target Audience" required error={errors.target_audience?.message}>
                    <Input placeholder="I & II Year Students" {...register('target_audience', { required: 'Required' })} />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Event Date" required error={errors.event_date?.message}>
                      <Input type="date" {...register('event_date', { required: 'Required' })} />
                    </FormField>
                    <FormField label="Event Time" required error={errors.event_time?.message}>
                      <Input type="time" {...register('event_time', { required: 'Required' })} />
                    </FormField>
                  </div>
                </div>

                <FormField
                  label="Short Description"
                  subtitle="How will this benefit students?"
                  error={errors.short_description?.message}
                >
                  <Textarea
                    rows={4}
                    placeholder="Focus area and learning outcomes..."
                    {...register('short_description', { required: 'Required' })}
                  />
                </FormField>

                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{apiError}</p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex gap-4">
                <Button variant="secondary" size="md" className="flex-1" onClick={() => navigate(-1)}>Cancel</Button>
                <Button
                  type="submit"
                  loading={isGenerating}
                  size="md"
                  className="flex-1"
                >
                  Generate Proposal
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Preview Section - Force Large View */}
        <div className="lg:col-span-7 sticky top-8">
          <Card className="min-h-screen flex flex-col shadow-2xl border-indigo-50">
            <CardHeader className="bg-slate-50/50 border-b">
              <h3 className="font-semibold text-gray-900">Live Proposal Preview</h3>
              <p className="text-sm text-gray-500 mt-1">Directly edit text in the preview box</p>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-slate-50/50">
              <div className="p-10">
                <DocumentPreview
                  content={formData}
                  onUpdateField={(field, value) => setValue(field, value)}
                  onDownload={downloadUrl ? () => window.location.href = getDownloadUrl(downloadUrl) : null}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
