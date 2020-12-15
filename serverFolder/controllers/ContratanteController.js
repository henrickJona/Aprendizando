const Contratante = require("../models/Contratante");
const Curso = require("../models/Curso");
const Instituicao = require("../models/Instituicao");
const { Op } = require("sequelize");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 864000,
  });
}
module.exports = {
  async getOne(req, res) {
    const { id } = req.params;

    const contratante = await Contratante.findOne({ where: { id: id } });
    if (!contratante) {
      return res.status(400).json({ error: "User not found" });
    } else {
      return res.json(contratante);
    }
  },

  async storeRegister(req, res) {
    const {
      nome_contratante,
      sobre_nome_contratante,
      foto_perfil_contratante,
      email_contratante,
      telefone_contratante,
      fk_instituicao_id,
      fk_curso_id,
    } = req.body;
    const contratante = await Contratante.create({
      nome_contratante,
      sobre_nome_contratante,
      foto_perfil_contratante,
      email_contratante,
      telefone_contratante,
      fk_instituicao_id,
      fk_curso_id,
      valor_investido_contratante: 0.0,
      avaliacao_positiva: 0,
      avaliacao_negativa: 0,
    });
    return res.json({
      contratante,
      token: generateToken({ id: contratante.id }),
    });
  },
  async mostrarContratante(req, res) {
    const { identificador } = req.params;
    let contratante;

    if (isNaN(identificador)) {
      contratante = await Contratante.findOne({
        where: {
          email_contratante: identificador,
        },
      });
      if (contratante) {
        return res.json({
          contratante,
          token: generateToken({ id: contratante.id }),
        });
      } else {
        return res.json({});
      }
    } else {
      contratante = await Contratante.findOne({
        where: {
          id: identificador,
        },
      });
      if (contratante) {
        return res.json(contratante);
      }
    }
  },

  async storeNumber(req, res) {
    const { id } = req.params;
    const { telefone_contratante } = req.body;
    console.log(id);
    console.log(telefone_contratante);
    const contratanteNaoRetorna = await Contratante.update(
      { telefone_contratante: telefone_contratante },
      {
        where: {
          id: id,
        },
      }
    );
    const contratante = await Contratante.findAll({ where: { id: id } });
    return res.json({
      contratante,
      token: generateToken({ id: contratante.id }),
    });
  },
  async getAll(req, res) {
    const contratante = await Contratante.findAll();

    return res.json(contratante);
  },
};
