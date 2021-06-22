import Head from "next/head";
import Image from "next/image";
import img from "../assets/cat.jpeg";
import loadData from "./api/blog";
import Link from "next/link";

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
            <Image
              src={img}
              className="logo"
              alt="logo-cat"
              width="100%"
              height="100%"
            />
          </div>
          <h1>Rémi Vinatier</h1>
        </div>

        <p>
          Hello, I’m <strong>Rémi Vinatier</strong>. I’m a web/mobile developer.
          You can contact me{" "}
          <a href="https://www.revine.fr" target="_blank" rel="noreferrer">
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

export async function getStaticProps(context) {
  return { props: { articles: loadData() } };
}
