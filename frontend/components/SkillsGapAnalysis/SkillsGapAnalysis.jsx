'use client';

import { useState, useEffect } from "react";
import { ArrowRight, Target, User, Zap, Briefcase, GraduationCap, Clock, CheckCircle, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "../Landing/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../Landing/ui/card";
import { Badge } from "../Landing/ui/badge";
import { Checkbox } from "../Landing/ui/checkbox";

// --- Constants ---
const ROLES = [
    "Junior Backend Developer",
    "Senior Full Stack Developer",
    "Frontend Engineer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager"
];

const SKILLS_LIST = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "FastAPI",
    "Django", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS",
    "Git", "System Design", "CI/CD", "TypeScript", "TailwindCSS"
];

const EDUCATION_LEVELS = [
    "High School",
    "B.Tech CS",
    "B.Sc Computer Science",
    "M.Tech / MCA",
    "PhD",
    "Self Taught / Bootcamp"
];

export default function SkillsGapAnalysis() {
    const [formData, setFormData] = useState({
        current_role: "",
        current_skills: [],
        target_role: "",
        target_skills: [],
        experience_years: 1,
        education: "B.Tech CS"
    });

    // UI State
    const [view, setView] = useState("form"); // 'form' | 'results'
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Progress Tracking State
    const [completedSkills, setCompletedSkills] = useState(new Set());

    // Toggle Form Skills
    const toggleSkill = (skill, type) => {
        setFormData(prev => {
            const list = prev[type];
            if (list.includes(skill)) {
                return { ...prev, [type]: list.filter(s => s !== skill) };
            } else {
                return { ...prev, [type]: [...list, skill] };
            }
        });
    };

    // Toggle Resume Checkbox
    const toggleCompletion = (skill) => {
        const newSet = new Set(completedSkills);
        if (newSet.has(skill)) {
            newSet.delete(skill);
        } else {
            newSet.add(skill);
        }
        setCompletedSkills(newSet);
    };

    // Calculate Progress
    const totalSkills = result ? result.analysis.missing_skills.length : 0;
    const completedCount = completedSkills.size;
    const progressPercent = totalSkills > 0 ? Math.round((completedCount / totalSkills) * 100) : 0;

    const checkGap = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                candidate: {
                    current_role: formData.current_role,
                    current_skills: formData.current_skills,
                    experience_years: parseInt(formData.experience_years) || 0,
                    education: formData.education
                },
                target_role: { // Fixed structure
                    title: formData.target_role,
                    required_skills: formData.target_skills,
                    typical_experience: "3-5 years"
                }
            };
             
            const api_url = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(api_url + "/api/skills/analyze", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();
            setResult(data);
            setCompletedSkills(new Set()); // Reset progress
            setView("results");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Reset View
    const handleReset = () => {
        setView("form");
        setResult(null);
        setError(null);
    };

    if (view === "results" && result) {
        return (
            <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in zoom-in duration-500">
                {/* Top Actions & Progress */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <Button onClick={handleReset} variant="ghost" className="w-fit text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                        <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back
                    </Button>

                    {/* Progress Bar Component */}
                    <div className="flex items-center gap-4 bg-white p-3 rounded-xl border shadow-sm w-full md:w-auto min-w-[300px]">
                        <div className="space-y-1 grow">
                            <div className="flex justify-between text-xs font-semibold uppercase text-slate-500">
                                <span>Roadmap Progress</span>
                                <span>{progressPercent}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="shrink-0">
                            {progressPercent === 100 ? (
                                <div className="text-green-500 animate-bounce">
                                    <Sparkles size={24} />
                                </div>
                            ) : (
                                <div className="text-blue-500 font-bold text-sm">{completedCount}/{totalSkills}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Analysis KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <KPICard label="Skill Gap" value={`${result.analysis.skill_gap_percentage}%`} color="text-blue-600" icon={AlertCircle} />
                    <KPICard label="Readiness" value={`${result.analysis.readiness_score}/100`} color="text-blue-500" icon={CheckCircle} />
                    <KPICard label="Missing Skills" value={result.analysis.missing_skills.length} color="text-blue-600" icon={Target} />
                    <KPICard label="Est. Time" value={`${result.analysis.estimated_learning_time_months} Mo`} color="text-blue-500" icon={Clock} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Roadmap Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <Zap className="fill-yellow-400 text-yellow-400" /> Your Personalized Roadmap
                        </h2>

                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200 hidden md:block"></div>

                            {result.learning_roadmap.map((phase, index) => (
                                <div key={index} className="relative pl-0 md:pl-20 group">
                                    {/* Phase Marker (Desktop) */}
                                    <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-white border-2 border-blue-600 z-10 hidden md:flex items-center justify-center font-bold text-xs text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                        {phase.phase}
                                    </div>

                                    {/* Phase Card */}
                                    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all bg-white hover:bg-slate-50">
                                        <CardHeader>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                <div className="space-y-1">
                                                    <Badge variant="outline" className="w-fit mb-2 md:hidden">Phase {phase.phase}</Badge>
                                                    <CardTitle className="text-xl font-bold text-slate-900">{phase.focus}</CardTitle>
                                                    <CardDescription className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" /> {phase.duration_months} Months
                                                        <span className="text-slate-300">|</span>
                                                        <span className={`font-semibold ${phase.priority === 'High' ? 'text-blue-600' : 'text-slate-500'}`}>{phase.priority} Priority</span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-sm text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                "{phase.reasoning}"
                                            </p>

                                            <div className="space-y-3">
                                                <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Skills to Master</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {phase.skills_to_learn.map(skill => (
                                                        <div
                                                            key={skill}
                                                            className={`
                                                                flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer
                                                                ${completedSkills.has(skill)
                                                                    ? 'bg-blue-50 border-blue-200 opacity-80'
                                                                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50'}
                                                            `}
                                                            onClick={() => toggleCompletion(skill)}
                                                        >
                                                            <Checkbox
                                                                checked={completedSkills.has(skill)}
                                                                onCheckedChange={() => toggleCompletion(skill)}
                                                                id={`skill-${skill}`}
                                                                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                                            />
                                                            <label
                                                                htmlFor={`skill-${skill}`}
                                                                className={`text-sm font-medium cursor-pointer select-none ${completedSkills.has(skill) ? 'text-green-800 line-through' : 'text-slate-700'}`}
                                                            >
                                                                {skill}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none shadow-lg overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <TrendingUp className="w-5 h-5" /> Market Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div className="bg-white/20 p-4 rounded-lg hover:bg-white/30 transition-colors">
                                    <p className="text-xs text-blue-100 mb-2 font-medium">Success Rate</p>
                                    <p className="text-2xl font-bold text-white">{result.similar_transitions.success_rate}</p>
                                </div>
                                <div className="bg-white/20 p-4 rounded-lg hover:bg-white/30 transition-colors">
                                    <p className="text-xs text-blue-100 mb-2 font-medium">Avg Time</p>
                                    <p className="text-2xl font-bold text-white">{result.similar_transitions.avg_transition_time_months} Mo</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <GraduationCap className="text-blue-600 w-5 h-5" /> Resources
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {result.recommended_resources.map((res, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700 p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-200">
                                            <span className="font-semibold text-blue-600 flex-shrink-0 w-6 text-center">{i + 1}.</span>
                                            <span className="flex-1">{res}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // FORM VIEW
    return (
        <div className="max-w-5xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="overflow-hidden border border-blue-200 shadow-xl">
                {/* Hero Header */}
                <div className="bg-white border-b border-blue-100 px-5 md:px-12 py-5 md:py-14 text-center">
                    {/* Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Career <span className="text-blue-600">Path Analyzer</span>
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed max-w-2xl mx-auto font-light">
                            Discover the exact skills needed for your next role with AI-powered insights
                        </p>
                    </div>
                </div>
            </Card>

            <form onSubmit={checkGap} className="p-8 md:p-12 space-y-12 bg-slate-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
                    {/* Divider */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

                    {/* LEFT SECTION */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-blue-100 pb-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <User className="text-blue-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Where are you now?</h3>
                                <p className="text-sm text-slate-500">Define your current starting point</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Current Role</label>
                                <select
                                    className="w-full p-3 bg-slate-50 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 transition-shadow"
                                    value={formData.current_role}
                                    onChange={(e) => setFormData({ ...formData, current_role: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Select your role...</option>
                                    {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                                        Experience
                                        <span className="text-blue-600">{formData.experience_years} Yrs</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="15"
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        value={formData.experience_years}
                                        onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Education</label>
                                    <select
                                        className="w-full p-2.5 bg-slate-50 border-none rounded-xl text-sm font-medium text-slate-700"
                                        value={formData.education}
                                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                    >
                                        {EDUCATION_LEVELS.map(edu => <option key={edu} value={edu}>{edu}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700">Your Skills</label>
                                <div className="flex flex-wrap gap-2">
                                        {SKILLS_LIST.map(skill => (
                                            <Badge
                                                key={`t-${skill}`}
                                                variant={formData.target_skills.includes(skill) ? "default" : "outline"}
                                                className={`cursor-pointer px-3 py-2 font-medium transition-all ${formData.target_skills.includes(skill) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50'}`}
                                                onClick={() => toggleSkill(skill, 'target_skills')}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 border-b border-blue-100 pb-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Target className="text-blue-600 w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Where do you want to be?</h3>
                                <p className="text-sm text-slate-500">Set your career destination</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Target Role</label>
                                <select
                                    className="w-full p-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-slate-700 transition-all"
                                    value={formData.target_role}
                                    onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Select your goal...</option>
                                    {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700">Required Skills</label>
                                <div className="flex flex-wrap gap-2">
                                        {SKILLS_LIST.map(skill => (
                                            <Badge
                                                key={`c-${skill}`}
                                                variant={formData.current_skills.includes(skill) ? "default" : "outline"}
                                                className={`cursor-pointer px-3 py-2 font-medium transition-all ${formData.current_skills.includes(skill) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50'}`}
                                                onClick={() => toggleSkill(skill, 'current_skills')}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-8">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                        {loading ? "Analyzing..." : "Analyze Gap"} <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </form>

            {error && (
                <div className="mt-8 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 font-medium text-center animate-shake">
                    {error}
                </div>
            )}
        </div>
    );
}

function KPICard({ label, value, color, icon: Icon }) {
    return (
        <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all bg-white hover:bg-slate-50">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-2.5 rounded-full bg-blue-50">
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                    <div className="text-2xl font-black text-slate-900">{value}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</div>
                </div>
            </CardContent>
        </Card>
    );
}
