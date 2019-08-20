const shell = require('shelljs');
const request = require("supertest");
const app = require('../../../app.js');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create');
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate');
  });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
  });

  afterAll(() => {
    shell.exec('npx sequelize db:drop');
  })

  describe('api v1 food fetch all path', () => {
    test('it should respond to a get request', () => {
    return request(app).get('/api/v1/foods')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});
