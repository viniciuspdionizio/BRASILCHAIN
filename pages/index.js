import React, { Component } from 'react';
import { Container, Card, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';

class BrasilChainIndex extends Component {
    

    render() {
        return (
            <Layout>
                <Card fluid>
                    <Card.Content header='Vinicius de Paiva Dionizio' />
                    <Card.Content description='
                        Projeto cujo objetivo é servir como base de estudos da linguagem Solidity e a interação entre a rede blockchain de testes
                         (mais propriamente Goerli Ethereum) e um processo licitatório. 
                         Desenvolvido como parte prática e demonstrativa do trabalho de conclusão de curso do aluno Vinicius de Paiva Dionizio da Fundação Educacional do Município de Assis - FEMA.                      
                    ' />
                    <Card.Content>
                        Para mais informações acesse: <a href="https://github.com/viniciuspdionizio/brasilchain" target="_blank">github.com/viniciuspdionizio/brasilchain</a>
                    </Card.Content>
                    <Card.Content extra>
                        22 de Novembro de 2022
                    </Card.Content>
                </Card>
               
            </Layout>
        )
}
}

export default BrasilChainIndex;