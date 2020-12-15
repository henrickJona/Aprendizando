'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('instituicaos', { 
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
    
      return queryInterface.dropTable('instituicaos');
    
  }
};
