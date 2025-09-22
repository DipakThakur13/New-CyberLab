// src/pages/PostPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // or prism-okaidia.css for dark mode
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

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
      const id = String(text).toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
      return (
        <h2
          id={id}
          className="scroll-mt-28 text-2xl font-bold mt-10 mb-4"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = Array.isArray(children) ? children.join("") : children;
      const id = String(text).toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
      return (
        <h3
          id={id}
          className="scroll-mt-28 text-xl font-semibold mt-8 mb-3"
        >
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
    return `https://picsum.photos/seed/${encodeURIComponent(
      p.slug?.current || p._id
    )}/1600/700`;
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
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : ""}
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
              fontSize: "1.05rem",
              lineHeight: "1.7",
              color: "#1a1a1a",
              maxWidth: "850px",
              margin: "auto",
              padding: "1rem",
            }}
          >
            <PortableText value={post.body} components={portableComponents} />

            {/* Inline CSS for typography + code blocks */}
            <style>
              {`
                .prose h1, .prose h2, .prose h3 {
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .prose p {
                  margin-bottom: 1rem;
                }
                .prose pre {
                  background: #1e293b;
                  color: #e2e8f0;
                  padding: 1rem;
                  border-radius: 0.5rem;
                  overflow-x: auto;
                  font-family: "Fira Code", "Consolas", monospace;
                  font-size: 0.9rem;
                  line-height: 1.6;
                }
                .prose pre[class*="language-"] {
                  position: relative;
                }
                .prose code {
                  font-family: "Fira Code", "Consolas", monospace;
                  background: #f5f5f5;
                  color: #111827;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.25rem;
                }
                .dark .prose code {
                  background: #334155;
                  color: #f1f5f9;
                }
                /* Line numbers */
                pre.line-numbers {
                  padding-left: 2.8em;
                }
              `}
            </style>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 p-4 rounded-md shadow-sm">
                <div className="text-sm font-semibold mb-3">On this page</div>
                <nav className="text-sm space-y-2">
                  {toc.length === 0 && (
                    <div className="text-xs text-slate-500">No headings</div>
                  )}
                  {toc.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`block hover:text-sky-600 ${
                        h.level === "h2"
                          ? "font-medium"
                          : "pl-4 text-slate-500"
                      }`}
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
