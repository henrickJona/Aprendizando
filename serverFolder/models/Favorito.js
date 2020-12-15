const { Model, DataTypes } = require("sequelize");

class Favorito extends Model {
  static init(sequelize) {
    super.init(
      {},
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
  }
}
module.exports = Favorito;
