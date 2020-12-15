const Instituicao = require("../models/Instituicao");
const { Op } = require("sequelize");
const {isEmpty} = require("../utils/empt")
module.exports = {
  async adicionarInstituicao(req, res) {
    
    const {
      nome,
      
    } = req.body;
  
    const instituicao = await Instituicao.create({
      nome:nome
      
    });
    return res.json(instituicao);
  },
  async MostrarTodos(req, res) {
    console.log("SSS")
    const instituicao = await Instituicao.findAll();
    console.log("SSSSSSSSSSSSSS")
    if (!instituicao) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(instituicao);
  },
  async MostrarUm(req, res) {
      const {nome} = req.params
    const instituicao = await Instituicao.findAll(
      {where :{[Op.or]: [
        { nome:{[ Op.iLike ]:nome+'%'} },
        { nome:{[ Op.iLike ]:'%- '+nome+'%'} }
      ]
      },limit:15});
  

      
if(isEmpty(instituicao)){
  
  return res.json([{id:-3,nome:"Nada Encontrado!"}])
} 
    return res.json(instituicao);
  }
  
};
