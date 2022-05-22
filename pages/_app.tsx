import "../css/style.css";
import "../css/form.css";
import Head from "next/head";
import Link from "next/link";
import { App } from "../@types/types";

function MyApp({ Component, pageProps }: App) {
  return (
    <>
      <Head>
        <title>Pet Care App</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/new">
            <a>Add Pet</a>
          </Link>
        </div>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
