// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import CategoryChip from "../components/CategoryChip";
import SkeletonCard from "../components/SkeletonCard";
import DiwaliPopup from "../components/DiwaliPopup";
import { client, isMock } from "../lib/sanity";
import { LIST_POSTS_QUERY } from "../lib/queries";

/* Mock data — used when VITE_SANITY_PROJECT_ID is not configured or for local dev */
const MOCK_POSTS = [
  {
    _id: "network-scanning",
    title: "Network Scanning with Nmap",
    summary:
      "Scan networks, find hosts and services with practical examples and tips for safe scanning.",
    author: { name: "Dipak Kumar" },
    publishedAt: "2025-09-20",
    categories: [{ title: "Network Security" }],
    readTime: 6,
    mainImage: null,
    slug: "network-scanning",
  },
  {
    _id: "tls-basics",
    title: "Understanding TLS",
    summary:
      "How TLS secures your web traffic and the handshake explained step-by-step.",
    author: { name: "Dipak Kumar" },
    publishedAt: "2025-09-15",
    categories: [{ title: "Cryptography" }],
    readTime: 8,
    mainImage: null,
    slug: "tls-basics",
  },
  {
    _id: "intro-crypto",
    title: "Intro to Cryptography",
    summary:
      "A compact guide to symmetric and asymmetric encryption primitives you need to know.",
    author: { name: "Dipak Kumar" },
    publishedAt: "2025-08-30",
    categories: [{ title: "Cryptography" }],
    readTime: 10,
    mainImage: null,
    slug: "intro-crypto",
  },
  {
    _id: "penetration-101",
    title: "Penetration Testing Primer",
    summary:
      "A practical checklist to get started with penetration testing and responsible disclosure.",
    author: { name: "Dipak Kumar" },
    publishedAt: "2025-07-10",
    categories: [{ title: "Penetration Testing" }],
    readTime: 12,
    mainImage: null,
    slug: "penetration-101",
  },
];

const CATEGORIES = [
  { title: "Penetration Testing", count: 12 },
  { title: "Network Security", count: 9 },
  { title: "Cryptography", count: 7 },
  { title: "Malware Analysis", count: 3 },
];

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDiwaliPopup, setShowDiwaliPopup] = useState(false);

  // Show Diwali popup on mount (and auto-hide after 10 sec)
  useEffect(() => {
    setShowDiwaliPopup(true);
    const timer = setTimeout(() => setShowDiwaliPopup(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch posts from Sanity (or fall back to mock)
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    if (isMock) {
      const t = setTimeout(() => {
        if (!mounted) return;
        setPosts(MOCK_POSTS);
        setLoading(false);
      }, 350);
      return () => {
        mounted = false;
        clearTimeout(t);
      };
    }

    const q = LIST_POSTS_QUERY(0, 8);
    client
      .fetch(q)
      .then((data) => {
        if (!mounted) return;
        setPosts(data || []);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        if (mounted) setPosts(MOCK_POSTS);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative container mx-auto px-4 md:px-6 lg:px-8 py-10">
      {/* Diwali Greeting Popup */}
      {showDiwaliPopup && (
        <DiwaliPopup onClose={() => setShowDiwaliPopup(false)} />
      )}

      {/* Hero */}
      <section className="rounded-lg p-6 md:p-10 mb-8 shadow-sm bg-gradient-to-r from-sky-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
            CyberLab — Practical cybersecurity tutorials
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Hands-on guides, real-world examples and step-by-step walkthroughs
            for security practitioners and students.
          </p>
        </div>
      </section>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <main className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Latest Articles
            </h2>
            <a
              href="#all"
              className="text-sm text-sky-600 dark:text-sky-300 hover:underline"
            >
              See all
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : posts.map((p) => (
                  <ArticleCard key={p._id || p.slug || p.id} post={p} />
                ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-transparent dark:border-slate-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Search
            </h4>
            <input
              placeholder="Search tutorials..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-transparent dark:border-slate-700">
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">
              Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <CategoryChip key={c.title} category={c} count={c.count} />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-transparent dark:border-slate-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Popular
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sky-600 dark:text-sky-300 hover:underline"
                >
                  Top 10 Nmap Commands
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sky-600 dark:text-sky-300 hover:underline"
                >
                  TLS: What you need to know
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sky-600 dark:text-sky-300 hover:underline"
                >
                  Pen-testing checklist
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
