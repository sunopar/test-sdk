import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
  WalletList,
} from "@rainbow-me/rainbowkit";
import {
  ledgerWallet,
  safeWallet,
  rabbyWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  imTokenWallet,
  zerionWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import binanceWallet from "@binance/w3w-rainbow-connector-v2";
import { WagmiProvider, createConfig, http } from "wagmi";
import { bsc, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const WALLET_CONNECT_PROJECT_ID = "de24cddbaf2a68f027eae30d9bb5df58";
const APP_NAME = "GMX";

const recommendedWalletList = [
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet,
      binanceWallet,
      safeWallet,
      rabbyWallet,
      metaMaskWallet,
      walletConnectWallet,
    ],
  },
];

const othersWalletList = [
  {
    groupName: "Others",
    wallets: [
      // binanceWallet({ projectId: WALLET_CONNECT_PROJECT_ID }),
      coinbaseWallet,
      okxWallet,
      ledgerWallet,
      rainbowWallet,
      zerionWallet,
      imTokenWallet,
    ],
  },
];

const connectors = connectorsForWallets(
  [...recommendedWalletList, ...othersWalletList],
  { projectId: WALLET_CONNECT_PROJECT_ID, appName: APP_NAME }
);

const config = createConfig({
  ssr: true,
  connectors,
  chains: [mainnet, sepolia, bsc],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RainbowProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
