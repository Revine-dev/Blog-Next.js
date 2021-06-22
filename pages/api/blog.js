// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from "./blog.json";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function getBlogData(slug) {
  const items = data.map((item) => {
    if (item.content && item.content.match(/\.md$/)) {
      item.path = "pages/api/articles/" + item.content;
      item.content = null;
    }
    item.slug = item.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    return item;
  });

  if (slug) {
    const isExisting = items.find((article) => article.slug === slug);

    if (isExisting.path && !isExisting.content) {
      const fileContents = fs.readFileSync(
        path.join(__dirname, "../../../../" + isExisting.path),
        "utf8"
      );
      const { data, content } = matter(fileContents);
      console.log(data, content);
    }

    return isExisting ? isExisting : false;
  }

  return items;
}
