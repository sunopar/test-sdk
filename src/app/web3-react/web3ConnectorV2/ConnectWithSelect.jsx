import { useCallback, useEffect, useState } from "react";
import { BinanceW3WWeb3ConnectorV2 } from "@binance/w3w-web3-connector-v2";

import { CHAINS, getAddChainParameters } from "./chains";

function ChainSelect({ activeChainId, switchChain, chainIds }) {
  return (
    <select
      value={activeChainId}
      onChange={(event) => {
        switchChain(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      <option hidden disabled>
        Select chain
      </option>
      <option value={-1}>Default</option>
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

export function ConnectWithSelect({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActivating,
  isActive,
  error,
  setError,
}) {
  const [desiredChainId, setDesiredChainId] = useState(undefined);

  /**
   * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
   * update the `desiredChainId` value so that <select /> has the right selection.
   */
  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
  }, [desiredChainId, activeChainId]);

  const switchChain = useCallback(
    async (desiredChainId) => {
      setDesiredChainId(desiredChainId);

      try {
        if (
          // If we're already connected to the desired chain, return
          desiredChainId === activeChainId ||
          // If they want to connect to the default chain and we're already connected, return
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined);
          return;
        }

        if (desiredChainId === -1) {
          await connector.activate();
        } else {
          await connector.activate(desiredChainId);
        }
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    },
    [connector, activeChainId, setError]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ChainSelect
        activeChainId={desiredChainId}
        switchChain={switchChain}
        chainIds={chainIds}
      />
      <div style={{ marginBottom: "1rem" }} />
      {isActive ? (
        error ? (
          <button onClick={() => switchChain(desiredChainId)}>
            Try again?
          </button>
        ) : (
          <button
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate();
              } else {
                void connector.resetState();
              }
              setDesiredChainId(undefined);
            }}
          >
            Disconnect
          </button>
        )
      ) : (
        <button
          onClick={() => switchChain(desiredChainId)}
          disabled={isActivating || !desiredChainId}
        >
          {error ? "Try again?" : "Connect"}
        </button>
      )}
    </div>
  );
}
