import React from "react";
import {
  Connector,
  useConnect,
  useDisconnect,
  useSignMessage,
  useBalance,
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

export function Home() {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessage, data } = useSignMessage();
  const { data: balance } = useBalance({
    address: "0xdD99011b53a914FA0832D7ea3D90e43D8835868E",
  });

  console.log("🚀 ~~ Home ~~ balance:", balance);
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
        <button onClick={() => signMessage()}>signMessage</button>
        <div>balance: {balance?.formatted}</div>
      </section>
    </main>
  );
}
