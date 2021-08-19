import "tailwindcss/tailwind.css";
import "../styles/main.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
