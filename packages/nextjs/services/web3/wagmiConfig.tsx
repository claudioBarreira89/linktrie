import { createClient, http } from "viem";
import { baseSepolia, scrollSepolia, sepolia } from "viem/chains";
import { createConfig } from "wagmi";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

export const wagmiConfig = createConfig({
  chains: [
    baseSepolia,
    sepolia,
    scrollSepolia,
    {
      blockExplorerUrls: ["https://explorer.testnet.rsk.co"],
      chainId: 31,
      name: "RSK Testnet",
      rpcUrls: ["https://public-node.testnet.rsk.co"],
      iconUrls: ["https://rootstock.io/icons/icon-512x512.png?v=d5199ca8e8f274bc01b19fe9024f128e"],
      nativeCurrency: {
        name: "Rootstock Bitcoin",
        symbol: "tRBTC",
        decimals: 18,
      },
      networkId: 31,
    },
  ],
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
    });
  },
});
