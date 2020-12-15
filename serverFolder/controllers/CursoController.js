const Curso = require("../models/Curso");
const Instituicao = require('../models/Instituicao')
const {isEmpty} = require("../utils/empt")
module.exports = {
  async adicionarCurso(req, res) {
    const { id } = req.params;
    const {
      nome,
      
    } = req.body;
    const isntituicao = await Instituicao.findByPk(id);

    if (!isntituicao) {
      return res.status(400).json({ error: "Istituição não encontrado!" });
    }
    const curso = await Curso.create({
      nome:nome,
      fk_instituicao_id:id
      
    });
    return res.json(curso);
  },
  async MostrarTodos(req, res) {
    const {id} = req.params
    console.log(id)
    const instituicao = await Instituicao.findByPk(id,{include:{association:"cursos"}});
    if(isEmpty(instituicao)){
  
      return res.json([{id:1,nome:"Nada Encontrado!"}])
    } 
        return res.json(instituicao.cursos);
      
    },
  
  
  async MostrarUm(req, res) {
      const {nome} = req.body
    const curso = await Curso.findAll({
      where: {
        nome: nome
      }
    });
    if (!curso) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(curso);
  }
};
