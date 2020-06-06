"use scripts";
const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require('./router/index');

// Connect to mongoDB
const mongoDBConfig = require("./config/mongoose").mongoDBConfig;
mongoDBConfig();

const PORT = 5000;

// Enable CORS
app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Logger for requests
app.use(morgan("dev"));
// API Router
app.use(router);

app.listen(PORT, (error) => {
  if (error) console.log(`Server Crashed with Error: ${error}`);
  else console.log(`Server Running in PORT: ${PORT}`);
});
