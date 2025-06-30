import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('./PdfViewerComponent'), {
    ssr: false,
    loading: () => <div className='flex justify-center items-center min-h-[400px]'>Loading PDF viewer...</div>,
});

export default PdfViewer;
