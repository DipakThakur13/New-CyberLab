// src/lib/imageBuilder.js
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity";

const builder = client && client !== null ? imageUrlBuilder(client) : null;

export function urlFor(source) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").url();
}
