import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { About, Hero, Title } from "../styles/HomeStyled";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>MulletVerse</title>
        <meta name="description" content="Simplify Web3 by providing an NFT marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero>
        <Title>MULLETVERSE</Title>
      </Hero>
      <About>Foo Bar</About>
    </Fragment>
  );
};

export default Home;
