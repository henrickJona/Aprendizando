const { Model, DataTypes } = require("sequelize");

class Interessado extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Anuncio, {
      foreignKey: "fk_anuncio_id",
      as: "anuncio",
    });
    this.belongsTo(models.Contratante, {
      foreignKey: "fk_contratante_id",
      as: "contratante",
    });
  }
}
module.exports = Interessado;
