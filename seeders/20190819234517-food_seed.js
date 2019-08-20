'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [{
        name: 'Banana',
        calories: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yogurt',
        calories: 550,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple',
        calories: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chicken Burrito',
        calories: 800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gum',
        calories: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cheese',
        calories: 400,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bagel Bites - Four Cheese',
        calories: 650,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
