// src/components/CalloutSerializer.jsx
import React from "react";

export default function CalloutSerializer({ value }) {
  const style = value?.style || "note";
  const bg = style === "warning" ? "bg-yellow-50 dark:bg-yellow-900/20" : style === "tip" ? "bg-green-50 dark:bg-green-900/10" : "bg-slate-50 dark:bg-slate-800";
  const border = style === "warning" ? "border-yellow-300 dark:border-yellow-700" : "border-transparent";

  return (
    <div className={`my-6 p-4 rounded-md border ${border} ${bg}`}>
      <div className="text-sm text-gray-800 dark:text-slate-200">
        {value?.text}
      </div>
    </div>
  );
}
