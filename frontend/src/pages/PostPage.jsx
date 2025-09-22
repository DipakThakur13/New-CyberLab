// src/pages/PostPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // base Prism theme (we override bg/colors via CSS variables)

import { client, isMock } from "../lib/sanity";
import { SINGLE_POST_QUERY } from "../lib/queries";

import CodeBlockSerializer from "../components/CodeBlockSerializer";
import ImageSerializer from "../components/ImageSerializer";
import TableSerializer from "../components/TableSerializer";
import CalloutSerializer from "../components/CalloutSerializer";
import EmbedSerializer from "../components/EmbedSerializer";
import ReadingProgress from "../components/ReadingProgress";
import { urlFor } from "../lib/imageBuilder";

/* Portable Text components mapping */
const portableComponents = {
  types: {
    image: ImageSerializer,
    codeBlock: CodeBlockSerializer,
    table: TableSerializer,
    callout: CalloutSerializer,
    embed: EmbedSerializer,
  },
  block: {
    h2: ({ children }) => {
      const text = Array.isArray(children) ? children.join("") : children;
      const id = String(text)
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return (
        <h2 id={id} className="scroll-mt-28 text-2xl font-bold mt-10 mb-4">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = Array.isArray(children) ? children.join("") : children;
      const id = String(text)
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return (
        <h3 id={id} className="scroll-mt-28 text-xl font-semibold mt-8 mb-3">
          {children}
        </h3>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-sky-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);
  const articleRef = useRef(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    if (isMock) {
      setPost(null);
      setLoading(false);
      return;
    }

    let mounted = true;
    client
      .fetch(SINGLE_POST_QUERY, { slug })
      .then((res) => {
        if (!mounted) return;
        setPost(res || null);

        // Build TOC
        const headings = [];
        (res?.body || []).forEach((blk) => {
          if (blk._type === "block" && (blk.style === "h2" || blk.style === "h3")) {
            const text = (blk.children || []).map((c) => c.text || "").join("");
            const id = text.toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
            headings.push({ level: blk.style, text, id });
          }
        });
        setToc(headings);
      })
      .catch((err) => {
        console.error("Post fetch error:", err);
        setPost(null);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [slug]);

  // Prism highlight after post loads
  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  // Add copy buttons to each pre (and ensure good mobile behavior)
  useEffect(() => {
    if (!articleRef.current) return;
    const root = articleRef.current;

    // small helper to create the button
    const createCopyButton = (pre) => {
      if (pre.dataset.copyAttached === "true") return;
      pre.dataset.copyAttached = "true";
      pre.style.position = pre.style.position || "relative"; // allow absolute children

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy-btn";
      btn.innerText = "Copy";
      btn.setAttribute("aria-label", "Copy code");
      btn.onclick = async (e) => {
        e.stopPropagation();
        const codeEl = pre.querySelector("code");
        const text = codeEl ? codeEl.innerText : pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          btn.innerText = "Copied";
          setTimeout(() => (btn.innerText = "Copy"), 1800);
        } catch (err) {
          console.error("Copy failed:", err);
          btn.innerText = "Copy";
        }
      };
      pre.appendChild(btn);
    };

    const pres = Array.from(root.querySelectorAll("pre"));
    pres.forEach((pre) => {
      // ensure pre width never pushes layout; add styling attributes via inline style when necessary
      pre.style.boxSizing = "border-box";
      pre.style.maxWidth = "100%";
      pre.style.overflowX = "auto";
      pre.style.webkitOverflowScrolling = "touch";
      createCopyButton(pre);
    });

    // cleanup not required (buttons removed when component unmounts)
    return () => {};
  }, [post]);

  const getHeroImage = (p) => {
    if (!p) return null;
    if (p.mainImage && (p.mainImage.asset || p.mainImage._ref)) {
      try {
        const b = urlFor(p.mainImage);
        if (b && typeof b.width === "function") {
          return b.width(1600).auto("format").fit("max").url();
        }
        if (typeof b === "string") return b;
      } catch (e) {}
    }
    if (p.externalImageUrl) return p.externalImageUrl;
    return `https://picsum.photos/seed/${encodeURIComponent(p.slug?.current || p._id)}/1600/700`;
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Loading article…</div>;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-md p-6 bg-red-50 dark:bg-red-900/20 text-red-700">
          Article not found.
        </div>
      </div>
    );
  }

  const hero = getHeroImage(post);

  return (
    <div className="bg-transparent">
      <ReadingProgress containerRef={articleRef} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 dark:text-slate-100">
            {post.title}
          </h1>
          <div className="text-sm text-slate-400 mb-4">
            By {post.author?.name || "Unknown"} •{" "}
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
          </div>

          {hero && (
            <div className="w-full rounded-lg overflow-hidden mb-6">
              <img
                src={hero}
                alt={post.mainImage?.alt || post.title}
                className="w-full h-72 md:h-96 object-cover rounded"
              />
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article content */}
          <article
            ref={articleRef}
            className="lg:col-span-3 prose prose-lg prose-slate dark:prose-invert max-w-none"
            style={{
              fontSize: "1.02rem",
              lineHeight: "1.7",
              color: "inherit",
              padding: "0.25rem 0.5rem",
            }}
          >
            {/* PortableText renders the article body */}
            <PortableText value={post.body} components={portableComponents} />

            {/* Inline CSS that controls code block look + light/dark variables + responsive tweaks */}
            <style>{`
              /* Theme variables - adapt when .dark class is present on root (Tailwind style) */
              :root {
                --code-bg: #0f172a;          /* dark navy for code blocks in light mode (keeps contrast) */
                --code-color: #e6eef8;       /* light text for code */
                --inline-code-bg: #eef2ff;   /* subtle inline code bg in light mode */
                --inline-code-color: #07122a;
                --pre-border: rgba(0,0,0,0.08);
                --copy-btn-bg: rgba(255,255,255,0.06);
                --copy-btn-color: #e6eef8;
              }
              .dark :root, .dark {
                /* when Tailwind toggles dark on an ancestor (html or body) this will apply */
                --code-bg: #0b1220;
                --code-color: #dbeafe;
                --inline-code-bg: #0f172a;
                --inline-code-color: #dbeafe;
                --pre-border: rgba(255,255,255,0.06);
                --copy-btn-bg: rgba(255,255,255,0.06);
                --copy-btn-color: #e6eef8;
              }

              /* Article spacing adjustments */
              .prose {
                box-sizing: border-box;
              }
              .prose p {
                margin-bottom: 1rem;
              }
              .prose h1, .prose h2, .prose h3 {
                font-weight: 700;
                margin-top: 1.6rem;
                margin-bottom: 0.6rem;
              }

              /* ---------- Code block (pre) styling ---------- */
              .prose pre {
                background: var(--code-bg);
                color: var(--code-color);
                padding: 12px 12px 12px 12px;
                border-radius: 8px;
                overflow-x: auto;
                box-shadow: none;
                border: 1px solid var(--pre-border);
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Fira Code", "Consolas", "Liberation Mono", monospace;
                font-size: 0.92rem;
                line-height: 1.5;
                white-space: pre;           /* prevent wrapping; allow horizontal scroll */
                word-break: normal;
                margin: 1rem 0;
                position: relative;        /* for copy button */
                -webkit-overflow-scrolling: touch; /* smooth scroll on mobile */
              }

              /* Ensure code tag inside pre uses the same look */
              .prose pre code {
                background: transparent;
                color: inherit; /* keep Prism token colors readable; fallback to code-color */
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
              }

              /* Make sure long lines don't expand container width */
              .prose pre::-webkit-scrollbar { height: 8px; }
              .prose pre::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 6px; }

              /* Inline code inside paragraphs */
              .prose code {
                background: var(--inline-code-bg);
                color: var(--inline-code-color);
                padding: 0.15rem 0.35rem;
                border-radius: 6px;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Fira Code", "Consolas", monospace;
                font-size: 0.92em;
              }

              /* Copy button - small, unobtrusive, positioned top-right inside pre */
              .code-copy-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                z-index: 6;
                background: rgba(255,255,255,0.06);
                color: var(--copy-btn-color);
                border: none;
                padding: 6px 9px;
                border-radius: 6px;
                font-size: 0.78rem;
                cursor: pointer;
                transition: background 120ms ease, transform 120ms ease;
                backdrop-filter: blur(4px);
              }
              .code-copy-btn:hover {
                transform: translateY(-1px);
                background: rgba(255,255,255,0.09);
              }

              /* Responsive: smaller padding & font on very small screens */
              @media (max-width: 640px) {
                .prose pre {
                  font-size: 0.86rem;
                  padding: 10px;
                  border-radius: 6px;
                }
                .code-copy-btn {
                  top: 6px;
                  right: 6px;
                  padding: 5px 7px;
                  font-size: 0.72rem;
                }
                .prose {
                  padding-left: 0.25rem;
                  padding-right: 0.25rem;
                }
              }

              /* If you want to hide scrollbar on small screens but still allow scroll */
              @media (max-width: 420px) {
                .prose pre { -ms-overflow-style: none; scrollbar-width: none; }
                .prose pre::-webkit-scrollbar { display: none; }
              }

              /* Keep Prism token colors readable by using inherited color as baseline.
                 This avoids the theme making tokens unreadable in dark/light modes.
                 If you prefer full syntax colors, remove the next rule. */
              .prose pre code .token { color: inherit !important; }

            `}</style>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 p-4 rounded-md shadow-sm">
                <div className="text-sm font-semibold mb-3">On this page</div>
                <nav className="text-sm space-y-2">
                  {toc.length === 0 && <div className="text-xs text-slate-500">No headings</div>}
                  {toc.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`block hover:text-sky-600 ${h.level === "h2" ? "font-medium" : "pl-4 text-slate-500"}`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
