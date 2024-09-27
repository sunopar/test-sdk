"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import { bsc, mainnet, sepolia } from "wagmi/chains";
import { Home } from "./view";

const connector = getWagmiConnectorV2();

const config = createConfig({
  chains: [mainnet, sepolia, bsc],
  autoConnect: false,
  connectors: [
    // metaMask(),
    connector(),
    // walletConnect({ projectId: "b7050ba88173d6dae540a3ba56dd333e" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
});
const queryClient = new QueryClient();

function WagmiV2() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WagmiV2;
