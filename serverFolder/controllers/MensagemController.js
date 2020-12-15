const Mensagem = require("../models/Mensagem");
const Confirmado = require("../models/Confirmado")
const { Op } = require("sequelize");
const {isEmpty} = require("../utils/empt")
module.exports = {
  async adicionarMensagem(req, res) {
    
    const {
      texto,
      fk_confirmado_id,
      fk_emissor_id,
      fk_receptor_id
    } = req.body;
  
    const mensagem = await Mensagem.create({
      texto:texto,
      fk_confirmado_id:fk_confirmado_id,
      fk_emissor_id: fk_emissor_id,
      fk_receptor_id:fk_receptor_id

    });
    return res.json(mensagem);
  },
  async MostrarTodos(req, res) {
    
    const instituicao = await Instituicao.findAll();
    if (!instituicao) {
      return res.status(400).json({ error: "nenhum registro encontrado!" });
    }

    return res.json(instituicao);
  },
  async MostrarPorConfirmado(req, res) {
      const {idConfirmado} = req.params
      const confirmado = await Confirmado.findByPk(idConfirmado,{include:{association:"mensagems"}})
    

      
if(isEmpty(confirmado)){
  
  return res.json([{id:1,nome:"Nada Encontrado!"}])
} 
    return res.json(confirmado);
  }
  
};
