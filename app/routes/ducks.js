const router = require("express").Router();
let Duck = require("../db/models/duck.model");

router.route("/").get((req, res) => {
  Duck.find()
    .then((ducks) => res.json(ducks))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

// TODO: Might need to make sure the data types are correct here
router.route("/add").post((req, res) => {
  console.log(req.body);
  const { time, food, park, location, duckQuantity, foodQuantity } = req.body;

  const newEntry = new Duck({ time, food, park, location, duckQuantity, foodQuantity });

  newEntry
    .save()
    .then(() => res.json("Entry added!"))
    .catch((e) => res.status(400).json(`Error: ${e}`));
});

module.exports = router;
