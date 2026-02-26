import React from 'react';
import { Download, Copy } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const DocumentPreview = ({
  content = {},
  onDownload,
  title = 'Document Preview',
  compact = false
}) => {
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
        {/* Actual Header Image loaded into Live Preview */}
        <div className="w-full mb-10 flex items-center justify-center">
          <img src="/logo.jpeg" alt="College Header" className="max-w-full h-auto object-contain" style={{ maxHeight: '140px' }} />
        </div>

        {/* Content sections strictly matching the DOCX */}
        <div className="font-serif text-black space-y-6" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt', lineHeight: 1.5 }}>

          <div className="text-center font-bold text-[14pt] mb-10 tracking-widest underline decoration-double underline-offset-4">
            CIRCULAR
          </div>

          <div className="flex justify-between mb-10 font-bold">
            <div>Ref No: ____________</div>
            <div>
              Date: {content.date || "DD/MM/YYYY"}
              {content.end_date ? ` to ${content.end_date}` : ""}
            </div>
          </div>

          {content.description ? (
            <div className="text-justify whitespace-pre-wrap leading-relaxed py-4">
              {content.description}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-justify leading-relaxed">
                This is to inform that the <span className="font-bold">Department of {content.department || "..."}</span> will be organizing <span className="font-bold">{content.event_name || "..."}</span> on {content.date || "..."} {content.time ? ` at ${content.time}` : ""} in the college premises.
              </div>

              <div className="text-justify">
                The program aims to enrich students with knowledge and practical exposure in the relevant field.
              </div>

              <div className="text-justify">
                We are honored to have <span className="font-bold">{content.chief_guest || "..."}</span> as the Chief Guest for this event.
              </div>

              <div className="text-justify">
                All concerned are requested to take note of the same and participate actively.
              </div>
            </div>
          )}
        </div>

        {/* Signature block */}
        <div className="font-serif text-black mt-24 flex justify-between pt-8" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt' }}>
          <div className="text-center">
            <p className="font-bold">Event Coordinator</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Principal</p>
          </div>
        </div>

        {/* Copy To block */}
        <div className="font-serif text-black mt-16" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt' }}>
          <p className="font-bold mb-4">Copy To:</p>
          <div className="ml-8 space-y-2 italic text-gray-700">
            <p>• All HODs</p>
            <p>• IQAC</p>
          </div>
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
