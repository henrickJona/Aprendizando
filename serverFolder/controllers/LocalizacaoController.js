const Localizacao = require("../models/Localizacao");
const Anuncio = require("../models/Anuncio");

module.exports = {
  async adicionarLocalizacao(req, res) {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const anuncio = await Anuncio.findByPk(id);
    if (!anuncio) {
      return res.status(400).json({ error: "usuario não encontrado!" });
    }
    const localizacao = await Localizacao.create({
      latitude,
      longitude,
      fk_anuncio_id: id
    });
    return res.json(localizacao);
  },
  async MostrarTodas(req, res) {
    const localizacao = await Localizacao.findAll();
    return res.json(localizacao);
  }
};
