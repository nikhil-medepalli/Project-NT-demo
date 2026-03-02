"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { indiaMapData } from "./indiaMapData";
import { useRouter } from "next/navigation";

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStateId, setActiveStateId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPos({ x: event.clientX, y: event.clientY });
  };

  const filteredStates = useMemo(() => {
    if (!searchQuery) return [];
    return indiaMapData.filter((state) =>
      state.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const navigateToState = (stateName: string) => {
    router.push(`/explore/${encodeURIComponent(stateName)}`);
  };

  const handleSearchSelect = (stateId: string, stateName: string) => {
    setActiveStateId(stateId);
    setSearchQuery(stateName);
    setIsSearchFocused(false);
    navigateToState(stateName);
  };

  const handleStateClick = (stateName: string) => {
    navigateToState(stateName);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearchFocused(true);

    const exactMatch = indiaMapData.find(
      (s) => s.name.toLowerCase() === query.toLowerCase(),
    );
    if (exactMatch) {
      setActiveStateId(exactMatch.id);
    } else {
      setActiveStateId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const exactMatch = indiaMapData.find(
        (s) => s.name.toLowerCase() === searchQuery.toLowerCase(),
      );
      if (exactMatch) {
        navigateToState(exactMatch.name);
      } else if (filteredStates.length > 0) {
        // If there's only one match or top match, navigate to it?
        // Or just navigate to the top one.
        navigateToState(filteredStates[0].name);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center">
      {/* Search Bar - Absolute Top Right */}
      <div
        ref={searchContainerRef}
        className="absolute top-8 right-8 z-50 w-80"
      >
        <div className="relative group">
          <input
            type="text"
            placeholder="Search state..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 pl-10 bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-xl shadow-lg 
                     focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 
                     transition-all duration-300 text-white placeholder-neutral-500 font-medium"
          />
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-neutral-500 group-focus-within:text-rose-500 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Type-ahead Dropdown */}
          {isSearchFocused && filteredStates.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-neutral-900/90 backdrop-blur-md rounded-xl shadow-2xl 
                          border border-white/10 max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar"
            >
              {filteredStates.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleSearchSelect(state.id, state.name)}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors duration-200
                           flex items-center space-x-2 group text-gray-300 hover:text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50 group-hover:bg-rose-500 transition-colors duration-300"></span>
                  <span className="text-sm font-medium">{state.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Container - Full Screen */}
      <div className="w-full h-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1100"
          className="w-full h-full max-h-screen"
          onMouseMove={handleMouseMove}
        >
          <g id="features">
            {indiaMapData.map((state) => (
              <path
                key={state.id}
                d={state.d}
                id={state.id}
                name={state.name}
                className={`fill-white/20 stroke-white/40 hover:fill-rose-500/50 hover:stroke-rose-400 transition-colors duration-200 cursor-pointer ${state.id === activeStateId ? "fill-rose-500/70 stroke-rose-400" : ""}`}
                onMouseEnter={() => setHoveredState(state.name)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => handleStateClick(state.name)}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Floating Tooltip */}
      {hoveredState && (
        <div
          className="fixed z-50 pointer-events-none px-4 py-2 bg-white/90 text-black text-sm font-bold rounded-lg 
                   shadow-xl backdrop-blur-sm transform -translate-x-1/2 -translate-y-full mt-[-10px]
                   animate-in fade-in zoom-in-95 duration-200 tracking-wide"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          {hoveredState}
        </div>
      )}

      {/* Footer Info */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase opacity-60">
          Interactive Map of India
        </p>
      </div>
    </div>
  );
}
