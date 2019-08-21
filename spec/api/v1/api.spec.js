var shell = require("shelljs")
var request = require("supertest")
var app = require("../../../app")
const express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;


describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
  });

  beforeEach(() => {
    
    shell.exec('npx sequelize db:seed:all');
  });

  describe ("test the root path", () => {
    test("should return a 202 status", () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200);
      })
    })
  })

  describe ("test the get all meals endpoint", () => {
    test("should return a 200 status and formatted meals response", () => {
      return request(app).get("/api/v1/meals")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body[0])).toEqual(["id", "name", "Food"]);
        expect(Object.keys(response.body[0]["Food"][0])).toEqual(["id", "name", "calories"]);
        expect(Object.keys(response.body[0]["Food"][1])).toEqual(["id", "name", "calories"]);
        expect(Object.keys(response.body[0]["Food"][2])).toEqual(["id", "name", "calories"]);
      })
    })
  })

  describe ("test the endpoint to return a meal and associated record by meal id", () => {
    test("should return a 200 status, and a formatted response for a single meal", () => {
      return request(app).get("/api/v1/meals/3/foods")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body[0])).toEqual(["id", "name", "Food"]);
        expect(Object.keys(response.body[0]["Food"][0])).toEqual(["id", "name", "calories"]);
        expect(Object.keys(response.body[0]["Food"][1])).toEqual(["id", "name", "calories"]);
        expect(Object.keys(response.body[0]["Food"][2])).toEqual(["id", "name", "calories"]);
      })
    })
  })

  ///// Sad path for retrieving an invalid meal

  describe ("test meal id endpoint for nonexistent record", () => {
    test("should return a 404 status, response stating the record doesn't exist", () => {
      return request(app).get("/api/v1/meals/23/foods")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual("Meal not found");
      })
    })
  })


  describe ("Adding a food to a meal endpoint", () => {
    test("should return a 200 status, stating the food has been added to the meal", () => {
      return request(app).post("/api/v1/meals/1/foods/3")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({"message": `Successfully added Apple to Breakfast`});
      })
    })
  })

  /////// sad path for creating association between a meal and food

  describe ("Sad Path: Adding a food to a meal endpoint with invalid food id", () => {
    test("should return a 404 status, stating the food entry is invalid", () => {
      return request(app).post("/api/v1/meals/1/foods/32")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({"message": "Invalid food entry"});
      })
    })
  })

  describe ("Sad Path: Adding a food to a meal endpoint with invalid meal id", () => {
    test("should return a 200 status, stating the meal entry is invalid", () => {
      return request(app).post("/api/v1/meals/13/foods/3")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({"message": "Invalid meal entry"});
      })
    })
  })

  describe ("Sad Path: Adding a food to a meal endpoint that already exists", () => {
    test("should return a 404 status, stating the association already exists", () => {
      return request(app).post("/api/v1/meals/4/foods/7")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({"message": `Dinner already contains Bagel Bites - Four Cheese`});
      })
    })
  })

  describe ("Sad Path: Adding a food to a meal endpoint where both ids are invalid", () => {
    test("should return a 404 status, stating the entry was invalid", () => {
      return request(app).post("/api/v1/meals/42/foods/17")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({"message": "Invalid entry"});
      })
    })
  })

  describe('api v1 food fetch all path', () => {
    test('It should respond to a GET request', () => {
    return request(app).get("/api/v1/foods")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });

    test('It should return several food objects', () => {
    return request(app).get("/api/v1/foods")
      .then(response => {
        expect(response.body.length).toBe(7);
        expect(Object.keys(response.body[0])).toContain("id");
        expect(Object.keys(response.body[0])).toContain("name");
        expect(Object.keys(response.body[0])).toContain("calories");
        expect(Object.keys(response.body[6])).toContain("id");
        expect(Object.keys(response.body[6])).toContain("name");
        expect(Object.keys(response.body[6])).toContain("calories");
      });
    });
  });
})
