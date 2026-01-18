export default function PdfPreview({ file, previewUrl }) {
    if (!file) {
        return (
            <div className="text-center p-10 flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-600 mb-2">Resume Preview</h2>
                <p className="max-w-xs text-sm">Upload a PDF to see it side-by-side with extracted data.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col animate-fadeIn">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md text-xs font-bold border border-red-100">PDF</span>
                    Original Document
                </h3>
            </div>
            <div className="grow relative group">
                <iframe
                    src={previewUrl}
                    className="relative w-full h-full rounded-2xl border border-gray-200 shadow-xl bg-white"
                    title="Resume Preview"
                />
            </div>
        </div>
    );
}
