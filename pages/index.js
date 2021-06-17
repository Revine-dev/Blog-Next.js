import Head from "next/head";
import Image from "next/image";
import getServerSidesProps from "./api/blog";
import Link from "next/link";
import data from "./api/blog.json";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>My blog - Revine</title>
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

        <p>
          Hello, I’m <strong>Rémi Vinatier</strong>. I’m a web/mobile developer.
          You can contact me{" "}
          <a href="https://www.revine.fr" target="_blank">
            on my own website
          </a>
          . (This is a sample website made to test Next.JS)
        </p>

        <div className="blog">
          <h2>Blog</h2>
          {!props.articles || props.articles.length === 0 ? (
            <div>Aucun article</div>
          ) : (
            props.articles.map((article) => {
              return (
                <div key={article.title} className="article">
                  <div className="title">
                    <Link href={`article/${article.slug}`}>
                      <a>{article.title}</a>
                    </Link>
                  </div>
                  <div className="published">{article.published}</div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

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
