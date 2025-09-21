// studio/schemas/blockContent.js

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    // -------------------
    // STANDARD TEXT BLOCK
    // -------------------
    {
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 1", value: "h1" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" }
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Code (inline)", value: "code" },
          { title: "Highlight", value: "highlight" },
          { title: "Superscript", value: "sup" },
          { title: "Subscript", value: "sub" }
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL" },
              { name: "openInNewTab", type: "boolean", title: "Open in new tab" }
            ]
          }
        ]
      }
    },

    // -------------------
    // LINE BREAK / DIVIDER
    // -------------------
    {
      type: "object",
      name: "divider",
      title: "Divider",
      fields: [{ name: "style", type: "string", title: "Style" }],
      preview: { prepare: () => ({ title: "Divider" }) }
    },

    // -------------------
    // CODE BLOCK
    // -------------------
    {
      type: "object",
      name: "codeBlock",
      title: "Code Block",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Language",
          options: {
            list: [
              "bash", "sh", "javascript", "typescript", "python",
              "go", "ruby", "java", "c", "cpp", "json", "yaml", "sql", "text"
            ]
          }
        },
        { name: "filename", type: "string", title: "Filename (optional)" },
        { name: "code", type: "text", title: "Code" }
      ]
    },

    // -------------------
    // IMAGE
    // -------------------
    {
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "caption", type: "string", title: "Caption (optional)" },
        {
          name: "externalUrl",
          type: "url",
          title: "External URL",
          description: "Optional external image URL instead of upload"
        }
      ]
    },

    // -------------------
    // TABLE
    // -------------------
    {
      type: "object",
      name: "table",
      title: "Table",
      fields: [
        {
          name: "rows",
          type: "array",
          title: "Rows",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "cells",
                  type: "array",
                  title: "Cells",
                  of: [{ type: "string" }]
                }
              ]
            }
          ]
        }
      ],
      preview: {
        prepare: () => ({ title: "Table" })
      }
    },

    // -------------------
    // CALLOUT / TIP
    // -------------------
    {
      type: "object",
      name: "callout",
      title: "Callout",
      fields: [
        {
          name: "style",
          type: "string",
          options: {
            list: [
              { title: "Note", value: "note" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" }
            ]
          }
        },
        { name: "text", type: "text", title: "Callout text" }
      ],
      preview: {
        select: { style: "style", text: "text" },
        prepare({ style, text }) {
          return { title: `${style?.toUpperCase() || "Callout"}`, subtitle: text?.slice(0, 40) };
        }
      }
    },

    // -------------------
    // EMBED (YouTube / Tweet / etc.)
    // -------------------
    {
      type: "object",
      name: "embed",
      title: "Embed",
      fields: [
        { name: "url", type: "url", title: "URL" },
        { name: "caption", type: "string", title: "Caption (optional)" }
      ]
    }
  ]
};
