// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import matter from "gray-matter";

export default function getBlogData(slug) {
  const items = [];
  try {
    fs.readdirSync("./pages/api/articles").forEach((file) => {
      const fileContents = fs.readFileSync(
        "./pages/api/articles/" + file,
        "utf8"
      );
      const { data, content } = matter(fileContents);
      items.push({
        title: data.title,
        published: data.published,
        slug: data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        content,
      });
    });
  } catch (error) {
    console.log(error.message);
    return [];
  }

  if (slug && typeof slug === "string") {
    const isExisting = items.find((article) => article.slug === slug);
    return isExisting ? isExisting : false;
  }

  return items;
}
