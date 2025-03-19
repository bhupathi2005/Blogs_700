"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import he from "he"; // Import HTML Entities library

// Helper function to extract the first image from content
function extractImage(content) {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

// Helper function to generate slugs
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/--+/g, "-") // Remove duplicate dashes
    .trim();
}

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts"
      );
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    }
    fetchPosts();
  }, []);

  // Get recent posts (latest 5)
  const recentPosts = posts.slice(0, 5);

  return (
    <div style={{ backgroundColor: "#f3f4f6", color: "#000", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Left Side: Blog Posts */}
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px", color: "#1f2937" }}>
            Latest Blog Posts
          </h1>
          <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "24px" }}>
            Stay updated with our latest insights and articles.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
            {posts.map((post) => {
              const imageUrl = post.jetpack_featured_media_url || extractImage(post.content.rendered);
              return (
                <div
                  key={post.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "16px",
                    transition: "transform 0.2s",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.title.rendered}
                      style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  )}
                  <div style={{ padding: "12px 0", flexGrow: "1" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "8px", color: "#111827" }}>
                      <Link href={`/blog/${slugify(post.title.rendered)}`} style={{ color: "#2563eb", textDecoration: "none" }}>
                        {he.decode(post.title.rendered)}
                      </Link>
                    </h3>
                    <div style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "12px" }}>
                      {he.decode(post.excerpt.rendered.substring(0, 100))}...
                    </div>
                    <Link
                      href={`/blog/${slugify(post.title.rendered)}`}
                      style={{
                        display: "inline-block",
                        padding: "10px 16px",
                        backgroundColor: "#CAEE5A",
                        color: "#000",
                        fontWeight: "bold",
                        borderRadius: "6px",
                        textAlign: "center",
                        textDecoration: "none",
                      }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Recent Posts Section */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "12px", color: "#111827" }}>
              Recent Posts
            </h2>
            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
              {recentPosts.map((post) => (
                <li key={post.id} style={{ marginBottom: "12px", borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>
                  <Link href={`/blog/${slugify(post.title.rendered)}`} style={{ color: "#2563eb", textDecoration: "none", fontSize: "1rem", fontWeight: "500" }}>
                    {he.decode(post.title.rendered)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
