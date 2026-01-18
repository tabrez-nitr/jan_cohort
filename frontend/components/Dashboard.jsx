"use client";

import Sidebar from "./Sidebar";
import UploadResume from "./UploadPdf";
import JobDiscovery from "./JobDiscovery/JobDiscovery";
import { useState } from "react";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("upload");

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Content Area */}
            <main
                className={`
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                    ${isSidebarOpen ? "ml-80" : "ml-32"}
                    min-h-screen p-4
                `}
            >
                {activeTab === 'upload' && (
                    <div className="p-0">
                        <UploadResume />
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <JobDiscovery />
                )}

                {activeTab === 'home' && (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to WeVolve</h1>
                            <p className="text-gray-600">Select "Upload File" from the sidebar to start parsing resumes.</p>
                            <button
                                onClick={() => setActiveTab('upload')}
                                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
