// src/lib/queries.js

export const LIST_POSTS_QUERY = (start = 0, pageSize = 8) => `
*[_type == "post"] | order(publishedAt desc)[${start}...${start + pageSize}]{
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  mainImage,
  readTime,
  "author": author-> { name, "picture": picture.asset->url },
  "categories": categories[]->{_id, title, "slug": slug.current}
}
`;

export const SINGLE_POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  summary,
  publishedAt,
  mainImage,
  body,
  "author": author-> { name, "picture": picture.asset->url },
  "categories": categories[]->{_id, title, "slug": slug.current}
}`;

export const POSTS_BY_CATEGORY_QUERY = `
*[_type == "post" && references(*[_type=='category' && slug.current == $slug]._id)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  mainImage,
  readTime,
  "author": author-> { name, "picture": picture.asset->url },
  "categories": categories[]->{_id, title, "slug": slug.current}
}
`;
