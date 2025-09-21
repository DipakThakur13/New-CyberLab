// studio/schemas/codeBlock.js
export default {
  name: "codeBlock",
  type: "object",
  title: "Code block",
  fields: [
    {
      name: "language",
      type: "string",
      title: "Language",
      description: "Programming language for syntax highlighting",
      options: {
        list: [
          "bash","sh","javascript","typescript","python","go","ruby","java","c","cpp","json","yaml","markup","sql","text"
        ]
      }
    },
    { name: "code", type: "text", title: "Code" },
    { name: "filename", type: "string", title: "Filename (optional)" }
  ],
  preview: {
    select: {
      language: "language",
      code: "code"
    },
    prepare({ language, code }) {
      return {
        title: language ? `Code (${language})` : "Code",
        subtitle: (code || "").split("\n")[0]?.slice(0, 80)
      };
    }
  }
};
