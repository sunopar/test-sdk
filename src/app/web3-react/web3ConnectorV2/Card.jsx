import { Accounts } from "./Accounts";
import { Chain } from "./Chain";
import { ConnectWithSelect } from "./ConnectWithSelect";
import { Status } from "./Status";

export function Card({
  connector,
  activeChainId,
  chainIds,
  isActivating,
  isActive,
  error,
  setError,
  ENSNames,
  accounts,
  provider,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "20rem",
        padding: "1rem",
        margin: "1rem",
        overflow: "auto",
        border: "1px solid",
        borderRadius: "1rem",
      }}
    >
      <b>binance web3 connector v2</b>
      <div style={{ marginBottom: "1rem" }}>
        <Status isActivating={isActivating} isActive={isActive} error={error} />
      </div>
      <Chain chainId={activeChainId} />
      <div style={{ marginBottom: "1rem" }}>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        chainIds={chainIds}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      />
    </div>
  );
}
