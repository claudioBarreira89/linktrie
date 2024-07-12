"use client";

import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import type { NextPage } from "next";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

// import { useWriteContract } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// import { notification } from "~~/utils/scaffold-eth";

const Page: NextPage = ({ params }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const { data, refetch } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getUserProfileByTrie",
    args: [params.slug || ""],
  });

  // const { data: isAdmin } = useScaffoldReadContract({
  //   contractName: "YourContract",
  //   functionName: "isAdmin",
  //   args: [params.slug || ""],
  // });

  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  const [, , linkNames, linkUrls] = data || [];

  const handleAddLink = async () => {
    if (!linkName || !linkUrl) {
      notification.error("Please fill in all fields");
      return;
    }

    await writeContractAsync({
      functionName: "addLink",
      args: [linkName, linkUrl],
    });

    setOpenModal(false);
    refetch();
  };

  // const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  // const { data: result, isPending, writeContractAsync } = useWriteContract();

  return (
    <div className="flex max-w-2xl flex-col pt-10 m-auto gap-10 w-full p-4">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-5xl">Username</h1>

        <div className="gap-4 flex flex-col">
          {linkNames?.map((name, i) => (
            <LinkItem key={i} name={name} url={linkUrls?.[i] || ""} />
          ))}
        </div>

        <button className="btn btn-secondary" onClick={() => setOpenModal(true)}>
          + Add new
        </button>
      </div>

      <div
        className={classNames("modal", {
          ["modal-open"]: openModal,
        })}
        onClick={() => {
          setOpenModal(false);
          setLinkName("");
          setLinkUrl("");
        }}
      >
        <div onClick={e => e.stopPropagation()} className="modal-box bg-white">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-gray-900">Add new link</h1>
            <input
              className="input input-bordered input-secondary bg-white text-gray-900"
              placeholder="Link name"
              value={linkName}
              onChange={e => setLinkName(e.target.value)}
            />
            <input
              className="input input-bordered input-secondary bg-white text-gray-900"
              placeholder="Link url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
            />

            <button className="btn" onClick={handleAddLink}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkItem = ({ name, url }: { name: string; url: string }) => {
  return (
    <Link href={url} target="_blank">
      <div className="transition-all bg-gray-200 cursor-pointer hover:-top-2 top-0 relative hover:bg-white border-4 shadow-lg shadow-gray-800 border-b-8 border-gray-800 p-6 text-gray-900 text-2xl">
        {name}
      </div>
    </Link>
  );
};

export default Page;
