const Autonomo = require("../models/Autonomo");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 864000
  });
}
module.exports = {
  async getOne(req, res) {
    const { id } = req.params;

    const autonomo = await Autonomo.findOne({ where: { id: id } });
    if (!autonomo) {
      return res.status(400).json({ error: "User not found" });
    } else {
      return res.json(autonomo);
    }
  },

  async storeRegister(req, res) {
    const {
      nome_autonomo,
      sobrenome_autonomo,
      foto_perfil_autonomo,
      email_autonomo
    } = req.body;

    const autonomo = await Autonomo.findOrCreate({
      where: { email_autonomo: email_autonomo },
      defaults: {
        nome_autonomo,
        sobrenome_autonomo,
        foto_perfil_autonomo,
        email_autonomo,
        telefone_autonomo: "teste",
        valor_ganho_autonomo: 0.0,
        notificado_autonomo: true,
        avaliacao_autonomo: 1
      }
    });
    if (autonomo.telefone_autonomo != "teste")
      return res.json({ autonomo, token: generateToken({ id: autonomo.id }) });
    return res.json(autonomo);
  },
  async storeNumber(req, res) {
    const { id } = req.params;
    const { telefone_autonomo } = req.body;
    console.log(id);
    console.log(telefone_autonomo);
    const autonomoNaoRetorna = await Autonomo.update(
      { telefone_autonomo: telefone_autonomo },
      {
        where: {
          id: id
        }
      }
    );
    const autonomo = await Autonomo.findAll({ where: { id: id } });
    return res.send({
      autonomo,
      token: generateToken({ id: autonomo.id })
    });
  },
  async getAll(req, res) {
    const autonomo = await Autonomo.findAll();

    return res.json(autonomo);
  }
};
