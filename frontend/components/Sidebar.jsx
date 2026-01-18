import { useState } from "react";

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);


const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 2.618L7.38 8.92c-.413.441-.997.521-1.455.564m4.5 2.618L7.38 8.92c-.413.441-.997.521-1.455.564M10.5 2.25h2.996m2.996 0c.937 0 1.765.65 1.968 1.576l.328 1.488a.375.375 0 01-.365.452H4.484a.375.375 0 01-.365-.452l.328-1.488A2.008 2.008 0 016.476 2.25h2.996m6.039 0h-5.992" />
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export default function Sidebar({ isOpen, toggleSidebar, activeTab, setActiveTab }) {
    const menuItems = [
        { id: "home", label: "Dashboard", icon: HomeIcon },
        { id: "upload", label: "Upload Resume", icon: UploadIcon },
        { id: "skills", label: "Skills Gap", icon: ChartBarIcon },
        { id: "jobs", label: "Find Jobs", icon: BriefcaseIcon },
    ];

    return (
        <aside
            className={`
                bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col
                ${isOpen ? "w-72" : "w-24"}
                fixed left-4 top-4 bottom-4 rounded-[2.5rem] z-50 overflow-hidden ring-1 ring-white/20
            `}
        >
            {/* Header / Brand */}
            <div className="flex items-center justify-between p-6 h-24 border-b border-blue-50/30">
                <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "w-auto opacity-100 delay-100" : "w-0 opacity-0"}`}>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">W</div>
                        <h1 className="font-extrabold text-2xl tracking-tight text-gray-900">WeVolve</h1>
                    </div>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all active:scale-95 group"
                    aria-label="Toggle Sidebar"
                >
                    <div className={`transition-transform duration-500 ${!isOpen ? "rotate-180" : ""}`}>
                        <MenuIcon />
                    </div>
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-8 px-4 space-y-3">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`
                            w-full flex items-center p-4 rounded-2xl transition-all duration-300 group relative
                            ${activeTab === item.id
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-white/20 translate-x-1"
                                : "text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                            }
                        `}
                    >
                        <span className={`shrink-0 transition-transform duration-300 ${activeTab === item.id ? "scale-110" : "group-hover:scale-110"}`}>
                            <item.icon />
                        </span>

                        <span
                            className={`
                                ml-4 font-bold whitespace-nowrap transition-all duration-500
                                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute pointer-events-none"}
                            `}
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            {/* User Profile Srub - Floating Card Style */}
            <div className={`p-4 transition-all duration-500 ${isOpen ? "mb-0" : "mb-4"}`}>
                <div className={`
                    relative overflow-hidden rounded-2xl p-3 transition-all duration-300
                    ${isOpen ? "bg-gray-50 border border-gray-100 shadow-lg" : ""}
                 `}>
                    <div className={`flex items-center gap-3 transition-all duration-300 ${isOpen ? "justify-start" : "justify-center"}`}>
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-md shrink-0 ring-4 ring-white/50">
                            WV
                        </div>
                        {isOpen && (
                            <div className="overflow-hidden animate-fadeIn space-y-0.5">
                                <p className="text-sm font-black text-gray-800 truncate">Admin User</p>
                                <p className="text-xs font-medium text-gray-400 truncate">admin@wevolve.ai</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}
