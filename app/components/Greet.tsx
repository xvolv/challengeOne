"use client";
import React from "react";
import { setName } from "../store/nameSlice";
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

const Greet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInput] = React.useState("");
  const [greeting, setGreeting] = React.useState("");

  const name = useSelector((state: RootState) => state.name.name);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setName(inputValue));

    try {
      const res = await fetch("/api/greet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGreeting("Error: " + data.error);
      } else {
        setGreeting(data.message);
      }
    } catch {
      setGreeting("Network error or server unavailable");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      {/* Header */}
      <header className="text-center mb-10">
        <small>
          {" "}
          {greeting && <p className="mt-4 text-indigo-400">{greeting}</p>}
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
          <input
            type="text"
            placeholder="Enter your name..."
            className="border border-slate-600 bg-slate-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            value={inputValue}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-slate-500 text-sm">
        © {new Date().getFullYear()} Personal Greeting App
      </footer>
    </div>
  );
};

export default Greet;
