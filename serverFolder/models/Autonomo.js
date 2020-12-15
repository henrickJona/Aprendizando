const{Model, DataTypes} =require('sequelize');

class Autonomo extends Model{
    static init(sequelize){
        super.init({
            nome_autonomo: DataTypes.STRING,
            sobrenome_autonomo: DataTypes.STRING,
            foto_perfil_autonomo: DataTypes.STRING,
            email_autonomo:DataTypes.STRING,
            
            avaliacao_autonomo: DataTypes.DOUBLE,
            telefone_autonomo: DataTypes.STRING,
            valor_ganho_autonomo: DataTypes.DECIMAL(10,2),
            notificado_autonomo: DataTypes.BOOLEAN

        },{
            sequelize

        })
        
    }
}
module.exports = Autonomo;