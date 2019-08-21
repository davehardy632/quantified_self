const express = require('express');
const router = express.Router();
const Food = require('../../../models').Food;

router.get('/:id', function(req, res) {
  Food.findOne(
    {
      attributes: ["id", "name", "calories"],
      where: { id: req.params.id }
    }
  )
  .then(food => {
    if (food) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No food with that ID can be found."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify(error));
  });
});

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
