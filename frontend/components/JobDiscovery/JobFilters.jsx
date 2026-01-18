
import React, { useState } from 'react';

const JobFilters = ({ filters, setFilters }) => {
    const [skillSearch, setSkillSearch] = useState("");

    const commonSkills = ["React", "Node.js", "Python", "Java", "Figma", "AWS", "SQL", "Docker"];
    const locations = ["Remote", "Bangalore, KA", "Mumbai, MH", "Delhi, NCR", "Hyderabad, TS", "Pune, MH", "Chennai, TN"];

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleCheckboxChange = (category, item) => {
        setFilters(prev => {
            const current = prev[category] || [];
            if (current.includes(item)) {
                return { ...prev, [category]: current.filter(i => i !== item) };
            } else {
                return { ...prev, [category]: [...current, item] };
            }
        });
    };

    const toggleSkill = (skill) => {
        handleCheckboxChange('skills', skill);
    };

    return (
        <div className="w-full h-full  flex  flex-col gap-4">

            {/* Job Type */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Job Type</h3>
                <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance"].map(type => (
                        <label key={type} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.types?.includes(type) || false}
                                onChange={() => handleCheckboxChange('types', type)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                            />
                            <span className="font-medium">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Salary Range */}
            <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Min Salary</h3>
                <div className="px-2">
                    <input
                        type="range"
                        min="3"
                        max="50"
                        step="1"
                        value={filters.minSalary || 3}
                        onChange={(e) => handleChange('minSalary', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                        <span>3LPA</span>
                        <span>50LPA+</span>
                    </div>
                    <div className="text-center mt-2 font-bold text-blue-600 bg-blue-50 py-1 rounded-lg text-sm">
                        ₹{filters.minSalary || 3} Lakhs PA
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    {commonSkills.map(skill => (
                        <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border transition-all
                                ${filters.skills?.includes(skill)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}
                            `}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Experience Level */}
            <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Experience</h3>
                <div className="px-2">
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={filters.experience || 0}
                        onChange={(e) => handleChange('experience', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                        <span>0y</span>
                        <span>10y+</span>
                    </div>
                    <div className="text-center mt-2 font-bold text-gray-700 bg-gray-50 py-1 rounded-lg text-sm">
                        {filters.experience || 0}+ Years
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Location</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                    {locations.map(loc => (
                        <label key={loc} className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.locations?.includes(loc) || false}
                                onChange={() => handleCheckboxChange('locations', loc)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                            />
                            <span className="font-medium">{loc}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setFilters({})}
                className="mt-auto py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
            >
                Reset Filters
            </button>
           
        </div>
    );
};

export default JobFilters;
