const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const trainStatus = require("./api/trainStatus");
const mongoose = require("mongoose");

// mongoose.connect(
//     "mongodb://shubham4863:shubhamojha@cluster0-shard-00-00-n94o9.mongodb.net:27017,cluster0-shard-00-01-n94o9.mongodb.net:27017,cluster0-shard-00-02-n94o9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
//     {
//       useMongoClient: true
//     }
//   );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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