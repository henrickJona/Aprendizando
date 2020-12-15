const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const connection = new Sequelize(dbConfig);
const Confirmado = require("../models/Confirmado");
const Favorito = require("../models/Favorito");
const Categoria = require("../models/Categoria");
const Instituicao = require("../models/Instituicao");
const Curso = require("../models/Curso");
const Autonomo = require("../models/Autonomo");
const Contratante = require("../models/Contratante");
const Anuncio = require("../models/Anuncio");
const Qualificacao = require("../models/Qualificacao");
const Localizacao = require("../models/Localizacao");
const Interessado = require("../models/Interessado");
const TermoCompromisso = require("../models/TermoCompromisso");
const HistoricoAutonomo = require("../models/HistoricoAutonomo");
const HistoricoContratante = require("../models/HistoricoContratante");
const Mensagem = require("../models/Mensagem")
//init
Mensagem.init(connection)
Interessado.init(connection);
Confirmado.init(connection)
Favorito.init(connection);
Instituicao.init(connection);
Curso.init(connection);
Contratante.init(connection);
Anuncio.init(connection);
Autonomo.init(connection);
Categoria.init(connection);
Qualificacao.init(connection);
Localizacao.init(connection);
TermoCompromisso.init(connection);
HistoricoAutonomo.init(connection);
HistoricoContratante.init(connection);
//asssociate
Localizacao.associate(connection.models);
Confirmado.associate(connection.models)
Instituicao.associate(connection.models);
Curso.associate(connection.models);
Favorito.associate(connection.models);
Contratante.associate(connection.models);
Anuncio.associate(connection.models);
Interessado.associate(connection.models);
Qualificacao.associate(connection.models);
TermoCompromisso.associate(connection.models);
HistoricoAutonomo.associate(connection.models);
HistoricoContratante.associate(connection.models);
module.exports = connection;
