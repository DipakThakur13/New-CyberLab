// src/pages/ArticlesPage.jsx
import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import SkeletonCard from "../components/SkeletonCard";
import { client, isMock } from "../lib/sanity";
import { LIST_POSTS_QUERY } from "../lib/queries";
import { MOCK_POSTS } from "../mockData"; // if you have mockData

const PAGE_SIZE = 8;

export default function ArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
  let mounted = true;
  setLoading(true);
  if (isMock) { /* existing mock logic */ return; }

  const q = LIST_POSTS_QUERY(start, PAGE_SIZE);
  client.fetch(q)
    .then((data) => {
      if (!mounted) return;
      setPosts((s) => [...s, ...(data || [])]);
      setHasMore((data || []).length === PAGE_SIZE);
    })
    .catch(console.error)
    .finally(() => mounted && setLoading(false));

  return () => { mounted = false; };
    }, [start]);
    
  const loadMore = () => setStart((s) => s + PAGE_SIZE);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">All Articles</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">Showing {posts.length} articles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => <ArticleCard key={p._id || p.id || p.slug} post={p} />)}
        {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      <div className="mt-8 flex justify-center">
        {!loading && hasMore && (
          <button onClick={loadMore} className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700">
            Load more
          </button>
        )}
        {!hasMore && !loading && <div className="text-sm text-gray-500 dark:text-slate-400">No more articles</div>}
      </div>
    </div>
  );
}
