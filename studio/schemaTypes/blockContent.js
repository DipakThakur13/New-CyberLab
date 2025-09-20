export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    { type: 'block' },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }]
    },
    {
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        { name: 'language', type: 'string', title: 'Language' },
        { name: 'code', type: 'text', title: 'Code' }
      ]
    }
  ]
}
