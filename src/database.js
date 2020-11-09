"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://db:27017/pract1");

module.exports = mongoose;