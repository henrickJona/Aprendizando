const { Model, DataTypes } = require("sequelize");

class Instituicao extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Curso, {
      foreignKey: "fk_instituicao_id",
      as: "cursos",
    });
    this.hasMany(models.Anuncio, {
      foreignKey: "fk_instituicao_id",
      as: "anuncios",
    });
    this.hasMany(models.Favorito, {
      foreignKey: "fk_instituicao_id",
      as: "favoritos",
    });
  }
}
module.exports = Instituicao;
