const router = require("express").Router();
let Duck = require("../db/models/duck.model");

router.route("/").get((req, res) => {
  Duck.find()
    .then((ducks) => res.json(ducks))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

router.route("/add").post((req, res) => {
  const { time, food, park, location, duckQuantity, foodQuantity } = req.body;

  const newEntry = new Duck({ time, food, park, location, duckQuantity, foodQuantity });

  newEntry
    .save()
    .then(() => res.json("Entry added!"))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

module.exports = router;
