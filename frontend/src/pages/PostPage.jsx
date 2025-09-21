// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import CodeBlockSerializer from "../components/CodeBlockSerializer";
import ImageSerializer from "../components/ImageSerializer";
import { client, isMock } from "../lib/sanity";
import { SINGLE_POST_QUERY } from "../lib/queries";

// Debug-friendly single post page
export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("[PostPage] slug from route:", slug);
    let mounted = true;
    setError(null);
    setLoading(true);

    if (!slug) {
      setError("No slug provided in URL. Check your route and link.");
      setLoading(false);
      return;
    }

    if (isMock) {
      // if running without SANITY configured, keep app usable
      console.warn("[PostPage] isMock is true — using local fallback (no Sanity client).");
      setPost({
        title: "Local mock post",
        author: { name: "Local" },
        publishedAt: new Date().toISOString(),
        body: [{ _type: "block", children: [{ _type: "span", text: "This is a mock post body." }] }]
      });
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await client.fetch(SINGLE_POST_QUERY, { slug });
        console.log("[PostPage] client.fetch result:", res);
        if (!mounted) return;
        if (!res) {
          setError("No post found. Possible causes: wrong slug, unpublished doc, or wrong dataset.");
          setPost(null);
        } else {
          setPost(res);
        }
      } catch (err) {
        console.error("[PostPage] fetch error:", err);
        // decode common cases
        const msg = err.message || String(err);
        if (/CORS|cors/i.test(msg)) {
          setError("CORS error — add your origin to Sanity CORS settings (Project → API → CORS origins).");
        } else if (/404|not found/i.test(msg)) {
          setError("Sanity API 404 — check projectId/dataset and that Studio publishes to this dataset.");
        } else {
          setError("Fetch error: " + msg);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <div className="container mx-auto p-8">Loading…</div>;
  if (error) return (
    <div className="container mx-auto p-8">
      <div className="p-4 rounded bg-red-50 text-red-700">
        <strong>Error:</strong> {error}
      </div>
      <div className="mt-3 text-sm text-gray-600">
        Troubleshooting tips:
        <ul className="list-disc ml-6">
          <li>Confirm the slug exists in Studio and the post is <strong>published</strong>.</li>
          <li>Use Vision in Studio to run the single-post GROQ (use the same slug).</li>
          <li>Check Sanity CORS origins include this frontend URL.</li>
          <li>Verify env vars: VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET and restart dev server.</li>
        </ul>
      </div>
    </div>
  );

  // Render post
  return (
    <article className="container mx-auto px-4 md:px-6 lg:px-8 py-10 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900 dark:text-slate-100">{post.title}</h1>
      <div className="text-sm text-gray-600 dark:text-slate-400 mb-6">
        {post.author?.name} • {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
      </div>
      {post.mainImage && post.mainImage.asset && (
        <img src={post.mainImage.asset.url || post.mainImage.asset._ref} alt={post.mainImage.alt || post.title} className="rounded-lg w-full object-cover mb-6" />
      )}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <PortableText
          value={post.body}
          components={{
            types: {
              codeBlock: ({ value }) => <CodeBlockSerializer value={value} />,
              image: ({ value }) => <ImageSerializer value={value} />,
            }
          }}
        />
      </div>
    </article>
  );
}
