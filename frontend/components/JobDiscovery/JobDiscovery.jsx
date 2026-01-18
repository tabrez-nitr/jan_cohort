
import React, { useState, useEffect, useMemo } from 'react';
import jobsData from '../../data/jobs.json';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

const JobDiscovery = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({});
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        // Simulate a small delay for better UX (or remove if instant is preferred)
        const timer = setTimeout(() => {
            setJobs(jobsData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = !filters.types?.length || filters.types.includes(job.type);
            const matchesLocation = !filters.locations?.length || filters.locations.includes(job.location);
            const matchesSalary = !filters.minSalary || (job.minSalary && job.minSalary >= filters.minSalary);
            const matchesSkills = !filters.skills?.length || filters.skills.some(skill => job.skills.includes(skill));
            const matchesExperience = filters.experience === undefined || (job.minExperience !== undefined && job.minExperience <= filters.experience);

            return matchesSearch && matchesType && matchesLocation && matchesSalary && matchesSkills && matchesExperience;
        }).sort((a, b) => b.matchScore - a.matchScore);
    }, [jobs, searchQuery, filters]);

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 font-sans animate-fadeIn">
            {/* Header / Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Find Your Next Role</h1>
                    <p className="text-gray-500 font-medium">Discover opportunities tailored to your unique profile.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by job title, company, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block pl-12 p-3.5 shadow-sm transition-all outline-none"
                        />
                    </div>

                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="md:hidden p-3.5 bg-white border border-gray-200 rounded-2xl text-gray-600 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </button>

                    <div className="hidden md:flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 items-start">
                {/* Filters Sidebar (Desktop) */}
                <div className="hidden md:block w-72 shrink-0 bg-white rounded-4xl p-6 border border-gray-100 shadow-sm sticky top-6 h-[calc(100vh-8rem)] overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        Filters
                    </h2>
                    <JobFilters filters={filters} setFilters={setFilters} />
                </div>

                {/* Job List */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <div key={n} className="bg-white h-64 rounded-2xl animate-pulse shadow-sm border border-gray-100"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 text-sm font-bold text-gray-500">
                                Showing {filteredJobs.length} opportunities
                            </div>
                            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                {filteredJobs.map(job => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                            {filteredJobs.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">No jobs found matching your criteria.</p>
                                    <button onClick={() => setFilters({})} className="mt-4 text-blue-600 font-bold hover:underline">Clear all filters</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Filters Drawer Overlay */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden flex justify-end">
                    <div className="w-80 bg-white h-full p-6 shadow-2xl animate-slideInRight overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <JobFilters filters={filters} setFilters={setFilters} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDiscovery;
