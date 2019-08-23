var request = require("supertest")
var app = require("../../../app")
const express = require("express");
var router = express.Router();

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
        expect(Object.keys(response.body[0])).toContain("id");
        expect(Object.keys(response.body[0])).toContain("name");
        expect(Object.keys(response.body[0])).toContain("calories");
        expect(Object.keys(response.body[1])).toContain("id");
        expect(Object.keys(response.body[1])).toContain("name");
        expect(Object.keys(response.body[1])).toContain("calories");
      });
    });
  });

  describe('api v1 food fetch single path', () => {
    test('It should respond to a GET request', () => {
    return request(app).get("/api/v1/foods/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });

    test('It should return a single food object', () => {
    return request(app).get("/api/v1/foods/1")
      .then(response => {
        expect(Object.keys(response.body)).toContain("id");
        expect(Object.keys(response.body)).toContain("name");
        expect(Object.keys(response.body)).toContain("calories");
      });
    });

    test('It should return an error on invalid id', () => {
    return request(app).get("/api/v1/foods/10000")
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(Object.keys(response.body)).toContain("error");
      });
    });
  });
});
