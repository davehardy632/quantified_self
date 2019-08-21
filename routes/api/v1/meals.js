var express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;
const axios = require('axios');
const keys = require("dotenv")

router.get("/", async function(req, res, next) {
  meals = await allMeals()
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(meals));
});


router.get("/:meal_id/foods", async function(req, res, next) {
  mealId = parseInt(req.url.split("/")[1])
  meals = await mealsAndFoodsByMealId(mealId)
  if (Object.keys(meals) == '0') {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(meals));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify("Meal not found"));
  }
});

//////// async functions

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

let mealsAndFoodsByMealId = async (mealId) => {
  let meals = await Meal.findAll({ where: {id: mealId}, attributes: ["id", "name"], include: [{model: Food, attributes: ['id', 'name', 'calories'], through: {attributes: [] }}]  })
    .then(meals => {
      return meals;
    })
    .catch(error => {
      return error
    });
  return meals;
}

module.exports = router;
