// src/components/ImageSerializer.jsx
import React from "react";
import { urlFor } from "../lib/imageBuilder";

export default function ImageSerializer({ value }) {
  // value may contain: asset, _ref, externalUrl, alt, caption
  const uploaded = value?.asset || value?._ref;
  const external = value?.externalUrl || value?.externalImageUrl;

  let src = null;
  if (uploaded) {
    try {
      const builder = urlFor(value);
      src = builder && typeof builder.width === "function" ? builder.width(1200).auto("format").fit("max").url() : builder;
    } catch (e) {
      console.warn("urlFor error", e);
    }
  } else if (external) {
    src = external;
  }

  if (!src) return null;

  return (
    <figure className="my-6">
      <img src={src} alt={value?.alt || "Illustration"} loading="lazy" className="w-full rounded" />
      {value?.caption && <figcaption className="text-sm text-slate-500 mt-2">{value.caption}</figcaption>}
    </figure>
  );
}
