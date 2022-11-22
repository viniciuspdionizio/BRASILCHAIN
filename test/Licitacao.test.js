const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider({ gasLimit: '10000000' }));

const compiledFactory = require('../ethereum/build/LicitacaoFactory.json');
const compiledLicitacao = require('../ethereum/build/Licitacao.json');

let accounts;
let factory;
let address;
let licitacao;

before(async() => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '10000000' });

    const dataEntregaPropostas = Math.trunc((Date.now() - 60000) / 1000);
    const dataAberturaPropostas = Math.trunc(new Date((dataEntregaPropostas + 80)).getTime());
    const identificacao = '000';
    const processo = '102';
    const item = ["Vinicius", "Objeto: omaomsaom", "1"];
    await factory.methods.abrirLicitacao(dataEntregaPropostas,
                                        dataAberturaPropostas,
                                        identificacao,
                                        processo,
                                        item).send({
                                                from: accounts[0],
                                                gas: '10000000'
                                            });
    address = await factory.methods.getLastLicitacao().call();
    licitacao = new web3.eth.Contract(compiledLicitacao.abi,
        address
    );
});

afterEach(async () => {
   await new Promise(resolve => setTimeout(resolve, 10000));
   console.log("----------------------");
});

describe('Licitacoes', () => {
    it('deploys factory and licitacao', () => {
        assert.ok(factory.options.address);
        assert.ok(licitacao.options.address);
    });

    it('faz uma proposta com a conta 2 e uma com a conta 3', async () => {
        await licitacao.methods.propor(20).send({ from: accounts[1], gas: 10000000 });
        await licitacao.methods.propor(15).send({ from: accounts[2], gas: 10000000 });
        const result = await licitacao.methods.getInfo().call();
        assert.equal(result[7], 2);
    });

    it('realiza abertura propostas', async () => {
        await licitacao.methods.abrirPropostas().send({ from: accounts[0], gas: 1000000 });
        const result = await licitacao.methods.propostasAbertas().call();
        assert.ok(result);
    });

    it('Mostra info', async () => {
        const info = await licitacao.methods.getInfo().call();
        console.log("Contas:", accounts);
        console.log("Endereço Fact:", factory.options.address);
        console.log("Endereço Lic:", licitacao.options.address);
        console.log("Info:", info);
        assert.ok(info);
    });



});