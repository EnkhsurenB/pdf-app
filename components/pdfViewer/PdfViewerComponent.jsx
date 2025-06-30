'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ArrowLeft, ArrowRight, DownloadCloud } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const PdfViewerComponent = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            saveAs(blob, 'sample.pdf');
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="flex flex-col gap-6xl justify-center items-center">
            <div className="text-right w-full">
                <button size="md" variant="secondary" onClick={handleDownload}>
                    <DownloadCloud />
                    Татаж авах
                </button>
            </div>

            <Document
                className="shadow-lg w-full h-auto [&_canvas]:h-auto [&_canvas]:w-full"
                file={fileUrl}
                onLoadError={(ee) => {
                    console.log(ee);
                }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div className="flex flex-row gap-3xl items-center">
                <button variant="tertiary" size="sm" onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
                    <ArrowLeft />
                </button>
                <div className="text-sm text-text-secondary font-medium">
                    Хуудас {pageNumber} / <span className="font-normal text-text-placeholder">{numPages}</span>
                </div>
                <button
                    variant="tertiary"
                    size="sm"
                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                    disabled={pageNumber >= numPages}
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default PdfViewerComponent;
