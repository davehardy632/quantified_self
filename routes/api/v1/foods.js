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

router.get('/:id', function(req, res) {
  Food.findOne({
    where: {
      id: parseInt(req.params.id)
    },
    attributes: ["id", "name", "calories"]
  })
  .then(foods => {
    if (foods) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({NotFoundError: "Not Found"}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify(error));
  });
});

module.exports = router;
