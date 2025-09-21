// studio/schemas/post.js
// Updated Post schema: keeps uploaded Sanity image support but also adds an
// optional externalImageUrl field so editors can paste a hosted image URL.
// Frontend should prefer `mainImage` (Sanity asset) and fall back to
// `externalImageUrl` when present.

export default {
  name: "post",
  type: "document",
  title: "Post",
  fields: [
    { name: "title", type: "string", title: "Title" },

    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "URL-friendly id generated from the title",
      options: { source: "title", maxLength: 96 }
    },

    // Uploaded image (Sanity asset) — still recommended because of
    // transformations and CDN performance.
    {
      name: "mainImage",
      type: "image",
      title: "Main Image (upload)",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text", description: "Short description for accessibility" },
        { name: "credit", type: "string", title: "Credit / Source", description: "Optional image credit" }
      ]
    },

    // New: external URL alternative. Frontend should use this only when
    // mainImage is not provided.
    {
      name: "externalImageUrl",
      type: "url",
      title: "Main Image (external URL)",
      description:
        "Optional: paste a full https:// URL for an externally hosted image. " +
        "Frontend will prefer uploaded images (mainImage) but will use this URL if no upload is present.",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"]
        }).error("Please enter a valid absolute http(s) URL")
    },

    // Optional field for recording where an external image came from
    {
      name: "imageSource",
      type: "string",
      title: "Image provider / source (optional)",
      description: "Optional: provider name or attribution for external images"
    },

    { name: "author", type: "reference", to: [{ type: "author" }], title: "Author" },

    {
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "reference", to: { type: "category" } }]
    },

    { name: "publishedAt", type: "datetime", title: "Published at" },

    { name: "summary", type: "text", title: "Summary", description: "Short summary shown on listings" },

    { name: "body", type: "blockContent", title: "Body" }
  ],

  // Optional: improve Studio list previews so uploaded image is shown if present.
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "author.name"
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title,
        subtitle,
        media // will show mainImage when available; externalImageUrl is not shown here
      };
    }
  }
};
