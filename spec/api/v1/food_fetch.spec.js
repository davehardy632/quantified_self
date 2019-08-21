var shell = require("shelljs")
var request = require("supertest")
var app = require("../../../app")
const express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFoods = require('../../../models').MealFoods;

describe('api', () => {
  describe('api v1 foods fetch all path', () => {
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
});
