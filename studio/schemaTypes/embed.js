// studio/schemas/embed.js
export default {
  name: "embed",
  type: "object",
  title: "Embed (YouTube, Tweet, etc.)",
  fields: [
    { name: "url", type: "url", title: "URL", validation: Rule => Rule.uri({ scheme: ["http", "https"] }) },
    {
      name: "height",
      type: "number",
      title: "Height (px)",
      description: "Optional fixed height for iframe embeds"
    },
    {
      name: "caption",
      type: "string",
      title: "Caption (optional)"
    }
  ],
  preview: {
    select: { url: "url" },
    prepare(selection) {
      return { title: "Embed", subtitle: selection.url };
    }
  }
};
