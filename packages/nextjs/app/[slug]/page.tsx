"use client";

import { useState } from "react";
import classNames from "classnames";
import type { NextPage } from "next";

// import { useWriteContract } from "wagmi";
// import deployedContracts from "~~/contracts/deployedContracts";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// import { notification } from "~~/utils/scaffold-eth";

const Page: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);

  // const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  // const { data: result, isPending, writeContractAsync } = useWriteContract();

  return (
    <div className="flex max-w-2xl flex-col pt-10 m-auto gap-10 w-full p-4">
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-5xl">Username</h1>

        <div className="gap-4 flex flex-col">
          <LinkItem />
          <LinkItem />
          <LinkItem />
        </div>

        <button className="btn btn-secondary" onClick={() => setOpenModal(true)}>
          + Add new
        </button>
      </div>

      <div
        className={classNames("modal", {
          ["modal-open"]: openModal,
        })}
        onClick={() => setOpenModal(false)}
      >
        <div onClick={e => e.stopPropagation()} className="modal-box bg-white">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-gray-900">Add new link</h1>
            <input className="input input-bordered input-secondary bg-white" placeholder="Link name" />
            <input className="input input-bordered input-secondary bg-white" placeholder="Link url" />

            <button className="btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkItem = () => {
  return (
    <div className="transition-all bg-gray-200 cursor-pointer hover:-top-2 top-0 relative hover:bg-white border-4 shadow-lg shadow-gray-800 border-b-8 border-gray-800 p-6 text-gray-900 text-2xl">
      Link name
    </div>
  );
};

export default Page;
