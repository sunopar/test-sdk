import { formatEther } from "@ethersproject/units";
import { useEffect, useState } from "react";

function useBalances(provider, accounts) {
  const [balances, setBalances] = useState();

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;

      void Promise.all(
        accounts.map((account) => provider.getBalance(account))
      ).then((balances) => {
        if (stale) return;
        setBalances(balances);
      });

      return () => {
        stale = true;
        setBalances(undefined);
      };
    }
  }, [provider, accounts]);

  return balances;
}

export function Accounts({ accounts, provider, ENSNames }) {
  const balances = useBalances(provider, accounts);

  if (accounts === undefined) return null;

  return (
    <div>
      Accounts:{" "}
      <b>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <ul
                key={account}
                style={{
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {ENSNames?.[i] ?? account}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </ul>
            ))}
      </b>
    </div>
  );
}
