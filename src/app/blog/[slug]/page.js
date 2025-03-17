import { notFound } from "next/navigation";
import parse from "html-react-parser";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

// Fetch the blog post by slug
async function getBlogPostBySlug(slug) {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts",
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const posts = await res.json();
  return posts.find((post) => slugify(post.title.rendered) === slug) || null;
}

// Fetch all blog posts
async function getAllBlogPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts",
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return await res.json();
}

export default async function BlogPostPage({ params }) {
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => slugify(p.title.rendered) === params.slug);

  if (!post) return notFound(); // Show 404 if post not found

  const relatedPosts = posts
    .filter((p) => p.id !== post.id) // Exclude current post
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen p-6 flex flex-col lg:flex-row gap-6">
        {/* Main Blog Content */}
        <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md border border-gray-300">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">
            {parse(post.title?.rendered || "Untitled")}
          </h1>

          {/* Featured Image */}
          {post.jetpack_featured_media_url && (
            <img
              src={post.jetpack_featured_media_url}
              alt="Featured"
              className="w-full max-w-lg rounded-lg shadow-md"
            />
          )}

          {/* Blog Content */}
          <div className="mt-4 prose prose-lg max-w-none wp-content">
            {parse(post.content?.rendered || "<p>Content not available.</p>")}
          </div>
        </div>

        {/* Sidebar - Recent Posts */}
        <aside className="w-72 bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <ul className="space-y-2">
            {posts.slice(0, 6).map((recentPost) => (
              <li key={recentPost.id}>
                <a
                  href={`/blog/${slugify(recentPost.title.rendered)}`}
                  className="text-blue-600 hover:underline"
                >
                  {parse(recentPost.title.rendered)}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Related Blogs Section */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Related Blogs
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {relatedPosts.map((related) => (
              <div
                key={related.id}
                className="w-72 bg-white p-4 rounded-lg shadow-md border border-gray-300"
              >
                {/* Related Blog Image */}
                {related.jetpack_featured_media_url && (
                  <img
                    src={related.jetpack_featured_media_url}
                    alt="Related Blog"
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold mt-3">
                  {parse(related.title.rendered)}
                </h3>

                {/* Excerpt - Fixed the paragraph issue */}
                <div className="text-sm text-gray-600 mt-2">
                  {parse(related.excerpt.rendered.substring(0, 100))}...
                </div>

                {/* Read More Button */}
                <a
                  href={`/blog/${slugify(related.title.rendered)}`}
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-center"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/--+/g, "-") // Remove duplicate dashes
    .trim();
}
