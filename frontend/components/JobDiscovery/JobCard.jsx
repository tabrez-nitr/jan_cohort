
import React, { useState } from 'react';

const JobCard = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    // Color ring for match score
    const getScoreColor = (score) => {
        if (score >= 90) return "text-green-500 border-green-500";
        if (score >= 75) return "text-blue-500 border-blue-500";
        return "text-amber-500 border-amber-500";
    };

    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1 relative">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover bg-gray-50 mb-auto" />
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{job.company}</p>
                    </div>
                </div>

                {/* Match Score Ring */}
                <div className={`
                    w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-bold text-xs
                    ${getScoreColor(job.matchScore)}
                `}>
                    {job.matchScore}%
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-xs font-semibold text-gray-600">
                    {job.type}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-xs font-semibold text-gray-600">
                    {job.location}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-xs font-semibold text-gray-600">
                    {job.salary}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-xs font-semibold text-gray-600">
                    {job.minExperience}y+ Exp
                </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
                {job.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-blue-50 text-[10px] font-medium text-blue-600 border border-blue-100">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 text-sm">
                <span className="text-gray-400 text-xs mr-auto">{job.postedAt}</span>

                <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`
                        p-2 rounded-xl transition-all active:scale-95
                        ${isSaved ? "bg-amber-100 text-amber-600" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); setIsApplied(true); }}
                    disabled={isApplied}
                    className={`
                        px-4 py-2 rounded-xl font-bold transition-all active:scale-95
                        ${isApplied
                            ? "bg-green-100 text-green-700 cursor-default"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"}
                    `}
                >
                    {isApplied ? "Applied" : "Easy Apply"}
                </button>
            </div>
        </div>
    );
};

export default JobCard;
