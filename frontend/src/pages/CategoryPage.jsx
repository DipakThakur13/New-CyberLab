// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import SkeletonCard from "../components/SkeletonCard";
import { client, isMock } from "../lib/sanity";
import { POSTS_BY_CATEGORY_QUERY } from "../lib/queries";
import { MOCK_POSTS } from "../mockData";

export default function CategoryPage() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let mounted = true;
  setLoading(true);

  if (isMock) { /* mock fallback */ return; }

  client.fetch(POSTS_BY_CATEGORY_QUERY, { slug })
    .then((data) => {
      if (!mounted) return;
      setPosts(data || []);
    })
    .catch(console.error)
    .finally(() => mounted && setLoading(false));

  return () => { mounted = false; };
}, [slug]);


  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Category: {slug}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : posts.map(p => <ArticleCard key={p._id || p.id || p.slug} post={p} />)}
      </div>
    </div>
  );
}
