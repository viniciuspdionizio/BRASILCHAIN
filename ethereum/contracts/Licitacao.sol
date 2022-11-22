// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

// Estrutura para descrever cada item requerido na licitação
// Declarada fora da declaração dos contratos pois é utilizada pelos dois
struct Item {
    // Descrição do produto/servico
    string descricao;
    // Complemento da descrição
    string compl;
    // Quantidade
    uint16 quantidade;
}

// Declaração do contrato
contract LicitacaoFactory {
    // Todas as licitações abertas por esse contrato
    address[] public licitacoes;

    // Função para abrir uma nova licitação, informando os dados iniciais necessários
    function abrirLicitacao(uint dataEntregaPropostas,
                        uint dataAberturaPropostas,
                        string memory identificacao,
                        string memory processo,
                        Item memory item) public {
        Licitacao novaLicitacao = new Licitacao(msg.sender,
                                                dataEntregaPropostas,
                                                dataAberturaPropostas,
                                                identificacao,
                                                processo,
                                                item);
        licitacoes.push(address(novaLicitacao));
    }

    // Função para retornar os endereços de todas as licitações abertas por esse contrato
    function getAllLicitacoes() public view returns(address[] memory) {
        return licitacoes;
    }

    // Função para retornar de imediato a última licitação criada
    function getLastLicitacao() public view returns(address) {
        return licitacoes[licitacoes.length-1];
    }
}

// Declaração do contrato
contract Licitacao {
    struct Licitante {
        address endereco;
        uint valor;
    }

    // Propostas foram abertas
    bool public propostasAbertas;
    // Data de publicação
    uint public dataPublicacao;
    // Data de inicio de entrega das propostas
    uint public dataEntregaPropostas;
    // Data da abertura das propostas
    // Fechamento licitação
    uint public dataAberturaPropostas;
    // Orgão requerente da licitação
    address public orgao;
    // Número da licitação
    string public identificacao;
    // Número do processo
    string public processo;
    // Item requerido na licitação
    Item public item;
    // Array de licitantes que propuseram seus valores
    Licitante[] public licitantes;
    // Index do vencedor da licitação
    // Utilizado pela função vencedor()
    uint private vencedorIndex;

    // Construtor chamado ao criar o contrato
    // Dados necessarios informar ao criar: 
        // Orgão requerente, modalidade, número da licitação e quantidade de dias
    constructor(address _orgao,
                uint _dataEntregaPropostas,
                uint _dataAberturaPropostas,
                string memory _identificacao,
                string memory _processo,
                Item memory _item
                ) {
        orgao = _orgao;
        identificacao = _identificacao;
        processo = _processo;
        dataAberturaPropostas = _dataAberturaPropostas;
        dataEntregaPropostas = _dataEntregaPropostas;        
        item = _item;
        dataPublicacao = block.timestamp;
    }

    // Função para que os interessados possam fazer sua oferta
    // Parâmetros: _valor = Valor proposto
    function propor(uint _valor) public isAceitandoPropostas {
        Licitante storage lic = licitantes.push();
        lic.endereco = msg.sender;
        lic.valor = _valor;
        if (_valor < licitantes[vencedorIndex].valor) {
            vencedorIndex = licitantes.length - 1;
        }
    }

    // Função para encerrar a fase de propostas da licitacao e abrir
    function abrirPropostas() public isManager {
        require(dataAberturaPropostas < block.timestamp, "Data de abertura das propostas publicado ainda nao chegou");
        propostasAbertas = true;
    }

    // Função que retorna o vencedor com o preco mais baixo
    function vencedor() public view isFinished returns(Licitante memory) {
        require(licitantes.length != 0, "Nao ha nenhum licitante para esta licitacao");
        return licitantes[vencedorIndex];
    }

    // Função para obter todos os dados publicos da licitação de uma vez
    function getInfo() public view returns(uint, uint,
                                            uint, address,
                                            string memory, string memory,
                                            Item memory, uint, address) {
        return (dataPublicacao, dataEntregaPropostas,
                dataAberturaPropostas, orgao,
                identificacao, processo, item,
                licitantes.length, propostasAbertas ? vencedor().endereco : address(0));
    }
  
    // Modificadores que são feitos exigencias para o prosseguir com o código
    // São utilizados na declaração de uma função


    modifier isManager() {
        require(msg.sender == orgao, "Apenas o orgao requerente pode chamar essa funcao");
        _;
    }

    modifier hasNotStarted() {
        require(dataPublicacao == 0, "Licitacao ja foi publicada");
        _;
    }

    modifier isAceitandoPropostas {
        require(dataAberturaPropostas > block.timestamp
                && dataEntregaPropostas < block.timestamp
                && !propostasAbertas
                && dataPublicacao != 0, "Licitacao nao esta aceitando propostas");
        _;
    }

    // Verifica se a licitacao ja foi encerrada
    modifier isFinished {
        require(dataAberturaPropostas < block.timestamp || propostasAbertas, "Abertura das propostas ainda nao realizada");
        _;
    }

}
