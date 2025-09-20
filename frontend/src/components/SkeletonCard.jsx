import React from "react";

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="h-44 md:h-52 bg-slate-200 dark:bg-slate-700" />
      <div className="p-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-1" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16" />
            </div>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
