"use client";

import StateMap from "@/components/maps/StateMap";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const stateName = decodeURIComponent(params.stateName as string);

  return (
    <div className="flex w-full h-screen bg-[#050505] text-white">
      {/* Left Panel - 50% width for Map */}
      <div className="w-1/2 h-full border-r border-white/10 p-8 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-transparent pointer-events-none" />
        <StateMap stateName={stateName} />
      </div>

      {/* Right Panel - 50% width for Content */}
      <div className="w-1/2 h-full p-12 overflow-y-auto">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white via-rose-500 to-white py-1">
          {stateName}
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Explore the rich culture, heritage, and geography of {stateName}.
          (Placeholder for detailed state information)
        </p>
      </div>
    </div>
  );
};

export default Page;
