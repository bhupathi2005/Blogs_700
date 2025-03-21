import { notFound } from "next/navigation";
import Link from "next/link";
import parse from "html-react-parser";
import Footer from "../../components/footer";
import he from "he";
import Image from "next/image";

// Fetch all blog posts
async function getAllBlogPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return await res.json();
}

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

// Function to sanitize content and avoid nested <p> errors
function sanitizeContent(content) {
  return content
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<p><p>/g, "<p>")
    .replace(/<\/p><\/p>/g, "</p>");
}

export default async function BlogPostPage({ params }) {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  const relatedPosts = posts
    .filter((p) => p.id !== post.id) // Exclude current post
    .slice(0, 3);
  const recentPosts = posts.slice(0, 6);

  return (
    <>
      <div
        style={{
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Flex Container for Main Content and Recent Posts */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "24px",
            }}
          >
            {/* Left Side: Main Blog Post and Related Posts */}
            <div style={{ flex: "1", minWidth: "0" }}>
              {/* Main Blog Post */}
              <article
                style={{
                  backgroundColor: "#fff",
                  padding: "24px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ddd",
                }}
              >
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "#111827",
                  }}
                >
                  {parse(post.title?.rendered || "Untitled")}
                </h1>

                {post.jetpack_featured_media_url && (
                  <Image
                    src={post.jetpack_featured_media_url}
                    alt={post.title?.rendered || "Blog image"}
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      marginBottom: "16px",
                    }}
                  />
                )}

                {/* FIX: Wrap content in <div> to avoid <p> nesting errors */}
                <div
                  style={{
                    marginTop: "16px",
                    color: "#374151",
                    padding: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  {parse(
                    sanitizeContent(
                      post.content?.rendered || "<p>Content not available.</p>"
                    )
                  )}
                </div>
              </article>

              {/* Related Blogs Section */}
              <section style={{ marginTop: "48px" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "#111827",
                  }}
                >
                  Related Blogs
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {relatedPosts.map((related) => {
                    const imageUrl =
                      related.jetpack_featured_media_url ||
                      extractImage(related.content.rendered);
                    return (
                      <div
                        key={related.id}
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          padding: "16px",
                          transition: "transform 0.2s",
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                      >
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={related.title.rendered}
                            style={{
                              width: "100%",
                              height: "180px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                        <div style={{ padding: "12px 0", flexGrow: "1" }}>
                          <h3
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: "600",
                              marginBottom: "8px",
                              color: "#111827",
                            }}
                          >
                            <Link
                              href={`/blog/${
                                post.slug || slugify(post.title.rendered)
                              }`}
                              style={{
                                color: "#2563eb",
                                textDecoration: "none",
                              }}
                            >
                              {parse(related.title.rendered)}
                            </Link>
                          </h3>
                          <div
                            style={{
                              color: "#4b5563",
                              fontSize: "0.875rem",
                              marginBottom: "12px",
                            }}
                          >
                            {parse(
                              sanitizeContent(
                                related.excerpt.rendered.substring(0, 100)
                              )
                            )}
                            ...
                          </div>
                          <Link
                            href={`/blog/${
                              post.slug || slugify(post.title.rendered)
                            }`}
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
              </section>
            </div>

            {/* Right Side: Recent Posts */}
            <div style={{ width: "30%", minWidth: "250px" }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    color: "#111827",
                  }}
                >
                  Recent Posts
                </h2>
                <ul
                  style={{ listStyleType: "none", padding: "0", margin: "0" }}
                >
                  {recentPosts.map((post) => (
                    <li
                      key={post.id}
                      style={{
                        marginBottom: "12px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "8px",
                      }}
                    >
                      <Link
                        href={`/blog/${
                          post.slug || slugify(post.title.rendered)
                        }`}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        {he.decode(post.title.rendered)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
