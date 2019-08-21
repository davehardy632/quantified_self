var shell = require("shelljs")
var request = require("supertest")
var app = require("../../../app")
const express = require("express");
var router = express.Router();
var Meal = require('../../../models').Meal;
var Food = require('../../../models').Food;
var MealFoods = require('../../../models').MealFoods;
const axios = require('axios');
const keys = require("dotenv")


describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });


  describe ("test the root path", () => {
    test("should return a 202 status", () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200);
      })
    })
  })

  describe ("test the get all meals endpoint", async () => {
    test("should return a 200 status and formatted meals response", async () => {
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

  describe ("test the endpoint to return a meal and associated record by meal id", async () => {
    test("should return a 200 status, and a formatted response for a single meal", async () => {
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

  describe ("test meal id endpoint for nonexistent record", async () => {
    test("should return a 200 status, response stating the record doesn't exist", async () => {
      return request(app).get("/api/v1/meals/23/foods")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual("Meal not found");
      })
    })
  })
})
