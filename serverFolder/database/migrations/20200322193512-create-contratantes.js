"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("contratantes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_contratante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sobre_nome_contratante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone_contratante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email_contratante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fk_instituicao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "instituicaos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fk_curso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "cursos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      foto_perfil_contratante: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pontos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      avaliacao_positiva: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      avaliacao_negativa: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("contratantes");
  },
};
