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
        onBlur={(e) => onUpdateField(field, e.currentTarget.innerText)}
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
        onBlur={(e) => onUpdateField(field, e.currentTarget.innerText)}
        className={`${isEditMode ? 'hover:bg-yellow-50 hover:cursor-text focus:bg-yellow-50 focus:outline-none rounded p-2 transition-colors border border-indigo-100 ring-1 ring-transparent focus:ring-indigo-50' : ''} whitespace-pre-wrap ${className}`}
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
          {docType === 'circular' && (
            <>
              <div className="text-center font-bold text-[14pt] mb-10 tracking-widest underline decoration-double underline-offset-4">
                <EditableField field="document_title">CIRCULAR</EditableField>
              </div>

              <div className="flex justify-end mb-10 font-bold">
                <EditableField field="date_line">
                  Date: {content.date || "DD/MM/YYYY"}
                </EditableField>
              </div>

              {content.description ? (
                <EditableBlock field="description" className="text-justify whitespace-pre-wrap leading-relaxed py-4">
                  {content.description}
                </EditableBlock>
              ) : (
                <div className="space-y-6">
                  <EditableBlock field="circular_body_1" className="text-justify leading-relaxed">
                    This is to inform that the <span className="font-bold">Department of {content.department || "..."}</span> will be organizing <span className="font-bold">{content.event_name || "..."}</span> on {content.date || "..."} {content.time ? ` at ${content.time}` : ""} in the college premises.
                  </EditableBlock>

                  <EditableBlock field="circular_body_2" className="text-justify leading-relaxed">
                    The program aims to enrich students with knowledge and practical exposure in the relevant field.
                  </EditableBlock>

                  <EditableBlock field="circular_body_3" className="text-justify leading-relaxed">
                    We are honored to have <span className="font-bold">{content.chief_guest || "..."}</span> as the Chief Guest for this event.
                  </EditableBlock>

                  <EditableBlock field="circular_body_4" className="text-justify leading-relaxed">
                    All concerned are requested to take note of the same and participate actively.
                  </EditableBlock>
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
                <EditableField field="copy_to_label" className="font-bold mb-4 block">Copy To:</EditableField>
                <div className="ml-8 space-y-2 italic text-gray-700">
                  <EditableBlock field="copy_to_list" className="space-y-2">
                    <p>• All HODs</p>
                    <p>• IQAC</p>
                  </EditableBlock>
                </div>
              </div>
            </>
          )}

          {/* PROPOSAL VIEW */}
          {docType === 'proposal' && (
            <div className="space-y-8">
              <EditableField field="proposal_date_line" className="mb-4 block">
                Date: {content.proposal_date || "DD/MM/YYYY"}
              </EditableField>

              <div className="space-y-1">
                <EditableField field="from_label" className="font-bold underline block">From</EditableField>
                <div className="space-y-0 text-sm">
                  <EditableField field="from_name_line" className="block">{content.from_name || "Name"}</EditableField>
                  <EditableField field="from_designation_line" className="block">{content.from_designation || "Designation"}</EditableField>
                  <EditableField field="department_line" className="block">{content.department || "Department"}</EditableField>
                  <EditableField field="college_name_line" className="block">Avichi College of Arts and Science</EditableField>
                  <EditableField field="college_address_line" className="block">Virugambakkam-92</EditableField>
                </div>
              </div>

              <div className="space-y-1">
                <EditableField field="to_label" className="font-bold underline block">To</EditableField>
                <div className="space-y-0 text-sm">
                  <EditableField field="to_recipient_line" className="block">The Principal</EditableField>
                  <EditableField field="to_college_line" className="block">Avichi College of Arts and Science</EditableField>
                  <EditableField field="to_address_line" className="block">Virugambakkam-92</EditableField>
                </div>
              </div>

              <div className="mt-8">
                <EditableField field="salutation_line" className="block">Respected Madam,</EditableField>
              </div>

              <EditableField field="subject_line" className="font-bold uppercase block">
                Subject: Permission Letter for {content.event_name || "Event Name"}
              </EditableField>

              <EditableBlock field="proposal_body_1" className="text-justify leading-relaxed">
                I propose to conduct a session on <span className="font-bold">{content.event_topic || "Event Topic"}</span> for <span className="font-bold">{content.target_audience || "Target Audience"}</span> on {content.event_date || "Event Date"} at {content.event_time || "Time"} in <span className="font-bold underline">{content.venue || "Venue"}</span>.
              </EditableBlock>

              <EditableBlock field="proposal_body_2" className="text-justify leading-relaxed">
                We have invited <span className="font-bold underline">{content.resource_person || "Guest Name"}</span> as the resource person. The session will focus on <span className="font-bold italic">{content.short_description || "Short Description"}</span>. It aims to provide practical exposure and enhance knowledge among students.
              </EditableBlock>

              <EditableField field="request_sentence" className="text-justify block">
                I kindly request your permission to proceed with the arrangements for this event.
              </EditableField>

              <EditableField field="thanks_sentence" className="text-justify block">
                Thank you for your support and cooperation.
              </EditableField>

              <div className="flex flex-col items-end pt-12">
                <div className="text-right">
                  <EditableField field="closing_label" className="block">Yours sincerely,</EditableField>
                  <div className="mt-10">
                    <p className="font-bold">
                      <EditableField field="from_name_footer">{content.from_name || "Name"}</EditableField>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORT VIEW */}
          {docType === 'report' && (
            <div className="space-y-8">
              <div className="text-center font-bold text-[16pt] mb-2 text-indigo-900">
                <EditableField field="report_header">EVENT REPORT</EditableField>
              </div>

              <div className="text-center font-bold text-[18pt] uppercase tracking-tight border-b-2 border-indigo-100 pb-4 mb-8">
                <EditableField field="event_title">{content.event_title || "EVENT TITLE"}</EditableField>
              </div>

              {/* Meta Table */}
              <div className="grid grid-cols-2 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-slate-50 p-4 border-r border-b border-gray-300 font-bold">Number of Participants</div>
                <div className="p-4 border-b border-gray-300">
                  <EditableField field="num_participants">{content.num_participants || "..."}</EditableField>
                </div>

                <div className="bg-slate-50 p-4 border-r border-b border-gray-300 font-bold">Event Date</div>
                <div className="p-4 border-b border-gray-300">
                  <EditableField field="date">{content.date || "..."}</EditableField>
                </div>

                <div className="bg-slate-50 p-4 border-r border-b border-gray-300 font-bold">Location</div>
                <div className="p-4 border-b border-gray-300">
                  <EditableField field="location_name">{content.location_name || "On Campus"}</EditableField>
                </div>

                <div className="bg-slate-50 p-4 border-r border-gray-300 font-bold">SDG Goal</div>
                <div className="p-4">
                  <EditableField field="sdg_goal">{content.sdg_goal || "..."}</EditableField>
                </div>
              </div>

              <div className="space-y-10 pt-8">
                <div>
                  <h3 className="text-[14pt] font-bold text-slate-800 mb-3 border-l-4 border-indigo-600 pl-4 py-1 bg-slate-50">1. Introduction</h3>
                  <EditableBlock field="introduction" className="text-justify leading-relaxed px-2">
                    {content.introduction || "..."}
                  </EditableBlock>
                </div>

                <div>
                  <h3 className="text-[14pt] font-bold text-slate-800 mb-3 border-l-4 border-indigo-600 pl-4 py-1 bg-slate-50">2. Objectives</h3>
                  <EditableBlock field="objectives" className="text-justify leading-relaxed px-2">
                    {content.objectives || "..."}
                  </EditableBlock>
                </div>

                <div>
                  <h3 className="text-[14pt] font-bold text-slate-800 mb-3 border-l-4 border-indigo-600 pl-4 py-1 bg-slate-50">3. Proceedings Summary</h3>
                  <EditableBlock field="outcome" className="text-justify leading-relaxed px-2">
                    {content.outcome || "..."}
                  </EditableBlock>
                </div>

                <div>
                  <h3 className="text-[14pt] font-bold text-slate-800 mb-3 border-l-4 border-indigo-600 pl-4 py-1 bg-slate-50">4. SDG Alignment</h3>
                  <EditableBlock field="sdg_alignment" className="text-justify leading-relaxed px-2">
                    {content.sdg_alignment || "..."}
                  </EditableBlock>
                </div>

                <div>
                  <h3 className="text-[14pt] font-bold text-slate-800 mb-3 border-l-4 border-indigo-600 pl-4 py-1 bg-slate-50">5. Conclusion</h3>
                  <EditableBlock field="conclusion" className="text-justify leading-relaxed px-2">
                    {content.conclusion || "..."}
                  </EditableBlock>
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
