import React, { useEffect, useState } from "react";

export default function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!targetRef?.current) {
        setProgress(0);
        return;
      }
      const el = targetRef.current;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const total = el.scrollHeight;
      const scrolled = Math.min(Math.max(0, -rect.top), total - windowHeight);
      const pct = total <= windowHeight ? 100 : (scrolled / (total - windowHeight)) * 100;
      setProgress(Math.max(0, Math.min(100, Math.round(pct))));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div style={{ width: `${progress}%` }} className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" />
    </div>
  );
}
