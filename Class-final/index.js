const express = require("express");
const app = express();
const cors = require("cors");
const parser = require("body-parser");
const messages = require("./routes/messages");
const users = require("./routes/users");
const admins = require("./routes/admins");

app.use(parser.json());
app.use(cors());

app.use("/rest/api/messages", messages);
app.use("/rest/api/users/", users);
app.use("/rest/api/admins", admins);

app.listen(8000, err => {
  if (err) throw err;
  console.log("Server running on PORT 8000");
});
