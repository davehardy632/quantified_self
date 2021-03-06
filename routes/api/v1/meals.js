var express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;

router.get("/", async function(req, res, next) {
  meals = await allMeals()
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(meals));
});


router.get("/:meal_id/foods", async function(req, res, next) {
  mealId = parseInt(req.url.split("/")[1])
  meals = await mealsByMealId(mealId)
  if (Object.keys(meals) == '0') {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(meals));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify("Meal not found"));
  }
});

router.post("/:meal_id/foods/:id", async function(req, res, next) {
  mealId = parseInt(req.url.split("/")[1])
  foodId = parseInt(req.url.split("/")[3])

  meal = await mealById(mealId)
  food = await foodById(foodId)
  mealFood = await mealFoodsByIds(mealId, foodId)

  if (Object.keys(meal) == '0' && Object.keys(food) == '0' && Object.keys(mealFood) != '0') {
    MealFoods.create({
      FoodId: food[0]['dataValues']['id'],
      MealId: meal[0]['dataValues']['id']
    })
    .then(user => {
        associationResponse = {"message": `Successfully added ${food[0]['dataValues']['name']} to ${meal[0]['dataValues']['name']}`}
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify(associationResponse));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      });
  } else if (Object.keys(meal) == '0' && Object.keys(food) != '0') {
    invalidFoodError = {"message": "Invalid food entry"}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(invalidFoodError));
  } else if (Object.keys(meal) != '0' && Object.keys(food) == '0') {
    invalidMealError = {"message": "Invalid meal entry"}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(invalidMealError));
  } else if (Object.keys(meal) == '0' && Object.keys(food) == '0' && Object.keys(mealFood) == '0') {
    existingResourceError = {"message": `${meal[0]['dataValues']['name']} already contains ${food[0]['dataValues']['name']}`}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(existingResourceError));
  } else {
    invalidEntryError = {"message": "Invalid entry"}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(invalidEntryError));
  }
});


router.delete("/:meal_id/foods/:id", async function(req, res, next) {
  mealId = parseInt(req.url.split("/")[1])
  foodId = parseInt(req.url.split("/")[3])

  meal = await mealById(mealId)
  food = await foodById(foodId)
  mealFood = await mealFoodsByIds(mealId, foodId)

  if (Object.keys(mealFood) == '0') {
    MealFoods.destroy({where: {
      FoodId: foodId,
      MealId: mealId
    }})
    .then(deletedMealFood => {
      deleteAssociationResponse = {"message": `${food[0]['dataValues']['name']} has been removed from ${meal[0]['dataValues']['name']}`}
      res.setHeader("Content-Type", "application/json");
      res.status(204).send();
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
  } else if (Object.keys(meal) != '0') {
    invalidMealError = {"message": "Invalid meal entry"}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(invalidMealError));
  } else if (Object.keys(food) != '0') {
    invalidFoodError = {"message": "Invalid food entry"}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(invalidFoodError));
  } else if (Object.keys(mealFood) != '0') {
    invalidMealFoodError = {"message": `${meal[0]['dataValues']['name']} already does not contain ${food[0]['dataValues']['name']}`}
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify(invalidMealFoodError));
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

let mealsByMealId = async (mealId) => {
  let meals = await Meal.findAll({ where: {id: mealId}, attributes: ["id", "name"], include: [{model: Food, attributes: ['id', 'name', 'calories'], through: {attributes: [] }}]  })
    .then(meals => {
      return meals;
    })
    .catch(error => {
      return error
    });
  return meals;
}

let mealById = async (mealId) => {
  let meals = await Meal.findAll({ where: {id: mealId}, attributes: ["id", "name"], through: {attributes: [] } })
    .then(meal => {
      return meal;
    })
    .catch(error => {
      return error
    });
  return meals;
}

let foodById = async (foodId) => {
  let meals = await Food.findAll({ where: {id: foodId}, attributes: ["id", "name", "calories"], through: {attributes: [] }  })
    .then(food => {
      return food;
    })
    .catch(error => {
      return error
    });
  return meals;
}

let mealFoodsByIds = async (mealId, foodId) => {
  let mealFood = await MealFoods.findAll({ where: {MealId: mealId, FoodId: foodId}})
    .then(result => {
      return result;
    })
    .catch(error => {
      return error
    });
  return mealFood;
}

module.exports = router;
