// studio/schemas/callout.js
export default {
  name: "callout",
  type: "object",
  title: "Callout / Tip",
  fields: [
    {
      name: "style",
      type: "string",
      title: "Style",
      options: {
        list: [
          { title: "Note", value: "note" },
          { title: "Tip", value: "tip" },
          { title: "Warning", value: "warning" }
        ],
        layout: "radio"
      }
    },
    { name: "text", type: "text", title: "Text" }
  ],
  preview: {
    select: { style: "style", text: "text" },
    prepare({ style, text }) {
      return { title: style?.toUpperCase(), subtitle: text && text.slice(0, 80) };
    }
  }
};
