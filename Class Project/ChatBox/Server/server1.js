var exp = require("express");
var app = exp();
var fun = require("./module.js");
var parser = require("body-parser");
var cors = require("cors");

app.use(parser.json());

app.post("/message", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  fun.mssg(req.body);
});

app.get("/rest/api/readmsg/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );

  fun.ReadMsgInbox(req.params.id, res);
});

app.get("/rest/api/readmsgOut/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );

  fun.ReadMsgOutbox(req.params.id, res);
});

//starting the server

app.use(cors()).listen(8081, () => {
  console.log("Express Started");
});
