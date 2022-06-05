
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const  db = require("./models")

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(bodyParser.json()); // To parse requests of content-type - application/json

app.use(bodyParser.urlencoded({ extended: true })); // To parse requests of content-type - application/x-www-form-urlencoded

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
  
app.get("/", (req, res) => { //Route
  res.json({ message: "Welcome to todolost application." });
});
const PORT = process.env.PORT || 5050; //Setting PORT
require("./routes/task.routes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
