const express = require("express");
const routes = express.Router();
const AutonomoController = require("./controllers/AutonomoController");
const AnuncioController = require("./controllers/AnuncioController");
const InstituicaoController = require("./controllers/InstituicaoController");
const CursoController = require("./controllers/CursoController");
const ContratanteController = require("./controllers/ContratanteController");
const LocalizacaoController = require("./controllers/LocalizacaoController");
const CategoriaController = require("./controllers/CategoriaController");
const FavoritoController = require("./controllers/FavoritoController");
const InteressadoController = require("./controllers/InteressadoController");
const authMidddleware = require("../middleware/auth");
const ConfirmadoController = require("./controllers/ConfirmadoController")
const MensagemController = require("./controllers/MensagemController")
//mensagem
routes.post("/mensagem",MensagemController.adicionarMensagem)
routes.get("/confirmado/:idConfirmado/mensagem",MensagemController.MostrarPorConfirmado)
//confirmado
routes.post("/anuncio/:anuncioId/ministrante/:ministranteId/aprendiz/:aprendizId/confirmado",ConfirmadoController.adicionarConfirmado)
routes.get("/ministrante/:ministranteId",ConfirmadoController.MostrarTodosPorMinistrante)
routes.get("/aprendiz/:aprendizId",ConfirmadoController.MostrarTodosPorAprendiz)
routes.get("/confirmado/:idConfirmado",ConfirmadoController.mostrarPorId)
//anuncio
routes.put("/anuncio/:id",AnuncioController.setarInativo)


routes.post("/instituicao", InstituicaoController.adicionarInstituicao);
routes.get("/instituicao", InstituicaoController.MostrarTodos);
routes.get("/instituicao/:nome", InstituicaoController.MostrarUm);
routes.post("/instituicao/:id/curso", CursoController.adicionarCurso);
routes.post(
  "/instituicao/:instituicaoId/contratante/:contratanteId/favorito",
  FavoritoController.adicionarFavorito
);
routes.delete("/favorito/:id", FavoritoController.deletar);
routes.get(
  "/contratante/:contratanteId/favorito",
  FavoritoController.MostrarTodosPorContratante
);

routes.get(
  "/instituicaok/:instituicaoId/favorito",
  FavoritoController.MostrarTodosPorInstituicao
);
routes.get("/instituicao/:id/curso", CursoController.MostrarTodos);
routes.post(
  "/instituicao/:instituicaoId/contratante/:contratanteId/anuncio",
  AnuncioController.adicionarAnuncio
);
routes.post(
  "/contratante/:contratanteId/anuncio/:anuncioId/interessado",
  InteressadoController.adicionarInteressado
);
routes.get(
  "/contratante/:contratanteId/anuncio/:anuncioId/interessado",
  InteressadoController.confirmarInteressado
);
routes.get(
  "/anuncio/:anuncioId/interessado",
  InteressadoController.MostrarTodosPorAnuncio
);
routes.get(
  "/contratante/:contratanteId/interessado",
  InteressadoController.MostrarTodosPorContratante
);
routes.delete(
  "/contratante/:contratanteId/anuncio/:anuncioId/interessado",
  InteressadoController.deletar
);
routes.delete(
  "/anuncio/:anuncioId/interessado",
  InteressadoController.deletarPorAnuncio
);
routes.get(
  "/instituicao/:instituicaoId/anuncio",
  AnuncioController.MostrarTodosPorInstituicao
);
routes.get(
  "/contratante/:contratanteId/anuncio",
  AnuncioController.MostrarTodosPorContratante
);
routes.get("/anuncio/:id", AnuncioController.MostrarPorId);
routes.get(
  "/contratante/:identificador",
  ContratanteController.mostrarContratante
);

routes.post("/contratante/", ContratanteController.storeRegister);
/* routes.put("/contratante/:id", ContratanteController.storeNumber);
routes.get("/contratante/:id", ContratanteController.getOne); */
routes.post("/categoria", CategoriaController.adicionarCategoria);
routes.get("/categoria", CategoriaController.MostrarTodos);
/* routes.post("/contratante/:id/anuncio", AnuncioController.adicionarAnuncio);
routes.get("/contratante/:id/anuncio", AnuncioController.MostrarTodos);
routes.post(
  "/contratante/:id/anuncio/:id/localizacao",
  LocalizacaoController.adicionarLocalizacao
); */

module.exports = routes;
