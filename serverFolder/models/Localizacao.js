const{Model, DataTypes} =require('sequelize');

class Localizacao extends Model{
    static init(sequelize){
        super.init({
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
            
            

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_anuncio_id', as: 'anuncio'});
        


    }
}
module.exports = Localizacao;