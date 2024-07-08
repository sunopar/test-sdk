'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, createConfig, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import { bsc, mainnet, sepolia } from "wagmi/chains";
import { Home } from "./view";

const connector = getWagmiConnectorV2();

const config = createConfig({
  chains: [mainnet, sepolia, bsc],
  connectors: [injected(), connector()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    // [bsc.id]: http(),
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

export default WagmiV2