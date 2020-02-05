const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const trainStatus = require("./api/trainStatus");
const mongoose = require("mongoose");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Aceess-Control-Allow-Header", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST GET PATCH PUT DELETE");
    return res.status(200).json({});
  }
  next();
});


app.use('/status/', trainStatus);

module.exports = app;