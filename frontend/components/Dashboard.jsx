"use client";

import Sidebar from "./Sidebar";
import UploadResume from "./UploadPdf";
import SkillsGapAnalysis from "./SkillsGapAnalysis/SkillsGapAnalysis";
import JobDiscovery from "./JobDiscovery/JobDiscovery";
import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/Landing/ui/card";
import { Upload, BarChart, Briefcase, ArrowRight } from "lucide-react";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("home"); // Default to home to show cards first

    const cards = [
        {
            id: "upload",
            title: "Resume Parsing",
            description: "Upload your resume to extract skills and experience automatically.",
            icon: Upload,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            id: "skills",
            title: "Skills Gap Analysis",
            description: "Analyze your profile against market demands and find opportunities to grow.",
            icon: BarChart,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            id: "jobs",
            title: "Job Discovery",
            description: "Find jobs that perfectly match your skills and career aspirations.",
            icon: Briefcase,
            color: "text-green-600",
            bgColor: "bg-green-50"
        }
    ];

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
                    min-h-screen p-8
                `}
            >
                {activeTab === 'upload' && (
                    <div className="p-0">
                        <UploadResume />
                    </div>
                )}

                {activeTab === 'skills' && (
                    <SkillsGapAnalysis />
                )}

                {activeTab === 'jobs' && (
                    <JobDiscovery />
                )}

                {activeTab === 'home' && (
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to WeVolve</h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Your personal AI career assistant. Manage your resume, analyze your skills, and find your dream job.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cards.map((card) => (
                                <Card
                                    key={card.id}
                                    className="hover:shadow-xl transition-all duration-300 cursor-pointer border-transparent hover:border-blue-100 group relative overflow-hidden"
                                    onClick={() => setActiveTab(card.id)}
                                >
                                    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300`}>
                                        <card.icon className="w-24 h-24" />
                                    </div>

                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                                            <card.icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {card.title}
                                        </CardTitle>
                                        <CardDescription className="text-base text-gray-500 line-clamp-2">
                                            {card.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pt-0 mt-auto">
                                        <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
