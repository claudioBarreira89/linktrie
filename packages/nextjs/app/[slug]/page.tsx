"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
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
  const { address } = useAccount();

  const { data, isLoading, refetch } = useScaffoldReadContract({
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

  const [owner, , , linkNames, linkUrls] = data || [];

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

  const handleRemoveLink = async (key: any) => {
    await writeContractAsync({
      functionName: "removeLink",
      args: [key],
    });

    refetch();
  };

  // const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  // const { data: result, isPending, writeContractAsync } = useWriteContract();

  const isAdmin = address && owner && address === owner;

  useEffect(() => {
    if (isAdmin && !data) {
      refetch();
    }
  }, [data, isAdmin, refetch]);

  return (
    <div className="flex max-w-2xl flex-col pt-10 m-auto gap-10 w-full p-4">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-5xl">@{params.slug}</h1>

        <div className="gap-4 flex flex-col">
          {isLoading && (
            <div className="flex justify-center">
              <div className="loading-spinner loading w-14" />
            </div>
          )}
          {linkNames?.map((name, i) => (
            <LinkItem
              key={i}
              name={name}
              url={linkUrls?.[i] || ""}
              isAdmin={isAdmin}
              handleRemoveLink={handleRemoveLink}
            />
          ))}
        </div>

        {isAdmin && (
          <button className="btn btn-secondary" onClick={() => setOpenModal(true)}>
            + Add new
          </button>
        )}
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

            <button className="btn btn-secondary" onClick={handleAddLink}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkItem = ({
  name,
  url,
  isAdmin,
  handleRemoveLink,
}: {
  name: string;
  url: string;
  isAdmin: boolean;
  handleRemoveLink: any;
}) => {
  const handleOpenLink = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="relative" onClick={handleOpenLink}>
      <div className="transition-all bg-gray-200 cursor-pointer hover:-top-1 top-0 relative hover:bg-white border-4 shadow-lg shadow-gray-800 border-b-8 border-gray-800 p-6 text-gray-900 text-2xl">
        <div className="flex justify-between items-center">
          <div className="flex-1">{name}</div>
          {isAdmin && (
            <div className="dropdown dropdown-end" onClick={e => e.stopPropagation()}>
              <div tabIndex={0} role="button" className="px-2 py-1">
                <EllipsisVerticalIcon className="w-6 h-6" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-32 p-2 shadow">
                <li onClick={() => handleRemoveLink(name)} className="hover:bg-gray-200 rounded-lg">
                  <a>Remove</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
