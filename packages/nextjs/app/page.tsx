"use client";

import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
// import { useWriteContract } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  // const { data: result, isPending, writeContractAsync } = useWriteContract();

  // deployedContracts
  const handleCreateProfile = async () => {
    if (!value) {
      notification.error("Please enter a value");
      return;
    }

    await writeContractAsync({
      functionName: "createProfile",
      args: [value],
    });
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full bg-bggreen pt-24 pb-0 text-salad">
      <div className="max-w-[1350px] w-full flex gap-8">
        <div>
          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-6xl font-bold">
              Everything you are. <br></br>On-chain.
            </h1>
            <h2 className="text-lg">
              Join the future of link sharing with our blockchain-powered platform. Use one secure, decentralized link
              to share everything you create, and sell from your Farecaster, Linkedin, X, YouTube, and other social
              media profiles. Experience the power of on-chain technology for your link in bio needs.
            </h2>
          </div>
          <div className="flex flex-grow flex-row gap-2 max-w-lg mt-8">
            <input
              className="input min-w-32 max-w-64 w-full bg-white rounded-md"
              placeholder="Insert value"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button className="btn bg-[#e8c0e9] hover:bg-[#e2bae4] text-black" onClick={handleCreateProfile}>
              Claim your Linktrie
            </button>
          </div>
        </div>
        <div className="">
          <Image src="/nous.gif" alt="gid" width={400} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Home;
