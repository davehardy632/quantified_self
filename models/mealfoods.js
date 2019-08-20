'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFoods = sequelize.define('MealFoods', {
    FoodId: DataTypes.BIGINT,
    MealId: DataTypes.BIGINT
  }, {});
  MealFoods.associate = function(models) {
    MealFoods.belongsTo(models.Meal, {foreignKey: 'MealId', as: 'meal'})
    MealFoods.belongsTo(models.Food, {foreignKey: 'FoodId', as: 'food'})
  };
  return MealFoods;
};
