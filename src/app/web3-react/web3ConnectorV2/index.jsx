'use client';
import { getWeb3Connector } from "@binance/w3w-web3-connector-v2";
import { useEffect, useState } from "react";

import { URLS } from "./chains";

import { initializeConnector } from "@web3-react/core";
import { Card } from "./Card";

const Connector = getWeb3Connector();
const [binanceConnect, hooks] = initializeConnector(
  (actions) =>
    new Connector({
      actions,
      options: {
        rpc: URLS,
      },
    })
);

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function BinanceWeb3ConnectorV2() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  console.log("~~ provider:");

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState(undefined);

  // attempt to connect eagerly on mount
  useEffect(() => {
    binanceConnect?.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to walletconnect");
    });
  }, []);

  return (
    <Card
      connector={binanceConnect}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
  );
}
