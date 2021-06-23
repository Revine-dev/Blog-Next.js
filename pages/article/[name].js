import Head from "next/head";
import getBlogData from "../api/blog";
import Image from "next/image";
import img from "../../assets/cat.jpeg";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

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

        <div className="blog">
          <h2>{article.title}</h2>
          <div className="published">{article.published}</div>
          <div className="content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          <Link href="/">
            <a className="back">← Go back to home</a>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getBlogData(true).map((article) => {
    return {
      params: {
        name: article.slug,
      },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return {
    props: { article: getBlogData(params.name) },
  };
}
