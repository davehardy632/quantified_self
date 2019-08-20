const express = require('express');
const router = express.Router();
const Food = require('../../../models').Food;

router.get('/', function(req, res) {
  Food.findAll({attributes: ["id", "name", "calories"]})
  .then(foods => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify(error));
  });
});

module.exports = router;
