"use client";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Play, FileText, Briefcase, Sparkles, CheckCircle, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
    const sceneRef = useRef(null);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const cards = scene.querySelectorAll('.floating-card');

        const animateCards = () => {
            cards.forEach((card, index) => {
                const element = card;
                const time = Date.now() * 0.001;
                const offset = index * 0.5;

                const x = Math.sin(time + offset) * 30;
                const y = Math.cos(time + offset * 1.2) * 20;
                const rotateX = Math.sin(time + offset) * 10;
                const rotateY = Math.cos(time + offset * 0.8) * 15;

                element.style.transform = `
          translate3d(${x}px, ${y}px, 0) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;
            });

            requestAnimationFrame(animateCards);
        };

        animateCards();
    }, []);

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
            <div className="container mx-auto px-4 text-center">
                <Badge variant="secondary" className="mb-6 animate-fade-in">
                    <Sparkles className="mr-2 h-3 w-3 text-blue-500" />
                    v2.0 Now Available: Smart Job Matching
                </Badge>
                <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                    Evolve Your Career with{" "}
                    <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        Intelligent Design
                    </span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
                    WeVolve parses your resume, optimizes it for ATS systems, and connects you with
                    perfectly matched opportunities. The future of your career starts here.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/dashboard">
                        <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                            Get Started Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                        <Play className="mr-2 h-4 w-4" />
                        See How It Works
                    </Button>
                </div>

                {/* 3D Graphics Scene */}
                <div className="relative mx-auto max-w-5xl h-96 lg:h-[500px] mt-16">
                    <div
                        ref={sceneRef}
                        className="relative w-full h-full perspective-1000"
                        style={{ perspective: '1000px' }}
                    >
                        {/* Central Hub */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center z-10 border-4 border-white/20">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                                <Sparkles className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>

                        {/* Floating Cards */}

                        {/* Resume Score Card */}
                        <div className="floating-card absolute top-10 left-10 md:left-20 w-48 h-auto bg-card/90 backdrop-blur-sm border rounded-xl shadow-xl p-4 transform-gpu">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">ATS Score</div>
                                    <div className="text-lg font-bold text-foreground">98/100</div>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[98%] rounded-full" />
                            </div>
                        </div>

                        {/* Skills Card */}
                        <div className="floating-card absolute top-20 right-10 md:right-20 w-40 h-auto bg-card/90 backdrop-blur-sm border rounded-xl shadow-xl p-3 transform-gpu">
                            <div className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Detected Skills</div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded-full font-medium">React</span>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded-full font-medium">Node.js</span>
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full font-medium">Python</span>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded-full font-medium">AWS</span>
                            </div>
                        </div>

                        {/* Job Match Card */}
                        <div className="floating-card absolute bottom-20 left-4 md:left-12 w-52 h-auto bg-card/90 backdrop-blur-sm border rounded-xl shadow-xl p-4 transform-gpu">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-xs font-semibold text-foreground">Senior Frontend Dev</div>
                                    <div className="text-[10px] text-muted-foreground">TechCorp Inc.</div>
                                </div>
                                <Badge variant="default" className="bg-blue-600 text-[10px] h-5">95% Match</Badge>
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-1.5 bg-muted rounded-full w-full" />
                                <div className="h-1.5 bg-muted rounded-full w-2/3" />
                            </div>
                        </div>

                        {/* Salary Insight Card */}
                        <div className="floating-card absolute bottom-24 right-8 md:right-24 w-44 h-auto bg-card/90 backdrop-blur-sm border rounded-xl shadow-xl p-4 transform-gpu">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <TrendingUp className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Est. Salary</div>
                                    <div className="text-sm font-bold text-foreground">$120k - $150k</div>
                                </div>
                            </div>
                        </div>

                        {/* Resume File Card */}
                        <div className="floating-card absolute top-1/2 left-8 -mt-8 w-12 h-16 bg-white border rounded shadow-md flex items-center justify-center transform-gpu">
                            <FileText className="text-gray-400 h-6 w-6" />
                        </div>

                        {/* Briefcase Icon */}
                        <div className="floating-card absolute top-1/3 right-12 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-sm transform-gpu">
                            <Briefcase className="text-blue-600 h-5 w-5" />
                        </div>

                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" />
                            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
                            <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                        </svg>

                        {/* Background Particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-blue-500/30 rounded-full animate-pulse"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        animationDuration: `${2 + Math.random() * 3}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}