export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt text", type: "string", description: "Important for SEO & accessibility" }
      ]
    },
    { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
    { name: "categories", title: "Categories", type: "array", of: [{ type: "reference", to: { type: "category" } }] },
    { name: "publishedAt", title: "Published at", type: "datetime" },
    { name: "summary", title: "Summary", type: "text", rows: 3 },
    { name: "body", title: "Body", type: "blockContent" }
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { title, author } = selection;
      return { title, subtitle: author ? `by ${author}` : "" };
    }
  }
};
