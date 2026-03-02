"use client";

import { useMemo } from "react";
import { indiaMapData } from "./indiaMapData";
import { getPathBoundingBox } from "../../utils/svgUtils";

interface StateMapProps {
  stateName: string;
  className?: string;
}

export default function StateMap({ stateName, className = "" }: StateMapProps) {
  const stateData = useMemo(() => {
    return indiaMapData.find(
      (s) => s.name.toLowerCase() === stateName.toLowerCase(),
    );
  }, [stateName]);

  const viewBox = useMemo(() => {
    if (!stateData) return "0 0 1000 1100";
    const bbox = getPathBoundingBox(stateData.d);
    return `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
  }, [stateData]);

  if (!stateData) {
    return (
      <div
        className={`flex items-center justify-center text-white/50 ${className}`}
      >
        State not found
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={stateData.d}
          id={stateData.id}
          className="fill-white/90 stroke-neutral-800"
          style={{
            strokeWidth: 0.5,
            vectorEffect: "non-scaling-stroke",
          }}
        />
      </svg>
    </div>
  );
}
