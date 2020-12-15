"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("mensagems", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fk_confirmado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "confirmados", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fk_emissor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contratantes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fk_receptor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contratantes", key: "id" },
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
    return queryInterface.dropTable("mensagems");
  },
};
