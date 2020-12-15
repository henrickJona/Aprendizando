const{Model, DataTypes} =require('sequelize');

class HistoricoAutonomo extends Model{
    static init(sequelize){
        super.init({
            titulo: DataTypes.STRING,
            data_inicio: DataTypes.DATE,
            data_fim: DataTypes.DATE,
            valor_total: DataTypes.DECIMAL(10,2),
            avaliacao_dada_pelo_autonomo: DataTypes.DOUBLE,
            nome_contratante: DataTypes.STRING,

        },{
            sequelize

        })
        
    }
    static associate(models){
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_anuncio_id', as: 'anuncio'});
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_autonomo_id', as: 'autonomo'});
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_contratante_id', as: 'contratante'});
        this.belongsTo(models.Autonomo, {foreignKey: 'fk_termoCompromisso_id', as: 'termoCompromisso'});

    }
}
module.exports = HistoricoAutonomo;