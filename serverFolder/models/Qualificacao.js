const{Model, DataTypes} =require('sequelize');

class Qualificacao extends Model{
    static init(sequelize){
        super.init({
            nome_escola_qualificacao: DataTypes.STRING,
            curso_qualificacao: DataTypes.STRING,
            duracao_qualificacao: DataTypes.STRING,
            

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_autonomo_id', as: 'autonomo'});
        


    }
}
module.exports = Qualificacao;