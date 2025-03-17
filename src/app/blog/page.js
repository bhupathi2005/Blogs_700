import Link from "next/link";

// Fetch all blog posts
async function getAllPosts() {
  const res = await fetch(
    "https://public-api.wordpress.com/wp/v2/sites/cleaning988.wordpress.com/posts",
    { cache: "no-store" } // Ensures fresh data every time
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-4">
              <Link
                href={`/blog/${slugify(post.title.rendered)}`}
                className="text-xl text-blue-600 hover:underline"
              >
                {post.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Slugify function to convert titles into slugs
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
