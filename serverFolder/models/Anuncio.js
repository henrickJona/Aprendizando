const { Model, DataTypes } = require("sequelize");

class Anuncio extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        investimento: DataTypes.DECIMAL(10, 2),
        ativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Contratante, {
      foreignKey: "fk_contratante_id",
      as: "contratante",
    });
    this.belongsTo(models.Instituicao, {
      foreignKey: "fk_instituicao_id",
      as: "instituicao",
    });
    this.hasMany(models.Interessado, {
      foreignKey: "fk_anuncio_id",
      as: "interessados",
    });
  }
}
module.exports = Anuncio;
