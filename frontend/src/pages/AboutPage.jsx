// src/pages/AboutPage.jsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 max-w-3xl">
      {/* Page Header */}
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
        About CyberLab
      </h1>

      {/* Intro */}
      <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
        CyberLab is a knowledge-driven platform dedicated to practical
        cybersecurity tutorials, labs, and deep-dive articles. Our mission is to
        empower learners, professionals, and enthusiasts with the tools,
        guidance, and mindset needed to navigate the evolving world of
        cybersecurity.
      </p>

      {/* History */}
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-10 mb-3">
        History & Background
      </h2>
      <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
        CyberLab was founded under the{" "}
        <span className="font-semibold">Boswas Group</span>, a parent company
        known for its dedication to technology, innovation, and education.
        Boswas Group’s vision is to create platforms that simplify complex
        fields and make knowledge more accessible worldwide. CyberLab continues
        this vision by focusing on cybersecurity education that is practical,
        ethical, and widely accessible.
      </p>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        Since its inception, CyberLab has aimed to be more than just an article
        repository. It is a growing community where professionals and students
        can share insights, contribute tutorials, and learn from each other —
        much like a collaborative lab for cybersecurity knowledge.
      </p>

      {/* Mission */}
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-10 mb-3">
        Our Mission
      </h2>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        Our mission is simple: to make practical cybersecurity education
        accessible to everyone. We believe in clear explanations, hands-on
        walkthroughs, and reproducible results. Whether you are learning the
        basics of ethical hacking, exploring advanced penetration testing, or
        building secure systems, CyberLab strives to be your trusted resource.
      </p>

      {/* Contribute */}
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-10 mb-3">
        Contribute to CyberLab
      </h2>
      <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
        CyberLab thrives on community contributions. If you have a tutorial,
        research article, or walkthrough to share, we would love to hear from
        you. Contributors are acknowledged on the platform, and your work helps
        expand the collective knowledge of the cybersecurity community.
      </p>
      <p className="text-slate-700 dark:text-slate-300 mb-6">
        📩 Send your articles to{" "}
        <a
          href="cyberlab.boswas@gmail.com"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          cyberlab.boswas@gmail.com
        </a>{" "}
        or connect with us on{" "}
        <a
          href="https://www.linkedin.com/company/boswas-group"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          LinkedIn
        </a>
        . Together, we can make cybersecurity learning open and impactful.
      </p>

      {/* Note / Disclaimer */}
      <div className="mt-10 p-4 border border-yellow-300 dark:border-yellow-600 rounded-md bg-yellow-50 dark:bg-yellow-900/30 text-sm text-yellow-800 dark:text-yellow-300">
        <strong>Important:</strong> All content on CyberLab is for educational
        purposes only. Always obtain explicit permission before performing any
        security testing on real-world systems. Experiments, exploits, or
        hacking demonstrations should only be conducted in an{" "}
        <span className="font-semibold">isolated lab environment</span>. Stay
        ethical, stay safe.
      </div>
    </div>
  );
}
