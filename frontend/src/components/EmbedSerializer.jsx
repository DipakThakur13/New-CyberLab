// src/components/EmbedSerializer.jsx
import React from "react";

function youtubeEmbed(url) {
  try {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
    const id = m ? m[1] : null;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch (e) { return null; }
}

export default function EmbedSerializer({ value }) {
  const u = value?.url;
  if (!u) return null;

  // YouTube iframe
  const yt = youtubeEmbed(u);
  if (yt) {
    return (
      <div className="my-6">
        <div className="aspect-w-16 aspect-h-9">
          <iframe src={yt} title="YouTube embed" frameBorder="0" allowFullScreen className="w-full h-full rounded-md"></iframe>
        </div>
        {value?.caption && <div className="text-sm text-slate-500 mt-2">{value.caption}</div>}
      </div>
    );
  }

  // Fallback: render link
  return (
    <div className="my-6">
      <a href={u} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{u}</a>
      {value?.caption && <div className="text-sm text-slate-500 mt-2">{value.caption}</div>}
    </div>
  );
}
