"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("interessados", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fk_anuncio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "anuncios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fk_contratante_id: {
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
    return queryInterface.dropTable("interessados");
  },
};
