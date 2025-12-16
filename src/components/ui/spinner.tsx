import React from "react";

function Spinner({ height }: { height?: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: height || "250px" }}
    >
      <div className="w-10 h-10 border-8 border-primary border-t-transparent animate-spin rounded-full"></div>
    </div>
  );
}

export default Spinner;
