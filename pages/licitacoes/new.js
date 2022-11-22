import React, { Component, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Form, Input, Item, Icon } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class NewLicitacao extends Component {
    state = {
        sending: false,
        dataEntrega: null,
        dataAbertura: null,
        identificacao: '',
        processo: '',
        item: [],
        newItemDescricao: '',
        newItemComplemento: '',
        newItemQuantidade: ''
    }
    
    static async getInitialProps() {
        return { };
    }


    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ sending: true });
        try{

            const accounts = await web3.eth.getAccounts();

            await factory.methods.abrirLicitacao(
                this.state.dataEntrega,
                this.state.dataAbertura,
                this.state.identificacao,
                this.state.processo,
                this.state.item
                ).send({
                    from: accounts[0]
                });

            const address = await factory.methods.getLastLicitacao().call();

            Router.pushRoute(`/licitacoes/${address}`);
        } catch(err) {
                console.error(err);
                alert(err);
        }
        this.setState({ sending: false });
    };

    reset = () => {
        this.setState({
            dataEntrega: null,
            dataAbertura: null,
            identificacao: '',
            processo: '',
            item: [],
            newItem: {
                descricao: '',
                complemento: '',
                quantidade: ''
            }
        });
        
        Router.pushRoute('/licitacoes');
    }



    render() {
        return (
            <Layout>
                <Card.Group centered>
                    <Card style={{ width: '40%' }}>
                        <Card.Content>
                            <Card.Header>NOVA LICITAÇÃO</Card.Header>
                            <Card.Meta>Formulário de criação de nova licitação</Card.Meta>
                            <Card.Description>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Field>
                                        <label>Data de entrega das propostas</label>
                                        <SemanticDatepicker placeholder="DD/MM/YYYY" locale="pt-BR" format="DD/MM/YYYY"
                                                            onChange={
                                                                    (event, data) => {
                                                                        const datetime = new Date(data.value);
                                                                        datetime.setHours(new Date().getHours());
                                                                        datetime.setMinutes(new Date().getMinutes());
                                                                        this.setState({
                                                                            dataEntrega: Math.floor(datetime.getTime() / 1000)
                                                                        }
                                                                        )
                                                                    }} />
                                        <br />
                                        { new Date(this.state.dataEntrega * 1000).toLocaleString() }
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Data de abertura das propostas</label>
                                        <SemanticDatepicker placeholder="DD/MM/YYYY" locale="pt-BR" format="DD/MM/YYYY"
                                                            onChange={
                                                                    (event, data) => {
                                                                        const datetime = new Date(data.value);
                                                                        datetime.setHours(new Date().getHours());
                                                                        datetime.setMinutes(new Date().getMinutes() + 5);
                                                                        this.setState({ dataAbertura: Math.floor(datetime.getTime() / 1000) })
                                                                    }
                                                                 } />
                                        <br />
                                        { new Date(this.state.dataAbertura * 1000).toLocaleString() }
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Número da licitação</label>
                                        <Input  placeholder='Número'
                                                value={this.state.identificacao}
                                                onChange={(event, data) => this.setState({ identificacao: data.value })} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Processo</label>
                                        <Input placeholder='Processo'
                                                value={this.state.processo}
                                                onChange={event => this.setState({ processo: event.target.value })} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Item</label>
                                        <Input
                                                placeholder="Descrição"
                                                value={this.state.item[0]}
                                                onChange={(event, data) => this.setState(state => state.item[0] = data.value)} />
                                        <Input
                                                placeholder="Complemento"
                                                value={this.state.item[1]}
                                                onChange={(event, data) => this.setState(state => state.item[1] = data.value)} />
                                        <Input
                                                placeholder="Quantidade"
                                                value={this.state.item[2]}
                                                onChange={(event, data) => this.setState(state => state.item[2] = data.value )} />
                                    </Form.Field>
                                    <div style={{ float: 'right' }}>
                                        <Button type="reset" onClick={this.reset} secondary>Cancelar</Button>
                                        <Button type="submit" loading={this.state.sending} primary>Publicar</Button>
                                    </div>
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card style={{width: '40%' }}>
                        <Card.Content>
                            <Card.Header>Licitação nº {this.state.identificacao}</Card.Header>
                        </Card.Content>
                        <Card.Description>
                            <Item.Group divided>
                                <Item>
                                    <Item.Content verticalAlign='middle'>Processo: {this.state.processo}</Item.Content>
                                </Item>
                                <Item>
                                    <Item.Content verticalAlign='middle'>Data de entrega das propostas: {this.state.dataEntrega}</Item.Content>
                                </Item>
                                <Item>
                                    <Item.Content verticalAlign='middle'>Data de abertura das propostas: {this.state.dataAbertura}</Item.Content>
                                </Item>
                                <Item>
                                    <Item.Content verticalAlign='middle'>
                                        <Card>
                                            <Card.Header>{this.state.item[0]}</Card.Header>
                                            <Card.Meta>{this.state.item[1]}</Card.Meta>
                                            <Card.Content>{this.state.item[2]}</Card.Content>
                                        </Card>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Card.Description>
                    </Card>
                </Card.Group>
                <Card centered style={{ width: "82%" }}>
                    <Card.Content>
                        <Card.Header>Status</Card.Header>
                        <Card.Description>{this.state.sending ? 'Enviando...' : 'Parado'}</Card.Description>
                    </Card.Content>
                </Card>
            </Layout>
        )
}
}

export default NewLicitacao;