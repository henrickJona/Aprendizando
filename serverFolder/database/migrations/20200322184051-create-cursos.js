'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cursos', { 
      id: {
        type: Sequelize.INTEGER,
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true, 
      },
      nome: { 
        type: Sequelize.STRING,
        allowNull:false,
        
      },
      fk_instituicao_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'instituicaos', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('cursos');
    
  }
};
