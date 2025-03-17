"use client"; // ✅ Mark as client component

import { useEffect, useState } from "react";

async function getBlogContent(id) {
  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const data = await res.json();
  return data || {};
}

export default function BlogContent({ id }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlogContent(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;

  if (!post) {
    return <div className="text-center text-red-500">⚠️ Post Not Found</div>;
  }

  return (
    <>
      <h1
        className="text-3xl font-bold mb-4 text-center"
        dangerouslySetInnerHTML={{ __html: post.title?.rendered || "Untitled" }}
      />
      {post.jetpack_featured_media_url && (
        <img
          src={post.jetpack_featured_media_url}
          alt="Featured"
          className="w-full max-w-lg mx-auto rounded-lg shadow-md"
        />
      )}
      <div
        className="mt-4 prose prose-lg text-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content?.rendered || "<p>No content available.</p>",
        }}
      />
    </>
  );
}
