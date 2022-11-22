/**
* deploy.js é utilizado apenas CASO o arquivo contendo os contratos inteligentes seja modificado e seja necessário refazer a compilação e o deploy
* Utilizado para enviar os contratos inteligentes para a rede testnet Goerli, utilizando infura com o cadastro feito previamente apenas para fins de teste
* ATENÇÃO: ao realizar um novo deploy, o endereço do novo contrato será retornado no console, e o mesmo deverá ser substituido no arquivo ./factory.js
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
 
const { abi, evm } = require('./build/LicitacaoFactory.json');
 
provider = new HDWalletProvider(
    'swing abandon burger world betray fall flee salon slow hood bar shock',
    'https://goerli.infura.io/v3/756076ed64b14936ac9aef53af019f95'
);
 
const web3 = new Web3(provider);
 
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] });
 
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
 
deploy();