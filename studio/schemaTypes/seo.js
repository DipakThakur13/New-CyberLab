// studio/schemas/seo.js
export default {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    { name: "metaTitle", type: "string", title: "Meta title", description: "Optional - otherwise we use the post title." },
    { name: "metaDescription", type: "text", title: "Meta description", description: "Shown in search results and social shares." },
    {
      name: "ogImage",
      title: "OpenGraph image",
      type: "image",
      description: "Optional OG image. If unset, the post's main image will be used.",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }]
    },
    {
      name: "twitterCard",
      title: "Twitter card type",
      type: "string",
      options: {
        list: [
          { title: "summary", value: "summary" },
          { title: "summary_large_image", value: "summary_large_image" }
        ],
        layout: "radio"
      }
    }
  ]
};
