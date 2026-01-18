"use client";

import { useState, useEffect } from "react";
import PdfPreview from "./PdfPreview";
import FileUploader from "./FileUploader";
import ResumeForm from "./ResumeForm";

// --- Icons ---
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-green-500 mb-4">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

export default function UploadResume() {
    // State
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("idle"); // idle, uploading, parsing, success, error, confirmed
    const [parsedData, setParsedData] = useState({});
    const [error, setError] = useState(null);

    // Clean up object URL on unmount
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // --- Handlers ---

    const processFile = (selectedFile) => {
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError(null);
            setStatus("idle");
        } else {
            setError("Please upload a valid PDF file.");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus("uploading");
        setProgress(0);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 100);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();

            clearInterval(interval);
            setProgress(100);

            const processResumeData = (obj, prefix = '') => {
                const result = {};

                // Helper to check if an object is likely a "Field" (has value/text property)
                const isField = (o) => {
                    if (typeof o !== 'object' || o === null) return false;
                    return 'value' in o || 'text' in o;
                };

                const extractField = (o) => {
                    const val = o.value || o.text;
                    // If the value is an array (e.g. skills), keep it as is or join it
                    const finalVal = Array.isArray(val) ? val.join(", ") : val;
                    return {
                        value: finalVal,
                        confidence: o.confidence || o.score || 0.95 // Default to high if missing
                    };
                }

                Object.keys(obj).forEach(key => {
                    const currentPrefix = prefix ? `${prefix}.${key}` : key;
                    const value = obj[key];

                    if (isField(value)) {
                        // It's a field object in the backend response
                        result[currentPrefix] = extractField(value);
                    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                        // It's a structural object (e.g. wrapper), recurse
                        Object.assign(result, processResumeData(value, currentPrefix));
                    } else {
                        // Primitive value, wrap it
                        result[currentPrefix] = {
                            value: value,
                            confidence: 0.95 // Mock high confidence for primitives
                        };
                    }
                });

                return result;
            };

            const processedData = processResumeData(data);
            console.log("Processed Data:", processedData);

            setParsedData(processedData);
            console.log(processedData);
            setStatus("success");

        } catch (err) {
            clearInterval(interval);
            setError(err.message || "Something went wrong.");
            setStatus("error");
        }
    };

    const handleFieldChange = (key, newValue) => {
        setParsedData(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                value: newValue,
                confidence: 1.0 // Reset confidence on manual edit
            }
        }));
    };

    const handleConfirm = () => {
        setStatus("confirmed");
    };

    const reset = () => {
        setFile(null);
        setPreviewUrl(null);
        setStatus("idle");
        setParsedData({});
        setProgress(0);
        setError(null);
    };

    const renderSuccess = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fadeIn">
            <CheckCircleIcon />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-600 mb-8">The resume has been successfully parsed and saved.</p>
            <button
                onClick={reset}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition-colors"
            >
                Upload Another
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 p-2 font-sans animate-fadeIn">
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[850px] flex flex-col md:flex-row border border-blue-50">

                {/* LEFT SIDE: Preview */}
                <div className={`w-full md:w-1/2 bg-slate-50 border-r border-gray-200 p-6 flex flex-col ${!file ? "items-center justify-center" : ""}`}>
                    <PdfPreview file={file} previewUrl={previewUrl} />
                </div>

                {/* RIGHT SIDE: Action / Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {status === 'confirmed' ? 'Completed' : status === 'success' ? 'Review & Edit' : 'Upload Resume'}
                        </h2>
                    </div>

                    {status === 'confirmed' ? (
                        renderSuccess()
                    ) : (
                        <>
                            {/* Drag & Drop Zone (Only if not successfully parsed yet) */}
                            {status === 'idle' || status === 'uploading' || status === 'error' ? (
                                <FileUploader
                                    file={file}
                                    status={status}
                                    progress={progress}
                                    error={error}
                                    onFileChange={processFile}
                                    onUpload={handleUpload}
                                    onCancel={() => setFile(null)}
                                />
                            ) : (
                                <ResumeForm
                                    data={parsedData}
                                    onChange={handleFieldChange}
                                    onConfirm={handleConfirm}
                                    onCancel={reset}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}