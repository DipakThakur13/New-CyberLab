// src/mockData.js
export const MOCK_POSTS = [
  {
    _id: "p1",
    title: "Intro to Network Scanning",
    slug: "network-scanning",
    summary: "How to scan a network using nmap and interpret results.",
    publishedAt: new Date().toISOString(),
    mainImage: null,
    author: { name: "Dipak Kumar", picture: null }
  },
  {
    _id: "p2",
    title: "Understanding TLS",
    slug: "understanding-tls",
    summary: "TLS basics for secure transport layer communications.",
    publishedAt: new Date().toISOString(),
    mainImage: null,
    author: { name: "Dipak Kumar", picture: null }
  }
];

export const MOCK_FULL_POST = {
  _id: "p1",
  title: "Intro to Network Scanning",
  slug: "network-scanning",
  summary: "How to scan a network using nmap and interpret results.",
  publishedAt: new Date().toISOString(),
  mainImage: null,
  author: { name: "Dipak Kumar", picture: null },
  categories: [{ _id: "c1", title: "Network Security" }],
  body: [
    { _type: "block", style: "normal", children: [{ _type: "span", text: "Network scanning is an important first step..." }] },
    {
      _type: "codeBlock",
      language: "bash",
      code: "nmap -sS -A 192.168.1.0/24"
    },
    {
      _type: "image",
      asset: null,
      alt: "Sample diagram",
      caption: "Example network layout"
    }
  ]
};
