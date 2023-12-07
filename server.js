const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const routeUsers = require ("./routes/user.routes.js")

const app = express();



app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

/* app.user('/usuarios', routeUsers) */
require("./routes/pok.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/send.routes.js")(app);
require("./routes/address.routes.js")(app);
require("./routes/productos.routes.js")(app);
require("./routes/todoList.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
