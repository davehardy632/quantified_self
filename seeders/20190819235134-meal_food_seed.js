'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('MealFoods', [{
      MealId: 1,
      FoodId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 1,
      FoodId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 1,
      FoodId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      FoodId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      FoodId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      FoodId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 3,
      FoodId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 3,
      FoodId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 3,
      FoodId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 4,
      FoodId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 4,
      FoodId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 4,
      FoodId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MealFoods', null, {});
  }
};
