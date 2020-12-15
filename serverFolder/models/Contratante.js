const { Model, DataTypes } = require("sequelize");

class Contratante extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_contratante: DataTypes.STRING,
        sobre_nome_contratante: DataTypes.STRING,
        foto_perfil_contratante: DataTypes.STRING,
        email_contratante: DataTypes.STRING,
        avaliacao_positiva: DataTypes.INTEGER,
        avaliacao_negativa: DataTypes.INTEGER,
        telefone_contratante: DataTypes.STRING,
        valor_investido_contratante: DataTypes.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Instituicao, {
      foreignKey: "fk_instituicao_id",
      as: "instiuicaos",
    });
    this.belongsTo(models.Curso, { foreignKey: "fk_curso_id", as: "cursos" });
    this.hasMany(models.Anuncio, {
      foreignKey: "fk_contratante_id",
      as: "anuncios",
    });
    this.hasMany(models.Favorito, {
      foreignKey: "fk_contratante_id",
      as: "favoritos",
    });
    this.hasMany(models.Interessado, {
      foreignKey: "fk_contratante_id",
      as: "interesses",
    });
    this.hasMany(models.Confirmado, {
      foreignKey: "fk_ministrante_id",
      as: "ministrante",
    });
    this.hasMany(models.Confirmado, {
      foreignKey: "fk_aprendiz_id",
      as: "aprendiz",
    });
    this.hasMany(models.Mensagem, {
      foreignKey: "fk_emissor_id",
      as: "mensagemsEmissor",
    });
    this.hasMany(models.Mensagem, {
      foreignKey: "fk_receptor_id",
      as: "mensagemsReceptor",
    });
  }
}
module.exports = Contratante;
