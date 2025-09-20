import React from "react";

export default function ImageSerializer({ value }) {
  if (!value?.asset) return null;

  return (
    <figure className="my-6">
      <img
        src={value.asset.url}
        alt={value.alt || "image"}
        className="rounded-lg mx-auto"
      />
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-slate-400">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
