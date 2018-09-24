var app = require("express")();
var cors = require("cors");
app.use(cors());
var parser = require("body-parser");
app.use(parser.json());
var dataAccess = require("./DataAccessLayer.js");
var session = require("express-session");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "SOMERANDOMSECRETHERE",
    cookie: { maxAge: 6000000 }
  })
);
app.get("/rest/api", (req, res) => {
  console.log(req);
  req.session.userId = "1009";

  //console.log("ABCD");
  console.log(req);

  res.redirect("http://localhost:1234/mongo/api");
});

app.get("/mongo/api", (req, res) => {
  dataAccess.addSubscribedUsers("electronics", "tv", req.session.userId);
  dataAccess.addSubCategory("electronics", "others", req.session.userId);

  res.send("Working");
});

app.listen(1234, () => {
  console.log("Express Started");
});
