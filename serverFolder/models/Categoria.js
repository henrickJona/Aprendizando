const{Model, DataTypes} =require('sequelize');

class Categoria extends Model{
    static init(sequelize){
        super.init({
            titulo_categoria: DataTypes.STRING,
            
        },{
            sequelize

        })
        
    }
    
}
module.exports = Categoria;