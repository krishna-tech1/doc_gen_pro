import React from 'react';
import { Download, Copy, Edit2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const DocumentPreview = ({
  content = {},
  onDownload,
  onUpdateField,
  title = 'Document Preview',
  compact = false,
  docType = 'circular' // default to circular
}) => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const EditableField = ({ field, children, className = "" }) => {
    if (!onUpdateField) return <span className={className}>{children}</span>;

    return (
      <span
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdateField(field, e.currentTarget.textContent)}
        className={`${isEditMode ? 'hover:bg-yellow-50 hover:cursor-text focus:bg-yellow-50 focus:outline-none rounded px-1 transition-colors border-b border-indigo-200 ring-1 ring-transparent focus:ring-indigo-100' : ''} ${className}`}
        title={isEditMode ? "Click to edit" : ""}
      >
        {children}
      </span>
    );
  };

  const EditableBlock = ({ field, children, className = "" }) => {
    if (!onUpdateField) return <div className={className}>{children}</div>;

    return (
      <div
        contentEditable={isEditMode}
        suppressContentEditableWarning
        onBlur={(e) => onUpdateField(field, e.currentTarget.textContent)}
        className={`${isEditMode ? 'hover:bg-yellow-50 hover:cursor-text focus:bg-yellow-50 focus:outline-none rounded p-2 transition-colors border border-indigo-100 ring-1 ring-transparent focus:ring-indigo-50' : ''} ${className}`}
        title={isEditMode ? "Click to edit body" : ""}
      >
        {children}
      </div>
    );
  };
  if (!content || Object.keys(content).length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Fill out the form to preview the document</p>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Edit Toggle Button - Top Right */}
      <div className="absolute top-0 right-0 z-10 flex gap-2">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md ${isEditMode
            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
        >
          <Edit2 size={14} />
          {isEditMode ? 'Finish Editing' : 'Dynamic Edit Mode'}
        </button>
      </div>

      {/* Print-like preview */}
      <div className={`bg-white rounded-md p-12 shadow-2xl border mb-8 mx-auto max-w-[850px] min-h-[1100px] transition-all ${isEditMode ? 'border-indigo-300 ring-8 ring-indigo-50' : 'border-gray-100'}`}>
        {/* Only show header if NOT a proposal (user said no college header for proposal) */}
        {docType !== 'proposal' && (
          <div className="w-full mb-10 flex items-center justify-center">
            <img src="/logo.jpeg" alt="College Header" className="max-w-full h-auto object-contain" style={{ maxHeight: '140px' }} />
          </div>
        )}

        {/* Content sections strictly matching the DOCX */}
        <div className="font-serif text-black space-y-6" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt', lineHeight: 1.5 }}>

          {/* CIRCULAR VIEW */}
          {docType !== 'proposal' ? (
            <>
              <div className="text-center font-bold text-[14pt] mb-10 tracking-widest underline decoration-double underline-offset-4">
                <EditableField field="document_title">CIRCULAR</EditableField>
              </div>

              <div className="flex justify-end mb-10 font-bold">
                <div>
                  Date: <EditableField field="date">{content.date || "DD/MM/YYYY"}</EditableField>
                </div>
              </div>

              {content.description ? (
                <EditableBlock field="description" className="text-justify whitespace-pre-wrap leading-relaxed py-4">
                  {content.description}
                </EditableBlock>
              ) : (
                <div className="space-y-6">
                  <div className="text-justify leading-relaxed">
                    <EditableBlock field="circular_body_1" className="inline">
                      This is to inform that the <span className="font-bold">Department of {content.department || "..."}</span> will be organizing <span className="font-bold">{content.event_name || "..."}</span> on {content.date || "..."} {content.time ? ` at ${content.time}` : ""} in the college premises.
                    </EditableBlock>
                  </div>

                  <div className="text-justify leading-relaxed">
                    <EditableBlock field="circular_body_2" className="inline">
                      The program aims to enrich students with knowledge and practical exposure in the relevant field.
                    </EditableBlock>
                  </div>

                  <div className="text-justify leading-relaxed">
                    <EditableBlock field="circular_body_3" className="inline">
                      We are honored to have <span className="font-bold">{content.chief_guest || "..."}</span> as the Chief Guest for this event.
                    </EditableBlock>
                  </div>

                  <div className="text-justify leading-relaxed">
                    <EditableBlock field="circular_body_4" className="inline">
                      All concerned are requested to take note of the same and participate actively.
                    </EditableBlock>
                  </div>
                </div>
              )}

              {/* Signature block for Circular */}
              <div className="mt-24 flex justify-between pt-8">
                <div className="text-center font-bold">
                  <EditableField field="footer_left">Event Coordinator</EditableField>
                </div>
                <div className="text-center font-bold">
                  <EditableField field="footer_right">Principal</EditableField>
                </div>
              </div>

              {/* Copy To block for Circular */}
              <div className="mt-16">
                <p className="font-bold mb-4">
                  <EditableField field="copy_to_label">Copy To:</EditableField>
                </p>
                <div className="ml-8 space-y-2 italic text-gray-700">
                  <EditableBlock field="copy_to_list" className="space-y-2">
                    <p>• All HODs</p>
                    <p>• IQAC</p>
                  </EditableBlock>
                </div>
              </div>
            </>
          ) : (
            /* PROPOSAL VIEW */
            <div className="space-y-8">
              <div className="mb-4">
                Date: <EditableField field="proposal_date">{content.proposal_date || "DD/MM/YYYY"}</EditableField>
              </div>

              <div>
                <p className="font-bold underline mb-1">
                  <EditableField field="from_label">From</EditableField>
                </p>
                <div className="space-y-0 text-sm">
                  <p><EditableField field="from_name">{content.from_name || "Name"}</EditableField></p>
                  <p><EditableField field="from_designation">{content.from_designation || "Designation"}</EditableField></p>
                  <p><EditableField field="department">{content.department || "Department"}</EditableField></p>
                  <p><EditableField field="college_name_from">Avichi College of Arts and Science</EditableField></p>
                  <p><EditableField field="college_address_from">Virugambakkam-92</EditableField></p>
                </div>
              </div>

              <div>
                <p className="font-bold underline mb-1">
                  <EditableField field="to_label">To</EditableField>
                </p>
                <div className="space-y-0 text-sm">
                  <p><EditableField field="to_recipient">The Principal</EditableField></p>
                  <p><EditableField field="college_name_to">Avichi College of Arts and Science</EditableField></p>
                  <p><EditableField field="college_address_to">Virugambakkam-92</EditableField></p>
                </div>
              </div>

              <div className="mt-8">
                <EditableField field="salutation">Respected Madam,</EditableField>
              </div>

              <div className="font-bold uppercase">
                Subject: Permission Letter for <EditableField field="event_name">{content.event_name || "Event Name"}</EditableField>
              </div>

              <div className="text-justify leading-relaxed">
                <EditableBlock field="proposal_body_1" className="inline">
                  I propose to conduct a session on <span className="font-bold">{content.event_topic || "Event Topic"}</span> for <span className="font-bold">{content.target_audience || "Target Audience"}</span> on {content.event_date || "Event Date"} at {content.event_time || "Time"} in <EditableField field="venue" className="font-bold underline">{content.venue || "Venue"}</EditableField>.
                </EditableBlock>
              </div>

              <div className="text-justify leading-relaxed">
                <EditableBlock field="proposal_body_2" className="inline">
                  We have invited <EditableField field="resource_person" className="font-bold underline">{content.resource_person || "Guest Name"}</EditableField> as the resource person. The session will focus on <span className="font-bold italic">{content.short_description || "Short Description"}</span>. It aims to provide practical exposure and enhance knowledge among students.
                </EditableBlock>
              </div>

              <div className="text-justify">
                <EditableField field="request_sentence">I kindly request your permission to proceed with the arrangements for this event.</EditableField>
              </div>

              <div className="text-justify">
                <EditableField field="thanks_sentence">Thank you for your support and cooperation.</EditableField>
              </div>

              <div className="flex flex-col items-end pt-12">
                <div className="text-right">
                  <p><EditableField field="closing_label">Yours sincerely,</EditableField></p>
                  <div className="mt-10">
                    <p className="font-bold"><EditableField field="from_name">{content.from_name || "Name"}</EditableField></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {onDownload && (
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={onDownload}
            className="flex-1"
          >
            <Download size={18} />
            Download PDF
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="flex-1"
          >
            <Copy size={18} />
            Copy Content
          </Button>
        </div>
      )}
    </div>
  );
};
