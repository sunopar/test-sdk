const ETH = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

const CELO = {
  name: "Celo",
  symbol: "CELO",
  decimals: 18,
};

function isExtendedChainInformation(chainInformation) {
  return !!chainInformation.nativeCurrency;
}

export function getAddChainParameters(chainId) {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

const getInfuraUrlFor = (network) =>
  process.env.infuraKey
    ? `https://${network}.infura.io/v3/${process.env.infuraKey}`
    : undefined;
const getAlchemyUrlFor = (network) =>
  process.env.alchemyKey
    ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}`
    : undefined;

export const MAINNET_CHAINS = {
  1: {
    urls: [
      getInfuraUrlFor("mainnet"),
      getAlchemyUrlFor("eth-mainnet"),
      "https://cloudflare-eth.com",
    ].filter(Boolean),
    name: "Mainnet",
  },
  56: {
    urls: [
      getInfuraUrlFor("bsc-mainnet"),
      "https://bsc-dataseed.binance.org",
    ].filter(Boolean),
    name: "Binance Smart Chain Mainnet",
  },
  10: {
    urls: [
      getInfuraUrlFor("optimism-mainnet"),
      "https://mainnet.optimism.io",
    ].filter(Boolean),
    name: "Optimism",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  42161: {
    urls: [
      getInfuraUrlFor("arbitrum-mainnet"),
      "https://arb1.arbitrum.io/rpc",
    ].filter(Boolean),
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  137: {
    urls: [
      getInfuraUrlFor("polygon-mainnet"),
      "https://polygon-rpc.com",
    ].filter(Boolean),
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  42220: {
    urls: ["https://forno.celo.org"],
    name: "Celo",
    nativeCurrency: CELO,
    blockExplorerUrls: ["https://explorer.celo.org"],
  },
};

export const TESTNET_CHAINS = {
  5: {
    urls: [getInfuraUrlFor("goerli")].filter(Boolean),
    name: "Görli",
  },
  420: {
    urls: [
      getInfuraUrlFor("optimism-goerli"),
      "https://goerli.optimism.io",
    ].filter(Boolean),
    name: "Optimism Goerli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://goerli-explorer.optimism.io"],
  },
  421613: {
    urls: [
      getInfuraUrlFor("arbitrum-goerli"),
      "https://goerli-rollup.arbitrum.io/rpc",
    ].filter(Boolean),
    name: "Arbitrum Goerli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  80001: {
    urls: [getInfuraUrlFor("polygon-mumbai")].filter(Boolean),
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  44787: {
    urls: ["https://alfajores-forno.celo-testnet.org"],
    name: "Celo Alfajores",
    nativeCurrency: CELO,
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org"],
  },
};

export const CHAINS = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS = Object.keys(CHAINS).reduce((accumulator, chainId) => {
  const validURLs = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
