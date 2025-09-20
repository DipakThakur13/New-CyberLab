import React from "react";
import { Link } from "react-router-dom";

/**
 * CategoryChip - clickable chip used in sidebar & card
 * props: { category: {title}, count }
 */
export default function CategoryChip({ category, count }) {
  const slug = (category.title || category).toLowerCase().replace(/\s+/g, "-");
  return (
    <Link to={`/category/${slug}`} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition">
      <span>{category.title || category}</span>
      {typeof count === "number" && <span className="text-xs text-gray-400">· {count}</span>}
    </Link>
  );
}
