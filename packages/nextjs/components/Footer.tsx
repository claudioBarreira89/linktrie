import React from "react";
import { TokenOpsLogo } from "./assets/TokenOpsLogo";
import { HeartIcon } from "@heroicons/react/24/outline";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0  bg-[#f3f3f1]">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> at ETH Global Brussels by{" "}
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://tokenops.xyz"
                target="_blank"
                rel="noreferrer"
              >
                <TokenOpsLogo />
                <span>TokenOps</span>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
