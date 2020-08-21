const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const { apiErrorHandler } = require("./utils/errors");

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const api = express.Router();
require("./modules/catalog/routes/category")(api);
require("./modules/catalog/routes/product")(api);

api.use(apiErrorHandler);
app.use("/api", api);

module.exports = app;
