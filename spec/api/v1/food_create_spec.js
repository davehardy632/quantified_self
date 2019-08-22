var shell = require("shelljs")
var request = require("supertest")
var app = require("../../../app")
const express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFoods = require('../../../models').MealFoods;

describe('api', () => {
  describe('api v1 foods create path', () => {
    test('It should respond to a POST request', () => {
    return request(app).post("/api/v1/foods", (req, res) => {
      req.send(JSON.stringify({food:{name: "Donut", calories: 200}}));
    })
      .then(response => {
        expect(response.statusCode).toBe(201);
      });
    });

    test('It should create a new food object', () => {
      return request(app).post("/api/v1/foods", (req, res) => {
        req.send(JSON.stringify({food:{name: "Donut", calories: 200}}));
      })
      .then(response => {
        expect(Object.keys(response.body)).toContain("id");
        expect(Object.keys(response.body)).toContain("name");
        expect(Object.keys(response.body)).toContain("calories");
      });
    });

    test('It should not create a new food object if invalid calories are passed', () => {
      return request(app).post("/api/v1/foods", (req, res) => {
        req.send(JSON.stringify({food:{name: "Donut", calories: "NAN"}}));
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(Object.keys(response.body)).toContain("error");
      });
    });

    test('It should not create a new food object if invalid name is passed', () => {
      return request(app).post("/api/v1/foods", (req, res) => {
        req.send(JSON.stringify({food:{name: 12345, calories: 200}}));
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(Object.keys(response.body)).toContain("error");
      });
    });

    test('It should not create a new food object if no params are passed', () => {
      return request(app).post("/api/v1/foods")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(Object.keys(response.body)).toContain("error");
      });
    });
  });
});