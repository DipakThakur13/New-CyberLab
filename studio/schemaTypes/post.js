// studio/schemas/post.js
import seo from "./seo";

export default {
  name: "post",
  type: "document",
  title: "Post",
  fieldsets: [
    { name: "meta", title: "Meta", options: { collapsible: true } }
  ],
  fields: [
    { name: "title", type: "string", title: "Title", validation: Rule => Rule.required().min(3) },

    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: Rule => Rule.required()
    },

    {
      name: "mainImage",
      type: "image",
      title: "Main image (upload)",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "credit", type: "string", title: "Credit / source" }
      ]
    },

    {
      name: "externalImageUrl",
      type: "url",
      title: "Main image (external URL)",
      description: "Optional fallback URL used when there is no uploaded image.",
      validation: Rule => Rule.uri({ scheme: ["http", "https"], allowRelative: false })
    },

    { name: "author", type: "reference", to: [{ type: "author" }], title: "Author", validation: Rule => Rule.required() },

    {
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "reference", to: { type: "category" } }],
      options: { layout: "tags" }
    },

    { name: "summary", type: "text", title: "Summary", description: "Short blurb for listing pages" },

    { name: "body", type: "blockContent", title: "Body", description: "Main article content" },

    { name: "publishedAt", type: "datetime", title: "Published at" },

    {
      name: "readTime",
      type: "number",
      title: "Estimated read time (minutes)",
      description: "Optional. Fill manually or run the generator script to compute automatically."
    },

    {
      name: "featured",
      type: "boolean",
      title: "Featured",
      description: "Set to show on homepage / hero sections"
    },

    // SEO object
    {
      name: "seo",
      title: "SEO / Social",
      type: "seo",
      fieldset: "meta"
    },

    {
      name: "canonicalUrl",
      type: "url",
      title: "Canonical URL",
      fieldset: "meta",
      description: "Set if the post is canonical to another URL (for syndicated content)"
    }
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt"
    },
    prepare(selection) {
      const { title, author, media, publishedAt } = selection;
      return {
        title,
        subtitle: author ? `by ${author}` : publishedAt ? `${new Date(publishedAt).toLocaleDateString()}` : "Draft",
        media
      };
    }
  }
};
