const mongoose = require("mongoose");

const post2 = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  rate: {
    type: String,
  },
});

const done = mongoose.model("products", post2);

module.exports = done;
