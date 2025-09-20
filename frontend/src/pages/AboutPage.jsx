// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">About CyberLab</h1>
      <p className="text-slate-700 dark:text-slate-300 mb-4">
        CyberLab is a collection of practical cybersecurity tutorials, labs, and deep dives.
        Our goal is to teach secure-by-design thinking and hands-on techniques.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-2">Mission</h2>
      <p className="text-slate-700 dark:text-slate-300">
        To make practical cybersecurity education accessible — with real examples, clear guidance,
        and reproducible walkthroughs. We encourage safe, legal and ethical learning.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-2">Contribute</h2>
      <p className="text-slate-700 dark:text-slate-300">
        Want to contribute? Open an issue or PR on GitHub, or reach out on LinkedIn. We welcome
        community-written tutorials and improvements.
      </p>

      <div className="mt-8 text-sm text-gray-500 dark:text-slate-400">
        <strong>Note:</strong> CyberLab content is educational. Always get permission before testing systems.
      </div>
    </div>
  );
}
