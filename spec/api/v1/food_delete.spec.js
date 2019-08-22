var request = require("supertest")
var app = require("../../../app")
const express = require("express");
var router = express.Router();

describe('api', () => {
  describe('api v1 foods delete path', () => {
    test('It should respond to a DELETE request', () => {
    return request(app).delete("/api/v1/foods/3")
      .send()
      .then(response => {
        expect(response.statusCode).toBe(204);
      });
    });

    test('It should delete a food object', () => {
      return request(app).get("/api/v1/foods")
        .send()
        .then(response => {
        initalLength = response.body.length;
        request(app).delete("/api/v1/foods/4")
        .send()
        .then(() => {
          request(app).get("/api/v1/foods")
          .send()
          .then(response => {
          expect(response.body.length).toBe(initalLength-1);
          })
        })
      });
    });

    test('It should not delete a food object if an invalid ID is passed', () => {
      return request(app).delete("/api/v1/foods/12345")
        .send()
        .then(response => {
        expect(response.statusCode).toBe(404);
        expect(Object.keys(response.body)).toContain("error");
      });
    });

    test('It should not delete a food object if no params are passed', () => {
      return request(app).delete("/api/v1/foods")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
    });
  });
});
