import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { client, isMock } from "../lib/sanity";
import { SINGLE_POST_QUERY } from "../lib/queries";
import { MOCK_FULL_POST } from "../mockData";
import CodeBlockSerializer from "../components/CodeBlockSerializer";
import ImageSerializer from "../components/ImageSerializer";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch post data
  useEffect(() => {
  if (isMock) { setPost(LOCAL_MOCK_POST); setLoading(false); return; }
  setLoading(true);

  client.fetch(SINGLE_POST_QUERY, { slug })
    .then((data) => setPost(data))
    .catch(console.error)
    .finally(() => setLoading(false));
}, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-10 text-gray-500 dark:text-slate-400">Loading…</div>;
  }
  if (!post) {
    return <div className="container mx-auto px-4 py-10 text-gray-700 dark:text-slate-300">Post not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 md:px-6 lg:px-8 py-10 max-w-3xl">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900 dark:text-slate-100">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 mb-6">
        {post.author?.picture && (
          <img
            src={post.author.picture}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-medium text-slate-800 dark:text-slate-200">{post.author?.name}</div>
          <div>{new Date(post.publishedAt || Date.now()).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <div className="mb-6">
          <img
            src={post.mainImage.asset?.url}
            alt={post.mainImage.alt}
            className="rounded-lg w-full object-cover"
          />
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <PortableText
          value={post.body}
          components={{
            types: {
              codeBlock: ({ value }) => (
                <CodeBlockSerializer value={value} theme="atomDark" />
              ),
              image: ({ value }) => <ImageSerializer value={value} />
            }
          }}
        />
      </div>
    </article>
  );
}
