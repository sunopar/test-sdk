import React from "react";
import { custom } from "viem";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";
import { injected } from "wagmi/connectors";

import { bsc, mainnet, sepolia } from "wagmi/chains";

import {
  useConnect,
  useDisconnect,
  useSignMessage,
  useBalance,
  createConfig,
  http,
  useAccount,
} from "wagmi";

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  );
}

const connector = getWagmiConnectorV2();

const transport = () => {
  if (typeof window !== "undefined" && window.ethereum.isBinance) {
    return custom({
      async request({ method, params }) {
        const response = await window.ethereum.request(method, params);
        console.log("🚀 ~~ custom ~~ response:", response);
        return response;
      },
    });
  }
  return http();
};
const config2 = createConfig({
  chains: [mainnet, sepolia, bsc],
  connectors: [injected(), connector()],
  transports: {
    [mainnet.id]: transport(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
});

const Connect2 = () => {
  const { connectors, connect } = useConnect({ config: config2 });
  const { address } = useAccount({ config: config2 });
  const { signMessage, data } = useSignMessage({ config: config2 });
  const { data: balance } = useBalance({
    address: address,
    config: config2,
  });

  return (
    <div>
      <h2>connect 2</h2>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
      <div>
        <button onClick={() => signMessage({ message: "world" })}>
          signMessage
        </button>
      </div>
      <div>address: {address}</div>
      <div>balance:{balance?.value}</div>
    </div>
  );
};
export function Home() {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessage, data } = useSignMessage();
  const { data: balance } = useBalance({
    address: "0xdD99011b53a914FA0832D7ea3D90e43D8835868E",
  });

  return (
    <main>
      <section>
        <h2>wagmi v2 connector</h2>
        <div>
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => connect({ connector })}
            />
          ))}
        </div>
        <button onClick={() => disconnect()}>disconnect</button>
        <button onClick={() => signMessage({ message: "hello" })}>
          signMessage
        </button>
        <div>balance: {balance?.formatted}</div>
        <div>address: {address}</div>
      </section>
      <Connect2 />
    </main>
  );
}
