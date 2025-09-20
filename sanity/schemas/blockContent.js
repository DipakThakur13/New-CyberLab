export default {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [{ title: "Bullet", value: "bullet" }, { title: "Number", value: "number" }],
      marks: {
        decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "URL",
            fields: [{ name: "href", type: "url", title: "URL" }]
          }
        ]
      }
    },
    // standard image block with alt + caption
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative text", description: "Important for accessibility" },
        { name: "caption", type: "string", title: "Caption" }
      ]
    },
    // custom code block
    {
      name: "codeBlock",
      title: "Code Block",
      type: "object",
      fields: [
        { name: "language", title: "Language", type: "string", options: { list: ["bash", "sh", "javascript", "ts", "python", "json", "yaml", "go", "c", "cpp", "java", "ruby"] } },
        { name: "code", title: "Code", type: "text", rows: 8 }
      ],
      preview: {
        select: { language: "language", code: "code" },
        prepare(selection) {
          const lang = selection.language || "text";
          const code = selection.code || "";
          return {
            title: `Code — ${lang}`,
            subtitle: code.substring(0, 60) + (code.length > 60 ? "…" : "")
          };
        }
      }
    }
  ]
};
