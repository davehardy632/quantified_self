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
    res.status(400).send(JSON.stringify(error));
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
    res.status(400).send(JSON.stringify(error));
  });
});

router.post('/', function(req, res) {
  if (req.body.food){
    Food.findOne(
      {
        attributes: ["id", "name", "calories"],
        where: { name: req.body.food.name }
      }
    ).then(food => {
      if (!food) {
        Food.create({
          name: req.body.food.name,
          calories: req.body.food.calories
        }).then(newFood => {
          res.setHeader("Content-Type", "application/json");
          res.status(201).send(JSON.stringify(newFood));
        }).catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({error: error}));
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({error: "Food already exists."}));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({error: error}));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(406).send(JSON.stringify({error: "Invalid Entry."}));
  }
});

router.patch('/:id', function(req, res) {
  if (req.body.food && req.body.food.name && req.body.food.calories) {
    Food.findByPk(req.params.id)
    .then(food => {
      if (food) {
        food.update({
          name: req.body.food.name,
          calories: parseInt(req.body.food.calories)
        }).then(newFood => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(newFood));
        }).catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({error: error}));
        });
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({error: "No food with that ID can be found."}));
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({error: error}));
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(406).send(JSON.stringify({error: "Invalid Entry."}));
  }
});

router.delete('/:id', function(req, res) {
  Food.findByPk(req.params.id)
  .then(food => {
    if (food) {
      food.destroy()
      .then(() => {
        res.setHeader("Content-Type", "application/json");
        res.status(204).send();
      }).catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({error: error}));
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No food with that ID can be found."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: error}));
  });
});

module.exports = router;
