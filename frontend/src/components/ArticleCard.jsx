import React from "react";
import { Link } from "react-router-dom";

/**
 * ArticleCard - supports dark mode
 */
export default function ArticleCard({ post }) {
  const imageUrl =
    post.mainImage?.asset?.url ||
    `https://picsum.photos/seed/${encodeURIComponent(post.id || post.title)}/800/450`;

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition">
      <Link to={`/post/${post.id || post.slug || post.title}`}>
        <div className="h-44 md:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
          <img
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            {post.categories?.slice(0, 2).map((c, i) => (
              <span key={i} className="text-xs bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 px-2 py-1 rounded-full">
                {c.title || c}
              </span>
            ))}
            {!post.categories?.length && <span className="text-xs bg-slate-100 dark:bg-slate-700 dark:text-slate-200 text-slate-600 px-2 py-1 rounded-full">General</span>}
          </div>

          <h3 className="text-lg md:text-xl font-semibold leading-snug text-slate-900 dark:text-slate-100">{post.title}</h3>

          <p className="text-sm text-gray-600 dark:text-slate-300 mt-2 line-clamp-3">{post.summary}</p>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-600 dark:text-slate-200">
                {post.author?.name?.[0] || "A"}
              </div>
              <div>
                <div className="text-xs text-slate-700 dark:text-slate-200">{post.author?.name || "Unknown"}</div>
                <div className="text-xs text-gray-400 dark:text-slate-400">{new Date(post.publishedAt || post.date || Date.now()).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="text-xs text-gray-400 dark:text-slate-400">
              {post.readTime ? `${post.readTime} min` : "—"}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
