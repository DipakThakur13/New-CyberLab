import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { client } from "../lib/sanity"; // Sanity client
import { LIST_POSTS_QUERY } from "../lib/queries"; // query for articles

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // Auto-close mobile menu after 3 seconds
  useEffect(() => {
    let timer;
    if (menuOpen) {
      timer = setTimeout(() => setMenuOpen(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [menuOpen]);

  // Fetch & filter articles from Sanity when searching
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }
    client.fetch(LIST_POSTS_QUERY(0, 30)).then((data) => {
      const filtered = data.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    });
  }, [search]);

  return (
    <header className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-extrabold text-sky-600 dark:text-sky-400"
            >
              CyberLab
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-gray-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300"
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="text-sm text-gray-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300"
            >
              Articles
            </Link>
            <Link
              to="/categories"
              className="text-sm text-gray-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-sm text-gray-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300"
            >
              About
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                placeholder="Search articles..."
                aria-label="Search"
              />
              {results.length > 0 && (
                <div className="absolute top-10 left-0 bg-white dark:bg-slate-800 shadow-lg rounded-md w-full max-h-60 overflow-y-auto z-50">
                  {results.map((post) => (
                    <Link
                      key={post._id}
                      to={`/post/${post.slug.current}`}
                      className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode */}
            <DarkModeToggle className="mr-2" />

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setMenuOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="block px-3 py-2 text-base text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="block px-3 py-2 text-base text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
              >
                Articles
              </Link>
              <Link
                to="/categories"
                className="block px-3 py-2 text-base text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
              >
                About
              </Link>
            </div>
            {/* Mobile search */}
            <div className="mt-3 px-3 relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                placeholder="Search..."
              />
              {results.length > 0 && (
                <div className="absolute top-12 left-0 bg-white dark:bg-slate-800 shadow-lg rounded-md w-full max-h-60 overflow-y-auto z-50">
                  {results.map((post) => (
                    <Link
                      key={post._id}
                      to={`/post/${post.slug.current}`}
                      className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
