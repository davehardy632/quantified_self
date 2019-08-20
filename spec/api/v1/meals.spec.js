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
    test("should return a 201 status", async () => {
      return request(app).get("/api/v1/meals")
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body[0])).toEqual(["id", "name", "Food"]);
        expect(Object.keys(response.body[0]["Food"][0])).toEqual(["id", "name", "calories"]);
      })
    })
  })
})
