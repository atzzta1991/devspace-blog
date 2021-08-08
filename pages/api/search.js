import { getPosts } from "@/lib/posts";

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === "production") {
    // fetch from cache
  } else {
    posts = getPosts();
  }
  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );
  res.status(200).json(JSON.stringify({ results }));
};
