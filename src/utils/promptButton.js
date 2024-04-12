import React from "react";

export function RadioOne() {
  return (
    <div className="w-[1.25vw] h-[1.25vw] relative">
      <div className="w-[1.25vw] h-[1.25vw] left-0 top-0 absolute rounded-full border border-cyan-600" />
      <div className="w-[1.25vw] h-[1.25vw] left-0 top-0 absolute bg-cyan-600 rounded-full" />
    </div>
  );
}
export function RadioTwo() {
  return (
    <div>
      <div className="w-[1.25vw] h-[1.25vw] rounded-full border border-cyan-600" />
    </div>
  );
}
