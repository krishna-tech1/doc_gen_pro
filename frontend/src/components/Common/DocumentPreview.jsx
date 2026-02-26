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
      <div className="bg-white rounded-md p-10 shadow-lg border border-gray-100 mb-8 mx-auto max-w-[800px] min-h-[1056px]">
        {/* Actual Header Image loaded into Live Preview */}
        <div className="w-full mb-10 flex items-center justify-center">
          <img src="/logo.jpeg" alt="College Header" className="max-w-full h-auto object-contain" style={{ maxHeight: '140px' }} />
        </div>

        {/* Content sections strictly matching the DOCX */}
        <div className="font-serif text-black space-y-4" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt', lineHeight: 1.15 }}>

          <div className="text-center font-bold text-[14pt] mb-8">
            CIRCULAR
          </div>

          <div className="flex justify-between mb-8">
            <div>Ref No: Acas/BCA/Ext/Cir/25–26</div>
            <div>Date: {content.date || "18/02/2026"}</div>
          </div>

          <div className="text-justify">
            This is to inform that the <span className="font-bold">Department of {content.department || "Computer Applications"}</span> will be organizing an <span className="font-bold">{content.title || "Extension Activity – Hands-on Training with Canva"}</span> for the students of XI at {content.venue || "Avichi School"} on {content.date || "20th February 2026"} at {content.time || "10:00 AM"}.
          </div>

          <div className="text-justify pt-4">
            The program aims to enhance digital skills and creativity among school students through practical learning.
          </div>

          <div className="text-justify pt-4">
            All concerned are requested to take note of the same.
          </div>
        </div>

        {/* Signature block */}
        <div className="font-serif text-black mt-16 flex justify-between pt-8" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt' }}>
          <div className="text-center">
            <p className="font-bold">Event Coordinator</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Principal</p>
          </div>
        </div>

        {/* Copy To block */}
        <div className="font-serif text-black mt-12" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12pt' }}>
          <p className="font-bold mb-4">Copy To:</p>
          <div className="ml-8 space-y-4">
            <p>All HODs</p>
            <p>IQAC</p>
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
