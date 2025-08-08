"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, fetchGreeting, clearError } from "../store/nameSlice";
import type { RootState, AppDispatch } from "../store/store";

const Greet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInput] = React.useState("");

  const { name, greeting, loading, error } = useSelector((state: RootState) => ({
    name: state.name.name,
    greeting: state.name.greeting,
    loading: state.name.loading,
    error: state.name.error
  }));

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    
    dispatch(setName(inputValue));
    await dispatch(fetchGreeting(inputValue));
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      {/* Header */}
      <header className="text-center mb-10">
        <small>
          {" "}
      
        </small>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          Your Day, Your Greeting {name ? `, ${name}` : ""}
        </h1>
        <p className="text-slate-300 text-lg max-w-xl mx-auto">
          Start the day with a personal touch — enter your name below.
        </p>
      </header>

      {/* Form */}
      <main className="bg-slate-800/50 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md border border-slate-700">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-slate-300 mb-1 transition-all duration-200 transform hover:translate-x-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={inputValue}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your name"
              disabled={loading}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className={`w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              loading 
                ? 'bg-blue-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Get Greeting'}
          </button>
        </form>

        {(greeting || error) && (
          <div 
            className={`mt-6 p-4 rounded-lg border ${
              error 
                ? 'bg-red-900/30 border-red-700/50' 
                : 'bg-slate-700/50 border-slate-600'
            } transition-all duration-300`}
          >
            <p className={`text-${error ? 'red-300' : 'white'} font-medium`}>
              {error || greeting}
            </p>
          </div>
        )}
        
        {name && !error && (
          <div className="mt-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <p className="text-slate-300 text-sm">
              <span className="font-medium text-blue-300">Stored in Redux:</span> {name}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-slate-500 text-sm">
        {new Date().getFullYear()} Personal Greeting App
      </footer>
    </div>
  );
};

export default Greet;
