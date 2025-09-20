import React from "react";
import { urlFor } from "../lib/imageBuilder";

export default function ImageSerializer({ value }) {
  if (!value?.asset) return null;
  return (
    <figure className="my-6">
      <img src={urlFor(value.asset).width(1200).auto("format").url()} alt={value.alt || "image"} className="w-full h-auto rounded-md object-cover" />
      {value.caption && <figcaption className="mt-2 text-sm text-gray-500">{value.caption}</figcaption>}
    </figure>
  );
}
