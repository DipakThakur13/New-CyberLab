// src/pages/ArticlesPage.jsx
import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SkeletonCard from "../components/SkeletonCard";
import { client, isMock } from "../lib/sanity";
import { LIST_POSTS_QUERY } from "../lib/queries";
import { MOCK_POSTS } from "../mockData"; // optional local mock file

const PAGE_SIZE = 8;

export default function ArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setError(null);
    setLoading(true);

    // Mock flow: if no Sanity configured or you intentionally want local mocks
    if (isMock) {
      console.info("[ArticlesPage] isMock=true — using local MOCK_POSTS");
      const simulated = (MOCK_POSTS || []).slice(start, start + PAGE_SIZE);
      // Simulate network latency
      const t = setTimeout(() => {
        if (!mounted) return;
        setPosts((prev) => (start === 0 ? simulated : [...prev, ...simulated]));
        setHasMore(start + PAGE_SIZE < (MOCK_POSTS || []).length);
        setLoading(false);
      }, 300);
      return () => {
        mounted = false;
        clearTimeout(t);
      };
    }

    // Real Sanity fetch
    (async () => {
      try {
        const q = LIST_POSTS_QUERY(start, PAGE_SIZE);
        const data = await client.fetch(q);
        console.log("[ArticlesPage] fetched", (data || []).length, "posts for start", start);

        if (!mounted) return;

        // When loading first page => replace; subsequent pages => append
        setPosts((prev) => (start === 0 ? (data || []) : [...prev, ...(data || [])]));
        setHasMore((data || []).length === PAGE_SIZE);
      } catch (err) {
        console.error("[ArticlesPage] Sanity fetch error:", err);
        if (!mounted) return;
        setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [start]);

  const loadMore = () => {
    // guard to avoid requesting when already loading or no more
    if (loading || !hasMore) return;
    setStart((s) => s + PAGE_SIZE);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">All Articles</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">Showing {posts.length} articles</p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded bg-red-50 text-red-700">
          There was an error loading articles: {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <ArticleCard key={p._id || p.slug || p.id} post={p} />
        ))}

        {/* show skeletons while initial loading OR while loading next page */}
        {loading && (start === 0
          ? Array.from({ length: PAGE_SIZE / 2 }).map((_, i) => <SkeletonCard key={`s-initial-${i}`} />)
          : Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={`s-more-${i}`} />)
        )}
      </div>

      <div className="mt-8 flex justify-center">
        {!loading && hasMore && (
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700"
            aria-label="Load more articles"
          >
            Load more
          </button>
        )}

        {!loading && !hasMore && posts.length > 0 && (
          <div className="text-sm text-gray-500 dark:text-slate-400">No more articles</div>
        )}

        {!loading && posts.length === 0 && !error && (
          <div className="text-sm text-gray-600 dark:text-slate-300">No articles found.</div>
        )}
      </div>
    </div>
  );
}
