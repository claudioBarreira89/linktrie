"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col pt-10 m-auto gap-10 w-full p-4">
      <div className="flex flex-col gap-2 max-w-2xl">
        <h1 className="text-5xl">Everything you are. On-chain!</h1>
        <h2 className="text-xl">
          Join the future of link sharing with our blockchain-powered platform. Use one secure, decentralized link to
          share everything you create, and sell from your Farecaster, Linkedin, X, YouTube, and other social media
          profiles. Experience the power of on-chain technology for your link in bio needs.
        </h2>
      </div>
      <div className="flex flex-grow flex-row gap-2 max-w-lg">
        <input className="input min-w-28 w-full" placeholder="Insert value" />
        <button className="btn btn-secondary">Claim your Linktrie</button>
      </div>
    </div>
  );
};

export default Home;
