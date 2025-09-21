import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800 mt-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & About */}
        <div>
          <Link to="/" className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">CyberLab</Link>
          <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">
            Practical cybersecurity tutorials, walkthroughs, and hands-on guides.
          </p>
          <p className="mt-4 text-xs text-gray-500 dark:text-slate-400">© {new Date().getFullYear()} CyberLab</p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
            <li><Link to="/articles" className="hover:text-sky-600 dark:hover:text-sky-300">All articles</Link></li>
            <li><Link to="/categories" className="hover:text-sky-600 dark:hover:text-sky-300">Categories</Link></li>
            <li><Link to="/about" className="hover:text-sky-600 dark:hover:text-sky-300">About</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Stay updated</h4>
          <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">Subscribe for new tutorials and guides.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
            />
            <button type="submit" className="px-3 py-2 bg-sky-600 text-white rounded-lg text-sm">Subscribe</button>
          </form>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Connect</h4>
          <div className="flex items-center gap-4">
            <a href="https://github.com/DipakThakur13" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300">
              {/* GitHub svg */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.93 3.19 9.11 7.62 10.58.56.1.77-.24.77-.53 0-.26-.01-1-.01-1.96-3.1.68-3.76-1.38-3.76-1.38-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.56-.74 1.56-.74.99-1.7 2.6-1.21 3.24-.93.1-.73.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.43-2.22 1.14-3.01-.11-.28-.5-1.4.11-2.92 0 0 .93-.3 3.05 1.14a10.6 10.6 0 012.78-.38c.94 0 1.89.13 2.78.38 2.12-1.44 3.05-1.14 3.05-1.14.61 1.52.22 2.64.11 2.92.71.79 1.14 1.79 1.14 3.01 0 4.29-2.62 5.24-5.11 5.52.4.34.75 1.02.75 2.06 0 1.49-.01 2.69-.01 3.05 0 .29.2.64.78.53 4.42-1.47 7.6-5.65 7.6-10.58C23.25 5.48 18.27.5 12 .5z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/thakurdipak/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.39c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.41-2.08 2.86v5.48H8.99V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.69zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
            </a>
            <a href="https://x.com/DipakThakur_13" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.92c-.62.28-1.28.47-1.98.56a3.45 3.45 0 001.52-1.9 6.96 6.96 0 01-2.2.84 3.48 3.48 0 00-2.55-1.1c-1.93 0-3.5 1.76-3.06 3.64A9.86 9.86 0 013 4.9a3.56 3.56 0 00-.47 1.75 3.5 3.5 0 001.55 2.91c-.53 0-1.03-.16-1.47-.4v.04c0 1.67 1.12 3.07 2.6 3.39-.47.12-.96.17-1.47.06.41 1.25 1.6 2.16 3.01 2.19A7 7 0 012 18.57C3.43 19.6 5.08 20.22 6.84 20.22c8.2 0 12.7-7.23 12.7-13.5 0-.2 0-.39-.02-.58A9.3 9.3 0 0022 5.92z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 border-t dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-slate-400">
          <div>Made with ❤️ by CyberLab</div>
          <div className="mt-2 md:mt-0 space-x-4">
            <Link to="/privacy" className="hover:text-sky-600 dark:hover:text-sky-300">Privacy</Link>
            <Link to="/terms" className="hover:text-sky-600 dark:hover:text-sky-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
