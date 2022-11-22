## BrasilChain
## Descrição do projeto
![Em Desenvolvimento](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellowgreen "Em Desenvolvimento") ![Contributors](https://img.shields.io/github/contributors/viniciuspdionizio/brasilchain "Contributors")
Projeto cujo objetivo é servir como base de estudos da linguagem Solidity e a interação entre a rede blockchain de testes (mais propriamente Goerli Ethereum) e um processo licitatório, desenvolvido como parte prática e demonstrativa do trabalho de conclusão de curso do aluno Vinicius de Paiva Dionizio da Fundação Educacional do Município de Assis - FEMA.
<p align="center">
<img src="https://www.fema.edu.br/images/logo.png" />
</p>



## Detalhes
- Compilação manual dos contratos
- Deploy na rede Goerli de forma manual
  - Utilizando [Infura](http://infura.io "Infura"), chave já criada e mantida nos arquivos .js do projeto
- Processo básico de uma licitação, em modalidade *Pregão* 
  - Escolha do vencedor do pregão é dado pelo menor valor proposto
  
## Aplicação
![licitacao_app](https://user-images.githubusercontent.com/72163780/203235479-1db6b1be-b03d-40fe-a99f-63493b0aaccd.png)

## Código
O código fonte está com comentários explicando a função de cada arquivo em que os contratos são utilizados.
`compile.js`
`deploy.js`
`web3.js`
`LicitacaoFactory.js`
`Licitacao.js`
Os demais foram utilizados para a interface e utilização do contrato, desenvolvida em React com o framework Semantic UI

## Técnicas e tecnologias utilizadas

[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png" width="40" /><br><sub>VS Code</sub>](https://code.visualstudio.com/)
<br>
[<img src="https://remix.ethereum.org/assets/img/remix_logo_light.webp" width="40" /><br /><sub>Remix IDE</sub>](https://remix.ethereum.org/)
<br>
[<img src="https://nodejs.org/static/images/logo.svg" width="50" style="background-color: #cdcdcd"/><br /><sub>Node.js</sub>](https://nodejs.org/)
<br>
[<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" width="40" /><br /><sub>React</sub>](https://pt-br.reactjs.org/)
<br>
[<img src="https://react.semantic-ui.com/logo.png" width="40" /><br /><sub>Semantic UI</sub>](https://react.semantic-ui.com/)
<br>
[<img src="https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png" width="40" /><br /><sub>Next.js</sub>](https://nextjs.org/)
<br>
[<img src="https://trufflesuite.com/assets/logo.png" width="40"/><br /><sub>Truffle</sub>](https://trufflesuite.com/)
<br>
[<img src="https://portfolio.metamask.io/static/js/../../static/media/metamask-fox.7db94670ec6dc4d4c6c9e18af96281d8.svg" width="40" /><br /><sub>MetaMask</sub>](https://metamask.io/)



## Modo de usar
Após instalar o projeto usando `npm install`, execute `npm run dev` e aguarde a confirmação de "Pronto", após isso é só abrir no navegador o endereço localhost:3000 para começar a visualizar.

### Interface
**Em /licitacoes:**
Visualiza todas as licitações criadas pela LicitacaoFactory em vigência.

**/licitacoes/new:**
Cria uma nova licitação

**/licitacoes/`<hash_endereço>`**
Visualiza uma licitação específica de acordo com o endereço informado.

## Autores
[<img src="https://avatars.githubusercontent.com/u/72163780?v=4" width=115><br><sub>Vinicius de Paiva Dionizio</sub>](https://github.com/viniciuspdionizio)
