"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("favoritos", {
      id: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },

      fk_contratante_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contratantes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fk_instituicao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "instituicaos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    return queryInterface.dropTable("favoritos");
  },
};
