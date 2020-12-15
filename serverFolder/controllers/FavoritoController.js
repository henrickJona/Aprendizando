const Favorito = require("../models/Favorito");
const Contratante = require("../models/Contratante");
const Instituicao = require("../models/Instituicao");
module.exports = {
  async adicionarFavorito(req, res) {
    console.log("JONNONON");
    const { instituicaoId, contratanteId } = req.params;
    console.log(instituicaoId, contratanteId);
    const contratante = await Contratante.findByPk(contratanteId);

    if (!contratante) {
      return res.status(400).json({ error: "usuario não encontrado!" });
    }
    const [favorito, created] = await Favorito.findOrCreate({
      where: {
        fk_instituicao_id: instituicaoId,
        fk_contratante_id: contratanteId,
      },
      defaults: {
        fk_instituicao_id: instituicaoId,
        fk_contratante_id: contratanteId,
      },
    });

    return res.json([favorito, created]);
  },
  async MostrarTodosPorContratante(req, res) {
    console.log("entrou");
    const { contratanteId } = req.params;
    const contratante = await Contratante.findByPk(contratanteId, {
      include: { association: "favoritos" },
    });
    /* const anuncio = await Anuncio.findAll({
      where: {
        ativo: true,
        fk_instituicao_id: id,
      },
    }); */
    if (!contratante) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(contratante);
  },
  async MostrarTodosPorInstituicao(req, res) {
    console.log("entrou");
    const { instituicaoId } = req.params;
    const instituicao = await Instituicao.findByPk(instituicaoId, {
      include: { association: "favoritos" },
    });
    /* const anuncio = await Anuncio.findAll({
      where: {
        ativo: true,
        fk_instituicao_id: id,
      },
    }); */
    if (!instituicao) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(instituicao);
  },
  async deletar(req, res) {
    const { id } = req.params;
    const favoritos = await Favorito.destroy({
      where: {
        id: id,
      },
    });
    if (!favoritos) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(favoritos);
  },
};
