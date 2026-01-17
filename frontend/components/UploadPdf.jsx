"use client"; // Required for useState/useEffect in Next.js App Router

import { useState } from "react";

export default function UploadResume() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //  Handle File Selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null); // Clear previous errors
        }
    };

    //  Handle Upload Button Click
    const handleUpload = async () => {
        if (!file) {
            setError("Please select a PDF file first.");
            return;
        }

        setLoading(true);
        setResult(null);
        setError(null);

        //  Prepare FormData (Crucial for file uploads)
        const formData = new FormData();
        formData.append("file", file);
        // ^ The key "file" must match the backend parameter: file: UploadFile = File(...)

        try {
            //  Send POST Request
           
            const response = await fetch("http://127.0.0.1:8000/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();

            //  Show Result
            setResult(JSON.stringify(data, null, 2)); // Pretty print JSON
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong uploading the file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Resume Parser Test
                </h1>

                {/* File Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload PDF Resume
                    </label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              border border-gray-300 rounded-lg cursor-pointer p-2"
                    />
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all
            ${loading || !file
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 shadow-md"
                        }`}
                >
                    {loading ? "Parsing PDF..." : "Upload & Parse"}
                </button>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                {/* Success Result */}
                {result && (
                    <div className="mt-6">
                        <h3 className="text-sm font-bold text-gray-700 mb-2">
                            Backend Response:
                        </h3>
                        <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-xs overflow-auto max-h-64 whitespace-pre-wrap">
                            {result}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}