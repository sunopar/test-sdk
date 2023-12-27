"use client";
import React, { useEffect, useState } from "react";
import { init, useConnectWallet, useSetChain } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
// import trustModule from '@web3-onboard/trust'
import binanceModule from "@binance/w3w-blocknative-connector";
import { ethers } from "ethers";

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// Required for Transaction Notifications and Transaction Preview
const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";

const injected = injectedModule();

const binance = binanceModule({ options: { lng: "en" } });
// const trust = trustModule()

const infuraKey = "04f4aa615e744d0cbba82b25e7f8d76c";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// initialize Onboard
init({
  apiKey,
  wallets: [injected, binance],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl,
    },
    {
      id: "0x38",
      token: "BNB",
      label: "Binance Smart Chain Mainnet",
      rpcUrl,
    },
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
    {
      id: "0xa4ba",
      token: "ARB",
      label: "Arbitrum Nova",
      rpcUrl: "https://nova.arbitrum.io/rpc",
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
    },
  ],
});

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  console.log("🚀 ~~ App ~~ wallet:", wallet);
  const [{ chains, connectedChain }, setChain] = useSetChain();
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    if (wallet) {
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      setProvider(ethersProvider);
    }
  }, [wallet]);

  const signMessage = async () => {
    if (wallet) {
      const message = "Hello, world!";
      try {
        const signature = await provider?.getSigner().signMessage(message);
        console.log("Signature:", signature);
      } catch (error) {
        console.error("Error signing message:", error);
      }
    }
  };
  const sendTransaction = async () => {
    if (wallet && provider) {
      try {
        console.log(
          "🚀 ~~ sendTransaction ~~ wallet.accounts[0]:",
          wallet.accounts[0]
        );
        const signer = provider.getSigner();
        const transaction = {
          to: wallet.accounts[0].address, // Replace with the recipient's address
          value: ethers.utils.parseEther("0.01"), // Replace with the amount to send
        };
        console.log("🚀 ~~ sendTransaction ~~ transaction:", transaction);
        const response = await signer.sendTransaction(transaction);
        console.log("Transaction sent:", response);
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    }
  };

  return (
    <main style={{height: '100vh'}}>
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? "connecting" : wallet ? "disconnect" : "connect"}
      </button>
      <button onClick={() => setChain({ chainId: "0x38" })}>
        changeChainId
      </button>
      <button onClick={signMessage}>sign message</button>
      <button onClick={sendTransaction}>sendTransaction</button>
    </main>
  );
}

export default App;
