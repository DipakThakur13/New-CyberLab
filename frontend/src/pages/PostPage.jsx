import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { client } from "../lib/sanity";
import { urlFor } from "../lib/imageBuilder";
import { SINGLE_POST_QUERY } from "../lib/queries";
import { PortableText } from "@portabletext/react";
import CodeBlockSerializer from "../components/CodeBlockSerializer";
import ImageSerializer from "../components/ImageSerializer";
import ReadingProgress from "../components/ReadingProgress";

const portableTextComponents = {
  types: {
    codeBlock: (props) => <CodeBlockSerializer value={props.value} />,
    image: (props) => <ImageSerializer value={props.value} />
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="text-blue-600 hover:underline">{children}</a>
      );
    }
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    normal: ({ children }) => <p className="leading-7 my-2">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">{children}</blockquote>
  }
};

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    client.fetch(SINGLE_POST_QUERY, { slug })
      .then((data) => {
        if (!mounted) return;
        setPost(data || null);

        // basic client-side SEO meta tags (for SPA)
        if (data) {
          document.title = `${data.title} • CyberLab`;
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
          }
          metaDesc.content = data.summary || "CyberLab tutorial";

          if (data.mainImage?.asset) {
            let ogImage = document.querySelector('meta[property="og:image"]');
            if (!ogImage) {
              ogImage = document.createElement('meta');
              ogImage.setAttribute('property', 'og:image');
              document.head.appendChild(ogImage);
            }
            ogImage.content = urlFor(data.mainImage).width(1200).auto('format').url();
          }
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center text-gray-500">Loading...</div>;
  if (!post) return <div className="container mx-auto px-4 py-20 text-center"><p className="text-gray-600">Article not found</p><button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Back to Home</button></div>;

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ReadingProgress targetRef={contentRef} />

      <header className="mb-6">
        <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to CyberLab</Link>

        <h1 className="text-4xl font-extrabold mt-4 mb-2">{post.title}</h1>

        <div className="flex items-center gap-3 mt-3">
          {post.author?.picture?.asset ? <img src={urlFor(post.author.picture).width(80).height(80).url()} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 rounded-full bg-gray-200" />}
          <div>
            <div className="text-sm font-medium">{post.author?.name || "Unknown author"}</div>
            <div className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</div>
            {post.categories?.length > 0 && <div className="text-xs text-gray-500 mt-1">{post.categories.map(c => c.title).join(" • ")}</div>}
          </div>
        </div>

        {post.mainImage?.asset && <img src={urlFor(post.mainImage).width(1600).auto('format').url()} alt={post.mainImage.alt || post.title} className="w-full h-80 object-cover mt-6 rounded-md" />}
      </header>

      <section ref={contentRef} className="prose max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </section>
    </div>
  );
}
