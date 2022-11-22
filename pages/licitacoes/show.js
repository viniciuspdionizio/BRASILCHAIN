import React, { Component } from "react";
import { Button, Card, Container, Dimmer, Icon, Input, Label, Loader, Modal } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Licitacao from "../../ethereum/licitacao";
import web3 from "../../ethereum/web3";

class LicitacaoShow extends Component {
  state = { proposta: '', propostas: '0', vencedor: '', sending: false };

  static async getInitialProps(props) {
    const contrato = Licitacao(props.query.address);
    const result = await contrato.methods.getInfo().call();
    const licitacao = {
      dataPublicacao: result[0] * 1000,
      dataEntregaPropostas: result[1] * 1000,
      dataAberturaPropostas: result[2] * 1000,
      orgao: result[3],
      identificacao: result[4],
      processo: result[5],
      item: result[6],
      propostas: result[7],
      vencedor: result[8],
      address: props.query.address
    }
    
    return { licitacao };
  }

  componentDidMount() {
    this.setState({ propostas: this.props.licitacao.propostas, vencedor: this.props.licitacao.vencedor });
  }

  propor = async () => {
    this.setState({ sending: true });

    try{
      const accounts = await web3.eth.getAccounts();
      
      const contrato = Licitacao(this.props.licitacao.address);
      console.log(`Enviando proposta de ${this.state.proposta} da conta ${accounts[0]}`);
      await contrato.methods.propor(this.state.proposta).send({ from: accounts[0] });
      
      this.setState({ proposta: '' });
      const result = await contrato.methods.getInfo().call();
      this.setState({ propostas: result[7] });
    } catch(err) {
      alert(err);
      console.error(err);
    }

    this.setState({ sending: false });
  }


  obterVencedor = async () => {
    this.setState({ sending: true });

    try {

      const accounts = await web3.eth.getAccounts();
      
      const contrato = Licitacao(this.props.licitacao.address);
      await contrato.methods.abrirPropostas().send({ from: accounts[0] });
      const vencedor = await contrato.methods.vencedor().call();
      
      this.setState({ vencedor });
    } catch(err) {
      console.error(err);
    }
    this.setState({ sending: false });
  }


  render() {
        return (
            <Layout>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Licitação nº {this.props.licitacao.identificacao}</Card.Header>
                        <Card.Meta>Publicado em: {new Date(this.props.licitacao.dataPublicacao).toLocaleString()}</Card.Meta>
                        <Card.Meta>Entrega das propostas: {new Date(this.props.licitacao.dataEntregaPropostas).toLocaleString()}</Card.Meta>
                        <Card.Meta>Abertura das propostas: {new Date(this.props.licitacao.dataAberturaPropostas).toLocaleString()}</Card.Meta>
                        <Card.Description>
                          Orgão solicitante: {this.props.licitacao.orgao}
                          <br />
                          Processo: {this.props.licitacao.processo}
                          <br />
                          Item:
                          <Card>
                            <Card.Header>{this.props.licitacao.item[0]}</Card.Header>
                            <Card.Meta>{this.props.licitacao.item[1]}</Card.Meta>
                            <Card.Description>{this.props.licitacao.item[2]}</Card.Description>
                          </Card>
                          <br />
                          Vencedor: {this.state.vencedor}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Label>
                        {this.state.propostas} Proposta(s)
                      </Label>
                      <Input 
                        style={{ float: "right" }}
                        placeholder="Proposta"
                        value={this.state.proposta}
                        onChange={(event, data) => this.setState({ proposta: data.value})} 
                        action={
                          { icon: 'share',
                            onClick: this.propor
                          }
                        }/>
                    </Card.Content>
                    <Card.Content extra>
                      <Button style={{width: "100%"}}
                              onClick={this.obterVencedor}>Obter vencedor</Button>
                    </Card.Content>
                </Card>

                <Dimmer active={this.state.sending}>
                  <Loader indeterminate>Enviando...</Loader>
                </Dimmer>
            </Layout>
        );
    }


}

export default LicitacaoShow;