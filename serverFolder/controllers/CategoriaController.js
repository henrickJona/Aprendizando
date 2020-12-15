const Categoria = require("../models/Categoria");

module.exports = {
  async adicionarCategoria(req, res) {
    const { titulo_categoria } = req.body;

    const categoria = await Categoria.create({ titulo_categoria });
    return res.json(categoria);
  },
  async MostrarTodos(req, res) {
    const categoria = await Categoria.findAll();
    if (!categoria) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(categoria);
  }
};
