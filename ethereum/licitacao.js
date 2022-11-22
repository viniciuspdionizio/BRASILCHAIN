/**
 * Arquivo .js contendo o contrato "Licitacao" na rede testnet Goerli apontado pela hash do endereço que é informado como parâmetro
 */

import web3 from "./web3";
import Licitacao from "./build/Licitacao.json";


const licitacao = (address) => {
    return new web3.eth.Contract(Licitacao.abi, address);
};

export default licitacao;