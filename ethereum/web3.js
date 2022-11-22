/**
 * Utilização da lib web3
 */

import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Sendo executado no navegador E MetaMask está rodando.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // Sendo executado no servidor OU Metamask não está rodando
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/756076ed64b14936ac9aef53af019f95"
  );
  web3 = new Web3(provider);
}
 
export default web3;