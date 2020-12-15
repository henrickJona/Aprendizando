const{Model, DataTypes} =require('sequelize');

class Curso extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Instituicao, {foreignKey: 'fk_instituicao_id', as: 'instituicao'});
        

    }
}
module.exports = Curso;