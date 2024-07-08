"use client";
import { getWagmiConnector } from "@binance/w3w-wagmi-connector";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  WagmiConfig,
  configureChains,
  createConfig,
  useNetwork,
  useSwitchNetwork,
  useSendTransaction,
  useContractWrite,
  useBalance,
} from "wagmi";
import { parseGwei } from "viem";

import { publicProvider } from "wagmi/providers/public";
import { bsc, mainnet } from "wagmi/chains";
import { useEffect, useState } from "react";
import abi from "./abi.json";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, mainnet],
  [publicProvider()]
);

const Connector = getWagmiConnector();

const connector = new Connector({
  chains,
  options: {
    chainId: 56,
    rpc: { 56: "https://bsc-dataseed.binance.org/" },
    lng: "zh-CN",
  },
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function App() {
  return (
    <WagmiConfig config={config}>
      <Home />
    </WagmiConfig>
  );
}

function Home() {
  const { address, isConnected, connector: activateConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const bal = useBalance();
  console.log("🚀 ~~ Home ~~ bal:", bal);
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { connect } = useConnect({
    connector: connector,
    onSuccess: () => {
      console.log("🚀 ~ onSuccess");
    },
    onError(e) {
      console.log(e.toString());
    },
  });
  const { data, signMessage } = useSignMessage({
    message: "hello world",
  });
  const usdtAddress = "0x0000000000000000000100000000000000000002";

  const { write } = useContractWrite({
    address: usdtAddress,
    abi: abi,
    functionName: "approve",
    // gas: 50000000n,

    maxFeePerGas: parseGwei("35"),

    args: ["0x0000000000000000000100000000000000000002", "0x1"],
  });

  async function enable() {
    await connect();
    console.log("🚀 ~ enable");
  }
  const getChainId = async () => {
    const chainId = await activateConnector?.getChainId();

    alert(chainId);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isSuccess, sendTransaction } = useSendTransaction({
    to: address,
    value: BigInt(1),
  });

  return (
    <>
      <main
        style={{
          height: "100vh",
        }}
      >
        <section>
          <h2>wagmi connector</h2>
          <button onClick={enable}>enable</button>
          <button onClick={() => disconnect()}>disconnect</button>
          <button onClick={() => signMessage()}>signMessage</button>
          <button onClick={() => getChainId()}>getChainId</button>
          <button onClick={() => sendTransaction()}>sendTransaction</button>
          <button onClick={() => write()}>approve</button>
          <div>
            {isClient &&
              chains.map((x) => (
                <button
                  disabled={!switchNetwork || x.id === chain?.id}
                  key={x.id}
                  onClick={() => switchNetwork?.(x.id)}
                >
                  {x.name}
                  {isLoading && pendingChainId === x.id && " (switching)"}
                </button>
              ))}
          </div>
        </section>

        {isConnected && (
          <section>
            <h2>Account</h2>
            <p>{address}</p>
          </section>
        )}
        <div>chainId: {chain?.id}</div>
        {data && (
          <section>
            <h4>Sign Message Success</h4>
            <p style={{ width: "600px", wordWrap: "break-word" }}>{data}</p>
          </section>
        )}
      </main>
    </>
  );
}
