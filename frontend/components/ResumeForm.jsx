const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-500 animate-pulse">
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export default function ResumeForm({ data, onChange, onConfirm, onCancel }) {
    return (
        <div className="space-y-6 animate-fadeIn pb-10">

            <div className="bg-blue-50/50 border-l-4 border-blue-500 p-5 rounded-r-xl mb-6 shadow-sm">
                <div className="flex">
                    <div className="shrink-0">
                        <svg className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-blue-800 font-medium leading-relaxed">
                            Review the parsed information below. Fields marked in <span className="text-amber-600 font-bold bg-amber-50 px-1 rounded">amber</span> have low confidence (&lt; 70%).
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(data)
                    .filter(([key]) => key.toLowerCase() !== 'id')
                    .map(([key, item]) => (
                        <div key={key} className="relative group transition-all duration-300 hover:scale-[1.005]">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                                {key.replace(/_/g, " ").replace(/\./g, " > ")}
                            </label>
                            <div className="relative">
                                {item.value && item.value.length > 60 ? (
                                    <textarea
                                        value={item.value}
                                        onChange={(e) => onChange(key, e.target.value)}
                                        rows={4}
                                        className={`block w-full rounded-2xl shadow-sm text-sm p-4 pr-16 border-2 transition-all duration-300 outline-none
                                        ${item.confidence <= 70
                                                ? "border-amber-200 bg-amber-50 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
                                                : "border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                            } text-gray-900 font-medium resize-none leading-relaxed`}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={item.value}
                                        onChange={(e) => onChange(key, e.target.value)}
                                        className={`block w-full rounded-2xl shadow-sm text-sm p-4 pr-16 border-2 transition-all duration-300 outline-none
                                        ${item.confidence <= 70
                                                ? "border-amber-200 bg-amber-50 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
                                                : "border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                                            } text-gray-900 font-medium`}
                                    />
                                )}

                                {/* Confidence Badge */}
                                <div className="absolute top-3 right-3 pointer-events-none">
                                    <div className={`
                                    flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm
                                    ${item.confidence <= 70 ? 'bg-amber-100/80 text-amber-700' : 'bg-green-100/80 text-green-700'}
                                `}>
                                        <span>{(item.confidence).toFixed(0)}%</span>
                                        {item.confidence <= 70 && <AlertIcon />}
                                    </div>
                                </div>
                            </div>
                            {item.confidence <= 70 && (
                                <p className="mt-2 text-xs text-amber-600 font-medium ml-1 flex items-center gap-1 animate-pulse">
                                    <span>•</span> Low confidence score detected
                                </p>
                            )}
                        </div>
                    ))}
            </div>

            <div className="pt-6 flex gap-4 border-t border-gray-100">
                <button
                    onClick={onConfirm}
                    className="flex-1 bg-green-600 text-white py-3.5 px-6 rounded-2xl font-bold shadow-green-500/30 shadow-lg hover:bg-green-700 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Confirm & Save
                </button>
                <button
                    onClick={onCancel}
                    className="px-8 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 hover:text-gray-800 transition-all active:scale-[0.98]"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
