"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./../store/store";

const Sidebar = () => {
  const name = useSelector((state: RootState) => state.name.name);

  return (
    <aside className="w-64 bg-slate-800/50 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-slate-700 text-white flex flex-col h-fit max-h-[80vh]">
      <h2 className="text-3xl font-extrabold mb-6">Quick Tips</h2>
      <ul className="list-disc list-inside space-y-3 text-slate-300 flex-1 overflow-auto">
        <li>Enter your name and submit the form.</li>
        <li>Your greeting will update instantly.</li>
        <li>Refresh the page to reset your name.</li>
        <li>Enjoy your personalized experience!</li>
      </ul>
      <footer className="mt-auto text-slate-500 text-sm">
        <p>Made with ❤️{name}</p>
        <p>© 2023 All rights reserved.</p>
      </footer>
    </aside>
  );
};

export default Sidebar;
