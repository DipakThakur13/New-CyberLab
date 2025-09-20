// Centralized GROQ queries used by the frontend.

export const LIST_POSTS_QUERY = (start = 0, pageSize = 6, q = "") => {
  if (q && q.trim()) {
    // simple match on title or summary - for dev convenience
    return `*[_type == "post" && (title match $q || summary match $q)] | order(publishedAt desc)[${start}...${start +
      pageSize}]{
        _id, title, "slug": slug.current, summary, publishedAt, mainImage, author-> { name, picture }
      }`;
  }
  return `*[_type == "post"] | order(publishedAt desc)[${start}...${start + pageSize}]{
    _id, title, "slug": slug.current, summary, publishedAt, mainImage, author-> { name, picture }
  }`;
};

export const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  mainImage,
  author-> { name, picture },
  categories[]-> { _id, title },
  body
}`;
