const Anuncio =  require("../models/Anuncio");
const Contratante = require("../models/Contratante");
const Confirmado = require("../models/Confirmado");
module.exports = {
  async adicionarConfirmado(req, res) {
    console.log("JONNONON");
    const { anuncioId, ministranteId,aprendizId } = req.params;
 
    const aprendiz = await Contratante.findByPk(aprendizId);
    const ministrante = await Contratante.findByPk(ministranteId);
    if (!aprendiz || !ministrante) {
      return res.status(400).json({ error: "usuario não encontrado!" });
    }
    const confirmado = await Confirmado.create({
        fk_ministrante_id:ministranteId,
        fk_aprendiz_id:aprendizId,
        fk_anuncio_id:anuncioId
    })
    return res.json(confirmado);
  },
  async MostrarTodosPorMinistrante(req, res) {
    console.log("entrou");
    const { ministranteId } = req.params;
    const contratante = await Contratante.findByPk(ministranteId, {
      include: { association: "ministrante" },
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
  async MostrarTodosPorAprendiz(req, res) {
    console.log("entrou");
    const { aprendizId } = req.params;
    const contratante = await Contratante.findByPk(aprendizId, {
      include: { association: "aprendiz" },
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
  async mostrarPorId(req, res) {
    const { idConfirmado } = req.params;
    const confirmado = await Confirmado.findOne({
      where: {
        id: idConfirmado,
      },
    });
    if (!confirmado) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(confirmado);
  },
};
