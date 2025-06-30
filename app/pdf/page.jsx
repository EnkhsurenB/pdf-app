'use client';

import { PdfViewer } from '@/components/pdfViewer';

export default function SinglePage(props) {
    return (
        <>
            <div className="max-w-[500px] h-[80vh] w-fit mt-5 pb-10 w-full">
                <PdfViewer fileUrl="/des.pdf" />
            </div>
        </>
    );
}
