import React from 'react';
import { Download, Copy } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const DocumentPreview = ({
  content = {},
  onDownload,
  onUpdateField,
  title = 'Document Preview',
  compact = false
}) => {
  const EditableField = ({ field, children, className = "" }) => {
    if (!onUpdateField) return <span className={className}>{children}</span>;

    return (
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdateField(field, e.currentTarget.textContent)}
        className={`hover:bg-yellow-50 hover:cursor-text focus:bg-yellow-50 focus:outline-none rounded px-1 transition-colors border-b border-transparent hover:border-yellow-200 ${className}`}
        title="Click to edit"
      >
        {children}
      </span>
    );
  };

  const EditableBlock = ({ field, children, className = "" }) => {
    if (!onUpdateField) return <div className={className}>{children}</div>;

    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdateField(field, e.currentTarget.textContent)}
        className={`hover:bg-yellow-50 hover:cursor-text focus:bg-yellow-50 focus:outline-none rounded p-2 transition-colors border border-transparent hover:border-yellow-200 ${className}`}
        title="Click to edit body"
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
    <div className="h-full">
      {/* Print-like preview */}
      <div className="bg-white rounded-md p-12 shadow-2xl border border-gray-100 mb-8 mx-auto max-w-[850px] min-h-[1100px] transition-all">
        {/* Only show header if NOT a proposal (user said no college header for proposal) */}
        {!content.proposal_date && (
          <div className="w-full mb-10 flex items-center justify-center">
            <img src="/logo.jpeg" alt="College Header" className="max-w-full h-auto object-contain" style={{ maxHeight: '140px' }} />
          </div>
        )}

        {/* Content sections strictly matching the DOCX */}
        <div className="font-serif text-black space-y-6" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt', lineHeight: 1.5 }}>

          {/* CIRCULAR VIEW */}
          {!content.proposal_date ? (
            <>
              <div className="text-center font-bold text-[14pt] mb-10 tracking-widest underline decoration-double underline-offset-4">
                CIRCULAR
              </div>

              <div className="flex justify-end mb-10 font-bold">
                <div>
                  Date: {content.date || "DD/MM/YYYY"}
                </div>
              </div>

              {content.description ? (
                <EditableBlock field="description" className="text-justify whitespace-pre-wrap leading-relaxed py-4">
                  {content.description}
                </EditableBlock>
              ) : (
                <div className="space-y-6">
                  <div className="text-justify leading-relaxed">
                    This is to inform that the <EditableField field="department" className="font-bold">Department of {content.department || "..."}</EditableField> will be organizing <EditableField field="event_name" className="font-bold">{content.event_name || "..."}</EditableField> on {content.date || "..."} {content.time ? ` at ${content.time}` : ""} in the college premises.
                  </div>

                  <div className="text-justify">
                    The program aims to enrich students with knowledge and practical exposure in the relevant field.
                  </div>

                  <div className="text-justify">
                    We are honored to have <EditableField field="chief_guest" className="font-bold">{content.chief_guest || "..."}</EditableField> as the Chief Guest for this event.
                  </div>

                  <div className="text-justify">
                    All concerned are requested to take note of the same and participate actively.
                  </div>
                </div>
              )}

              {/* Signature block for Circular */}
              <div className="mt-24 flex justify-between pt-8">
                <div className="text-center font-bold">Event Coordinator</div>
                <div className="text-center font-bold">Principal</div>
              </div>

              {/* Copy To block for Circular */}
              <div className="mt-16">
                <p className="font-bold mb-4">Copy To:</p>
                <div className="ml-8 space-y-2 italic text-gray-700">
                  <p>• All HODs</p>
                  <p>• IQAC</p>
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
                <p className="font-bold underline mb-1">From</p>
                <div className="space-y-0 text-sm">
                  <p><EditableField field="from_name">{content.from_name || "Name"}</EditableField></p>
                  <p><EditableField field="from_designation">{content.from_designation || "Designation"}</EditableField></p>
                  <p><EditableField field="department">{content.department || "Department"}</EditableField></p>
                  <p>Avichi College of Arts and Science</p>
                  <p>Virugambakkam-92</p>
                </div>
              </div>

              <div>
                <p className="font-bold underline mb-1">To</p>
                <div className="space-y-0 text-sm">
                  <p>The Principal</p>
                  <p>Avichi College of Arts and Science</p>
                  <p>Virugambakkam-92</p>
                </div>
              </div>

              <div className="mt-8">
                Respected Madam,
              </div>

              <div className="font-bold uppercase">
                Subject: Permission Letter for <EditableField field="event_name">{content.event_name || "Event Name"}</EditableField>
              </div>

              <div className="text-justify leading-relaxed">
                I propose to conduct a session on <EditableField field="event_topic" className="font-bold">{content.event_topic || "Event Topic"}</EditableField> for <EditableField field="target_audience" className="font-bold">{content.target_audience || "Target Audience"}</EditableField> on <EditableField field="event_date">{content.event_date || "Event Date"}</EditableField> at <EditableField field="event_time">{content.event_time || "Time"}</EditableField>.
              </div>

              <div className="text-justify leading-relaxed">
                The session will focus on <EditableBlock field="short_description" className="inline font-bold italic">{content.short_description || "Short Description"}</EditableBlock>. It aims to provide practical exposure and enhance knowledge among students.
              </div>

              <div className="text-justify">
                I kindly request your permission to proceed with the arrangements for this event.
              </div>

              <div className="text-justify">
                Thank you for your support and cooperation.
              </div>

              <div className="flex flex-col items-end pt-12">
                <div className="text-right">
                  <p>Yours sincerely,</p>
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
