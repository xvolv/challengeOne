"use client";
import React from "react";
import Greet from "./components/Greet";
import Sidebar from "./components/Sidebar";


const Page = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 gap-8">
      <main className="flex-1 max-w-xl">
        <Greet />
      </main>
      <Sidebar />
    </div>
  );
};

export default Page;
