"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const tipsFallback = [
  "Click the greeting button to get started!",
  "Try entering different names to see personalized greetings.",
  "The AI panel can help answer your questions.",
  "All your data is processed securely in your browser.",
  "Check back daily for new tips and features!"
];

const Sidebar = () => {
  const name = useSelector((state: RootState) => state.name.name);
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Add a small delay to show loading state (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const res = await fetch("/api/tips");
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data.tips || !Array.isArray(data.tips)) {
          throw new Error("Invalid tips data format");
        }
        
        setTips(data.tips);
      } catch (err) {
        console.error("Failed to fetch tips:", err);
        setError("Couldn't load tips. Using default tips instead.");
        setTips(tipsFallback);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="w-72 p-5 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg h-fit transition-all duration-300 hover:border-slate-600/70">
      <div className="flex items-center space-x-2 mb-5">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-white" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          {name ? `Welcome back, ${name}!` : "Welcome!"}
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Quick Tips
          </h3>
          {isLoading && (
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></div>
          )}
        </div>
        
        {error && (
          <div className="p-3 bg-red-900/30 text-red-200 text-sm rounded-lg border border-red-800/50">
            {error}
          </div>
        )}
        
        <ul className="space-y-3">
          {isLoading ? (
            // Skeleton loaders
            Array(3).fill(0).map((_, i) => (
              <li key={i} className="animate-pulse">
                <div className="h-4 bg-slate-700/70 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-slate-700/50 rounded w-5/6"></div>
              </li>
            ))
          ) : (
            // Actual tips
            tips.map((tip, index) => (
              <li 
                key={index}
                className="group relative p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 transition-all duration-200 cursor-default"
              >
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-6 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <p className="text-sm text-slate-200">{tip}</p>
              </li>
            ))
          )}
        </ul>
        
        <div className="pt-2 text-xs text-slate-500 text-center">
          {tips.length} tip{tips.length !== 1 ? 's' : ''} available
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
