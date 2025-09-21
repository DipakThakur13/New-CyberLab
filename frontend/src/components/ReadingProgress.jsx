// src/components/ReadingProgress.jsx
import React, { useEffect, useState } from "react";

export default function ReadingProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef?.current || document.documentElement;

    function onScroll() {
      const rect = (containerRef?.current)?.getBoundingClientRect?.();
      // if containerRef provided, compute using element height; else use document
      if (containerRef?.current) {
        const el = containerRef.current;
        const height = el.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY - el.offsetTop;
        const pct = Math.max(0, Math.min(100, (scrolled / Math.max(1, height)) * 100));
        setProgress(pct);
      } else {
        const doc = document.documentElement;
        const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
        setProgress(Math.max(0, Math.min(100, pct)));
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef]);

  return (
    <div className="fixed left-0 right-0 top-0 h-1 z-50">
      <div style={{ width: `${progress}%` }} className="h-1 bg-sky-500 transition-all duration-100" />
    </div>
  );
}
