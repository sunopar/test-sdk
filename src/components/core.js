"use client";
import { Core } from "@binance/w3w-core";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";

export function Client() {
  const [client, setClient] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [chainId, setChainId] = useState("0x0");

  const connect = useCallback(async () => {
    const client = new Core();
    try {
      const rs = await client.connect({ lng: "zh-CN" });
      setClient(client);
      setChainId(rs.chainId);
      setAccounts(rs.accounts);
    } catch (error) {
      console.log(
        "🚀 ~ file: client.tsx:19 ~ connect ~ error:",
        error.code,
        error.message,
        client.pending
      );
    }
  }, []);

  const personalSign = useCallback(async () => {
    if (!client) return;

    const msg = `0x${Buffer.from("hello", "utf8").toString("hex")}`;

    const rs = await client
      .request({
        method: "personal_sign",
        params: [msg, accounts[0]],
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: client.tsx:34 ~ personalSign ~ error:",
          error.code,
          error.message
        );
      });
    console.log("🚀 ~~ file: client.tsx:45 ~~ personalSign ~~ rs:", rs);
  }, [client, accounts]);

  const sendTransaction = useCallback(async () => {
    if (!client) return;

    const payload = {
      from: accounts[0],
      to: accounts[0],
      value: "0x1",
      data: "0x00",
    };
    const res = await client.request({
      method: "eth_sendTransaction",
      params: [payload],
    });
    console.log("🚀 ~~ file: client.tsx:62 ~~ sendTransaction ~~ res:", res);
    alert("success");
  }, [client, accounts]);

  const disconnect = useCallback(() => {
    if (!client) return;

    client.killSession();
  }, [client]);

  useEffect(() => {
    if (!client) return;

    client.on("accountsChanged", (acc) => {
      setAccounts(acc);
    });
    client.on("chainChanged", (chainId) => {
      setChainId(chainId);
    });
    client.on("disconnect", () => {
      setClient(null);
      setChainId("0x0");
      setAccounts([]);
    });
  }, [client]);
  const changeChainId = () => {
    client?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  };

  const openDeeplink = () => {
    const link = document.createElement("a");
    link.href =
      "https://app.binance.com/?_dp=L21wL2FwcD9hcHBJZD14b3FYeFVTTVJjY0xDclpOUmVibXpqJnN0YXJ0UGFnZVBhdGg9TDNCaFoyVnpMMlJoYzJoaWIyRnlaQzF1WlhjdmFXNWtaWGc9JnN0YXJ0UGFnZVF1ZXJ5PWQyTTlkMk1sTTBGaE16Sm1PV0UwWW1Ga05HUXlPV05tTW1Fd01tRTFNbVV5TmpZNVpUSmhZak5sTURGbVptUXpOalptTkRCa09UaGxZV00zTXpjeVpUbGhaVGszWVRSa0pUUXdNaVV6Um5KbGJHRjVMWEJ5YjNSdlkyOXNKVE5FYVhKdUpUSTJjM2x0UzJWNUpUTkVOMkZrTVdFM09EYzNOakZpTVdFMU5ESmxNR05sTVRrM016WTNZemczWmpjM1lUaGtZV1ZqTjJReU1qZzRZelZsTTJabE5tRTFOR0kxWXpWak5qTTVOQ1pwYzBSbFpYQk1hVzVyUFhSeWRXVW1hV1E5TVRjd01UTTNNRFUxTURBek5R";
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.click();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <h2>core-client</h2>
          <p>Accounts: {accounts}</p>
          <p>ChainId: {chainId}</p>
          <button onClick={connect}>enable</button>
          <button onClick={disconnect}>disconnect</button>
          <button onClick={personalSign}>personal_sign</button>
          <button onClick={sendTransaction}>eth_sendtransaction</button>
          <button onClick={changeChainId}>changeChainId</button>
          <button onClick={openDeeplink}>open deep link</button>
        </section>
        {accounts}
      </main>
    </>
  );
}
