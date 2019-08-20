const shell = require('shelljs');
const request = require("supertest");
const app = require('../../../app.js');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  afterAll(() => {
    shell.exec('npx sequelize db:drop');
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
});
