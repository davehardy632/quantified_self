var express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;


let allMeals = async () => {
  let meals = await Meal.findAll({ attributes: ["id", "name"], include: [{model: Food, attributes: ['id', 'name', 'calories'], through: {attributes: [] }}]  })
    .then(meals => {
      return meals;
    })
    .catch(error => {
      return error
    });
  return meals;
}

router.get("/", async function(req, res, next) {
  meals = await allMeals()
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(meals));
});

module.exports = router;
