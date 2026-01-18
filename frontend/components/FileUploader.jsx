

import { useState } from "react";
import ProgressBar from "./ProgressBar";

// --- Icons ---
const CloudUploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-blue-400 mb-4 transition-transform group-hover:scale-110 duration-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
);

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export default function FileUploader({
    file,
    status,
    progress,
    error,
    onFileChange,
    onUpload,
    onCancel
}) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        onFileChange(droppedFile);
    };

    return (
        <div className="grow flex flex-col justify-center animate-fadeIn">
            {!file ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        group relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ease-out
                        ${isDragging
                            ? "border-blue-500 bg-blue-50/50 scale-[1.02] shadow-xl"
                            : "border-gray-200 hover:border-blue-400 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1"
                        }
                    `}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => onFileChange(e.target.files[0])}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center relative z-10">
                        <div className={`p-4 rounded-full bg-blue-50 mb-4 transition-colors duration-300 group-hover:bg-blue-100`}>
                            <CloudUploadIcon />
                        </div>
                        <span className="text-xl font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                            Drop your Resume PDF
                        </span>
                        <span className="text-sm text-gray-500 mt-2 font-medium">
                            or click to browse locally
                        </span>
                    </label>
                </div>
            ) : (
                <div className="bg-white border border-blue-100 rounded-3xl p-8 flex flex-col items-center shadow-lg transform transition-all animate-fadeIn">
                    <div className="p-4 bg-blue-50 rounded-2xl mb-4">
                        <FileIcon />
                    </div>
                    <p className="text-lg font-bold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500 font-medium mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                    {status === 'idle' && (
                        <button
                            onClick={onCancel}
                            className="text-sm text-red-500 bg-red-50 hover:bg-red-100 py-2 px-4 rounded-full font-medium transition-colors"
                        >
                            Remove file
                        </button>
                    )}
                </div>
            )}

            {/* Actions */}
            {file && status === 'idle' && (
                <button
                    onClick={onUpload}
                    className="w-full mt-8 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-blue-500/30 shadow-lg hover:bg-blue-700 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
                >
                    Analyze Resume
                </button>
            )}

            {status === 'uploading' && <ProgressBar progress={progress} />}

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center justify-center gap-2 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
}
