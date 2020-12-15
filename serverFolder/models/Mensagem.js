const { Model, DataTypes } = require("sequelize");

class Mensagem extends Model {
  static init(sequelize) {
    super.init(
      {
        texto: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Confirmado, {
        foreignKey: "fk_confirmado_id",
        as: "confirmado",
      });
      this.belongsTo(models.Contratante, {
        foreignKey: "fk_emissor_id",
        as: "emissor",
      });
      this.belongsTo(models.Contratante, {
          foreignKey: "fk_receptor_id",
          as: "receptor",
        });
    }
}
module.exports = Mensagem;
