require("dotenv").config();

var express = require("express");
var app = express();

var user = require("./controllers/usercontroller");
var item = require("./controllers/itemcontroller");
var comment = require("./controllers/commentcontroller");

var sequelize = require("./db");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(require("./middleware/headers"));

app.use("/user", user);

app.use(require("./middleware/validate-session"));
app.use("/item", item);
app.use("/comment", comment);

require("./association");

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}`);
});

// sequelize.sync(); // {force:true}
