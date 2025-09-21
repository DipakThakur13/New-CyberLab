// src/pages/PostPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { client, isMock } from "../lib/sanity";
import { SINGLE_POST_QUERY } from "../lib/queries";
import CodeBlockSerializer from "../components/CodeBlockSerializer";
import ImageSerializer from "../components/ImageSerializer";
import ReadingProgress from "../components/ReadingProgress";
import { urlFor } from "../lib/imageBuilder";

/**
 * PostPage - polished article page
 * - uses PortableText serializers (code blocks, images)
 * - reading progress bar
 * - table-of-contents (generated from h2/h3)
 */
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
      // fallback for local dev; your MOCK_FULL_POST should be imported if desired
      setPost(null);
      setLoading(false);
      return;
    }

    let mounted = true;
    client.fetch(SINGLE_POST_QUERY, { slug })
      .then((res) => {
        if (!mounted) return;
        setPost(res);
        // build TOC from blocks (h2/h3)
        const blocks = res?.body || [];
        const headings = [];
        blocks.forEach((blk) => {
          if (blk._type === "block" && blk.style && (blk.style === "h2" || blk.style === "h3")) {
            // combine text spans
            const text = (blk.children || []).map(c => c.text || "").join("");
            // make id-friendly anchor
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

    return () => { mounted = false; };
  }, [slug]);

  // pick hero image (uploaded asset preferred -> externalImageUrl -> placeholder)
  const getHeroImage = (p) => {
    if (!p) return null;
    if (p.mainImage && (p.mainImage.asset || p.mainImage._ref)) {
      try {
        const b = urlFor(p.mainImage);
        if (b && typeof b.width === "function") return b.width(1600).auto("format").fit("max").url();
        if (typeof b === "string") return b;
      } catch (e) {
        /* ignore */
      }
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
        <div className="rounded-md p-6 bg-red-50 text-red-700">Article not found.</div>
      </div>
    );
  }

  const hero = getHeroImage(post);

  return (
    <div className="bg-transparent">
      <ReadingProgress containerRef={articleRef} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 max-w-5xl">
        {/* Title / meta */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3 dark:text-slate-100">{post.title}</h1>
          <div className="text-sm text-slate-400 mb-4">
            By {post.author?.name || "Unknown"} • {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
          </div>
          {hero && (
            <div className="w-full rounded-lg overflow-hidden mb-6">
              <img src={hero} alt={post.mainImage?.alt || post.title} className="w-full h-72 md:h-96 object-cover rounded" />
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article column */}
          <article ref={articleRef} className="lg:col-span-3 prose prose-slate dark:prose-invert max-w-none">
            <PortableText
              value={post.body}
              components={{
                block: {
                  // For headings: add id so TOC links work
                  h2: ({ children }) => {
                    const text = Array.isArray(children) ? children.map(c => (typeof c === "string" ? c : "")).join("") : children;
                    const id = String(text).toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
                    return <h2 id={id} className="scroll-mt-20">{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const text = Array.isArray(children) ? children.map(c => (typeof c === "string" ? c : "")).join("") : children;
                    const id = String(text).toLowerCase().replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");
                    return <h3 id={id} className="scroll-mt-20">{children}</h3>;
                  }
                },
                types: {
                  codeBlock: ({ value }) => <CodeBlockSerializer value={value} />,
                  image: ({ value }) => <ImageSerializer value={value} />
                },
                marks: {
                  // Render external links opening in new tab
                  link: ({ children, value }) => {
                    const href = value?.href || "";
                    const isExternal = href?.startsWith("http");
                    return (
                      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                        {children}
                      </a>
                    );
                  }
                }
              }}
            />
          </article>

          {/* Right column: TOC (sticky) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 p-4 rounded-md shadow-sm">
                <div className="text-sm font-semibold mb-3">On this page</div>
                <nav className="text-sm space-y-2">
                  {toc.length === 0 && <div className="text-xs text-slate-500">No headings</div>}
                  {toc.map((h, i) => (
                    <a key={i} href={`#${h.id}`} className={`block ${h.level === "h2" ? "font-medium" : "pl-4 text-slate-500"}`}>
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
