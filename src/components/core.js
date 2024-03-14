"use client";
import { Core } from "@binance/w3w-core";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";

export function Client() {
  const [client, setClient] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [chainId, setChainId] = useState("0x0");
  const [sign, setSign] = useState("");

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
  const ethSignTypeData = async () => {
    const msgParams = JSON.stringify({
      domain: {
        // This defines the network, in this case, Mainnet.
        chainId: 1,
        // Give a user-friendly name to the specific contract you're signing for.
        name: "Ether Mail",
        // Add a verifying contract to make sure you're establishing contracts with the proper entity.
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        // This identifies the latest version.
        version: "1",
      },

      // This defines the message you're proposing the user to sign, is dapp-specific, and contains
      // anything you want. There are no required fields. Be as explicit as possible when building out
      // the message schema.
      message: {
        contents: "Hello, Bob!",
        attachedMoneyInEth: 4.2,
        from: {
          name: "Cow",
          wallets: [
            "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
          ],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
      },
      // This refers to the keys of the following types object.
      primaryType: "Mail",
      types: {
        // This refers to the domain the contract is hosted on.
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        // Not an EIP712Domain definition.
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
        // Refer to primaryType.
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
        ],
        // Not an EIP712Domain definition.
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
      },
    });

    const params = [accounts[0], msgParams];

    console.log(
      JSON.stringify({
        method: "eth_signTypedData",
        params: params,
        from: accounts[0],
      })
    );
    const rs = await client
      .request({
        method: "eth_signTypedData",
        params: params,
        from: accounts[0],
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: client.tsx ~ ethSignTypedData ~ error:",
          error.code,
          error.message
        );
      });
    setSign(rs);
  };

  const ethSignTypeData_v4 = async () => {
    // eth_signTypedData_v4 parameters. All of these parameters affect the resulting signature.
    const msgParams = JSON.stringify({
      domain: {
        // This defines the network, in this case, Mainnet.
        chainId: 1,
        // Give a user-friendly name to the specific contract you're signing for.
        name: "Ether Mail",
        // Add a verifying contract to make sure you're establishing contracts with the proper entity.
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        // This identifies the latest version.
        version: "1",
      },

      // This defines the message you're proposing the user to sign, is dapp-specific, and contains
      // anything you want. There are no required fields. Be as explicit as possible when building out
      // the message schema.
      message: {
        contents: "Hello, Bob!",
        attachedMoneyInEth: 4.2,
        from: {
          name: "Cow",
          wallets: [
            "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
          ],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
      },
      // This refers to the keys of the following types object.
      primaryType: "Mail",
      types: {
        // This refers to the domain the contract is hosted on.
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        // Not an EIP712Domain definition.
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
        // Refer to primaryType.
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
        ],
        // Not an EIP712Domain definition.
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
      },
    });

    const params = [accounts[0], msgParams];

    console.log(
      JSON.stringify({
        method: "eth_signTypedData_v4",
        params: params,
        from: accounts[0],
      })
    );
    const rs = await client
      .request({
        method: "eth_signTypedData",
        params: params,
        from: accounts[0],
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: client.tsx ~ ethSignTypedData ~ error:",
          error.code,
          error.message
        );
      });
    setSign(rs);
  };
  const ethSign = async () => {
    if (!client) return;

    const message = "hello";
    const encodedMessage = `0x${Buffer.from(message, "utf8").toString("hex")}`;

    const rs = await client
      .request({
        method: "eth_sign",
        params: [accounts[0], encodedMessage],
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: client.tsx ~ ethSign ~ error:",
          error.code,
          error.message
        );
      });
  };

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
    setSign(rs);
    console.log("🚀 ~~ file: client.tsx:45 ~~ personalSign ~~ rs:", rs);
  }, [client, accounts]);

  const sendTransaction = useCallback(async () => {
    if (!client) return;

    const payload = {
      from: accounts[0],
      to: accounts[0],
      value: "0x1",
      data: "0x",
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
          {/* <button onClick={ethSign}>ethSign</button> */}
          <button onClick={ethSignTypeData_v4}>ethSignTypeData_v4</button>
          <button onClick={ethSignTypeData}>ethSignTypeData</button>
          <button onClick={sendTransaction}>eth_sendtransaction</button>
          <button onClick={changeChainId}>changeChainId</button>
          <button onClick={openDeeplink}>open deep link</button>
        </section>
        {accounts}
        {sign && (
          <div>
            <h4>Sign Message Success</h4>
            <p style={{ width: "600px", wordWrap: "break-word" }}>{sign}</p>
          </div>
        )}
      </main>
    </>
  );
}
