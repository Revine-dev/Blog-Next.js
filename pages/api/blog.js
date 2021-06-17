// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from "./blog.json";

export async function getServerSideProps(context) {
  const items = data.map((item) => {
    item.slug = item.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    return item;
  });

  return { props: { articles: items } };
}
