export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }]
    },
    { name: 'author', type: 'reference', to: [{ type: 'author' }], title: 'Author' },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    { name: 'publishedAt', type: 'datetime', title: 'Published at' },
    { name: 'summary', type: 'text', title: 'Summary' },
    { name: 'body', type: 'blockContent', title: 'Body' }
  ]
}
