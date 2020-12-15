const Anuncio = require("../models/Anuncio");
const Contratante = require("../models/Contratante");
const Instituicao = require("../models/Instituicao");
module.exports = {
  async adicionarAnuncio(req, res) {
    console.log("JONNONON");
    const { instituicaoId, contratanteId } = req.params;
    const { titulo, descricao, investimento } = req.body;

    const contratante = await Contratante.findByPk(contratanteId);

    if (!contratante) {
      return res.status(400).json({ error: "usuario não encontrado!" });
    }
    const anuncio = await Anuncio.create({
      titulo,
      descricao,
      investimento,

      ativo: 1,
      fk_instituicao_id: instituicaoId,
      fk_contratante_id: contratanteId,
    });
    return res.json(anuncio);
  },
  async MostrarTodosPorInstituicao(req, res) {
    const { instituicaoId } = req.params;
    const instituicao = await Instituicao.findByPk(instituicaoId, {
      include: [{ required:false,association: "anuncios",where:{ativo:true} }],
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
  async MostrarTodosPorContratante(req, res) {
    const { contratanteId } = req.params;

    const anuncio = await Contratante.findByPk(contratanteId, {
      include: [{ required:false,association: "anuncios",where:{ativo:true} }],
    });
    /* const anuncio = await Anuncio.findAll({
      where: {
        ativo: true,
        fk_instituicao_id: id,
      },
    }); */
    if (!anuncio) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(anuncio);
  },
  async MostrarTodosGlobal(req, res) {
    const anuncio = await Anuncio.findAll({
      where: {
        ativo: true,
      },
    });
    if (!anuncio) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(anuncio);
  },
  async MostrarPorId(req, res) {
    const { id } = req.params;
    const anuncio = await Anuncio.findOne({
      where: {
        id: id,
      },
    })
    
    if (!anuncio) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(anuncio);
  },
  async setarInativo(req, res) {
    const { id } = req.params;
    const anuncio = await Anuncio.findOne({
      where: {
        id: id,
      },
    });
    anuncio.ativo = 0
    await anuncio.save()
    if (!anuncio) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(anuncio);
  },
};
