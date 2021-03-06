'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Food, {through: models.MealFoods,
                              foreignKey: 'MealId',
                              onDelete: "CASCADE"
                            });
  };
  return Meal;
};
