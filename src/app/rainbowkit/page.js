"use client";
import "@rainbow-me/rainbowkit/styles.css";

import styles from "@/styles/Home.module.css";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import RainbowProvider from "@/components/rainbowProviderV2";

export default function App() {
  return (
    <RainbowProvider>
      <RainbowKit />
    </RainbowProvider>
  );
}

function RainbowKit() {
  const { address, isConnected, connector: activateConnector } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <main className={styles.main}>
        <section>
          <h2>Rainbow V2</h2>
          <ConnectButton />
          <div>
            <p>Address: {address}</p>
            <p>Connected: {isConnected ? "Yes" : "No"}</p>
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>
        </section>
      </main>
    </>
  );
}
