const { Model, DataTypes } = require("sequelize");

class Confirmado extends Model {
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
      foreignKey: "fk_ministrante_id",
      as: "ministrante",
    });
    this.belongsTo(models.Contratante, {
        foreignKey: "fk_aprendiz_id",
        as: "aprendiz",
      });
      this.hasMany(models.Mensagem,{
        foreignKey:"fk_confirmado_id",
        as:"mensagems"
      })
  }
}
module.exports = Confirmado;
