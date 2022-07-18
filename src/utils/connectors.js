import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,56]
});



const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/5de8ffe70f7142f89f4d31955124a4b1`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/5de8ffe70f7142f89f4d31955124a4b1`,
  appName: "web3-react-demo"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
