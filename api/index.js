const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();
const routes = require("./routes/routes")

var corsOptions = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port "+process.env.PORT||3001);
});


app.use("/", routes);




