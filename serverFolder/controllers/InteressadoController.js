const Contratante = require("../models/Contratante");
const Anuncio = require("../models/Anuncio");
const Interessado = require("../models/Interessado");
module.exports = {
  async adicionarInteressado(req, res) {
    console.log("JONNONON");
    const { anuncioId, contratanteId } = req.params;
    console.log(anuncioId, contratanteId);
    
    const contratante = await Contratante.findByPk(contratanteId);

    if (!contratante) {
      return res.status(400).json({ error: "usuario não encontrado!" });
    }
    const interessado = await Interessado.create({
      fk_anuncio_id: anuncioId,
      fk_contratante_id: contratanteId,
    });

    return res.json(interessado);
  },
  async MostrarTodosPorAnuncio(req, res) {
    const { anuncioId } = req.params;
    const testaAnuncio = await Anuncio.findOne({where:{id:anuncioId}})
    console.log(testaAnuncio.ativo)
    if(testaAnuncio.ativo == true){
      const anuncio = await Anuncio.findByPk(anuncioId, {
        include: { association: "interessados" },
      });
      if (!anuncio) {
        return res.status(400).json({ error: "nenhum registro encontrado!" });
      }
      return res.json(anuncio);
    }else{
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }
   
    /* const anuncio = await Anuncio.findAll({
      where: {
        ativo: true,
        fk_instituicao_id: id,
      },
    }); */
    

    
  },
  async MostrarTodosPorContratante(req, res) {
    const { contratanteId } = req.params;
    const anuncio = await Contratante.findByPk(contratanteId, {
      include: { association: "interesses"},
    });
  /*   if(testaAnuncio.ativo ==true){
      const anuncio = await Anuncio.findByPk(contratanteId, {
        include: { association: "interesses" },
      });
      
      
    }else{
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    } */
    if (!anuncio) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }
    return res.json(anuncio);
  },
  async confirmarInteressado(req, res) {
    const { contratanteId, anuncioId } = req.params;

    const interessado = await Interessado.findOne({
      where: { fk_contratante_id: contratanteId, fk_anuncio_id: anuncioId },
    });

    if (!interessado) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(interessado);
  },
  async deletar(req, res) {
    const { contratanteId, anuncioId } = req.params;
    const interessado = await Interessado.destroy({
      where: { fk_contratante_id: contratanteId, fk_anuncio_id: anuncioId },
    });

    if (!interessado) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(interessado);
  },
  async deletarPorAnuncio(req, res) {
    const {anuncioId } = req.params;
    const interessado = await Interessado.destroy({
      where: {  fk_anuncio_id: anuncioId },
    });

    if (!interessado) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(interessado);
  },
};
