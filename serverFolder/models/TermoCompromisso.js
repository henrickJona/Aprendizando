const{Model, DataTypes} =require('sequelize');

class TermoCompromisso extends Model{
    static init(sequelize){
        super.init({
            data_inicio: DataTypes.DATE,
            data_fim: DataTypes.DATE,
            valor_total: DataTypes.DECIMAL(10,2),
            avaliacao_dada_pelo_contratante: DataTypes.DOUBLE,
            avaliacao_dada_pelo_autonomo: DataTypes.DOUBLE,
            

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_anuncio_id', as: 'anuncio'});
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_autonomo_id', as: 'autonomo'});
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_contratante_id', as: 'contratante'});

    }
}
module.exports = TermoCompromisso;