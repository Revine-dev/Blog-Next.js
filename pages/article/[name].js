import Head from "next/head";
import data from "../api/blog.json";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Page({ article }) {
  return (
    <div>
      <Head>
        <title>{article.title} - Revine</title>
        <meta
          name="description"
          content="Discover my own blog made with Next.JS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="head title">
          <div className="round">
            <img
              src="https://wecareanimalrescue.org/wp-content/uploads/2018/03/AdobeStock_139467131-e1522009663289.jpeg"
              alt="logo-cat"
              className="logo"
            />
          </div>
          <h1>Rémi Vinatier</h1>
        </div>

        <div className="blog">
          <h2>{article.title}</h2>
          <div className="published">{article.published}</div>
          <div className="content">{article.content}</div>
          <Link href="/">
            <a className="back">Go back to home</a>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res, locale, query, store }) {
  const items = data.map((item) => {
    item.slug = item.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    return item;
  });

  if (!query.name || !items.find((article) => article.slug === query.name)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { article: items.find((article) => article.slug === query.name) },
  };
}
