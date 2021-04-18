const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const duckSchema = new Schema(
  {
    time: {
      type: String,
      require: true,
      trim: true,
      unique: false,
    },
    food: {
      type: String,
      require: true,
      trim: true,
      unique: false,
    },
    park: {
      type: String,
      require: true,
      trim: true,
      unique: false,
    },
    location: {
      type: String,
      require: true,
      trim: true,
      unique: false,
    },
    duckQuantity: {
      type: Number,
      require: true,
      trim: true,
      unique: false,
    },
    foodQuantity: {
      type: Number,
      require: true,
      trim: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Duck = mongoose.model("Duck", duckSchema);

module.exports = Duck;
