var app = require("express")();
var cors = require("cors");
var parser = require("body-parser");
var userMod = require("./dataAccess");

app.use(parser.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// app.post('/rest/api/userdetails',async (req,res)=>{
//     //let data;
//    res.header("Access-Control-Allow-origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
//     var data = await userMod.userFetch(req.body.userId);
//     console.log(data)
//     res.send(data);
// }
// );

app.post("/rest/api/userdetails", (req, res) => {
  //let data;
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  userMod.userFetch(req.body.userId, data => {
    console.log(data);
    res.send(data);
  });
});

app.post("/rest/api/edituserdetails", async (req, res) => {
  const result = await User.editUser(req.body.userId, req.body);
  res.send(result);
});

app.use(cors()).listen(6234, () => {
  console.log("Server running...");
});
