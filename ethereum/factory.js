/**
 * Arquivo .js contendo o contrato "LicitacaoFactory" na rede testnet Goerli apontado pela hash do endereço informado previamente
 */

import web3 from "./web3";
import LicitacaoFactory from "./build/LicitacaoFactory.json";

const contract = new web3.eth.Contract(
    LicitacaoFactory.abi,
    '0x162FEb34F57391b3Bb24247c0D841b36A699Ff0E'
);

export default contract;