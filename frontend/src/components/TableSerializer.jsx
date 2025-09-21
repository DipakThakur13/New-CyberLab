// src/components/TableSerializer.jsx
import React from "react";

export default function TableSerializer({ value }) {
  // value.rows is an array, each row has .cells (array of strings)
  if (!value || !Array.isArray(value.rows)) return null;
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <tbody>
          {value.rows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx === 0 ? "bg-slate-100 dark:bg-slate-800 font-medium" : ""}>
              {(row.cells || []).map((cell, cIdx) => (
                <td key={cIdx} className="border px-3 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
