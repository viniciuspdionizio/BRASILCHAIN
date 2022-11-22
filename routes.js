const routes = require("next-routes")();

routes.add('/licitacoes/new', '/licitacoes/new')
      .add('/licitacoes/:address', '/licitacoes/show');

module.exports = routes;
