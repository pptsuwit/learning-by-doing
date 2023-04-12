import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/ic_logosmall.png" />
      </Head>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
