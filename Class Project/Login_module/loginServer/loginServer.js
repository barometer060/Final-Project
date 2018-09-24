var exp = require("express");
var app = exp();
var cors = require("cors");
var parser = require("body-parser");
var loginMod = require("./userMgmt");
var session = require("express-session");
var encrypt = require("md5");

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "SOMERANDOMSECRETHERE",
    cookie: { maxAge: 6000000 }
  })
);

app.post("/rest/api/login/", (req, res) => {
  res.header("Access-Control-Allow-origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );

  var id = req.body.emailId;

  var pwd = req.body.password;

  console.log(id);

  console.log(pwd);

  var allowLogin = false;

  loginMod.dbread(id, user => {
    console.log(user);

    if (user) {
      if (user.password == encrypt(pwd)) {
        console.log("Logged in");

        allowLogin = true;
      } else {
        console.log("Incorrect credentials.");
        allowLogin = false;
      }
    } else {
      console.log("Incorrect credentials.1");
      allowLogin = false;
    }

    //console.log(allowLogin);

    res.send({ loginPerm: allowLogin });

    //var userId = 'abc123';

    if (allowLogin) {
      loginMod.readUserId(id, user => {
        // req.session.userId = user.userId;
        // console.log(req.sessionID)
      });
    }

    //else console.log(req.sessionID)

    res.end();
  });

  //console.log(allowLogin)
});

app.get("/rest/api/forgot/questions", (req, res) => {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  loginMod.Questions(user => {
    console.log(user);
    res.send({ myObj: user });
    res.end();
  });
});

app.post("/rest/api/forgot/questionsVerify", (req, res) => {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  console.log(req.body);

  loginMod.findemail(req.body.emailId, user => {
    console.log(user);
    if (user.length > 0) {
      if (
        req.body.quesId == user[0].quesId &&
        req.body.answer == user[0].answer
      ) {
        res.send({ verifyData: true });
        console.log("True");
      } else {
        res.send({ verifyData: false });
        console.log("False");
      }
    } else res.send({ verifyData: false });
  });
});

app.post("/rest/api/forgot/changePassword", (req, res) => {
  res.header("Access-Control-Allow-origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  console.log(req.body);

  loginMod.newPass(req.body.emailId, req.body.newPassword, user => {
    if (JSON.parse(user).nModified == 1) {
      res.send({ confirmUpdate: true });
    }
  });
});

app.post("/rest/api/signUp/emailId", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );
  //var avalEmail;
  var avalPhone;

  var avalEmail = await loginMod.isEmailAvailable1(req.body.emailId);
  console.log(avalEmail);

  //avalPhone = await loginMod.isPhoneAvailable1(req.body.phoneNumber)
  var result = {
    email: avalEmail
  };

  res.send(JSON.stringify(result));
});

app.post("/rest/api/signUp/phoneNumber", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );
  //var avalEmail;
  var avalPhone;

  //var avalEmail = await loginMod.isEmailAvailable1(req.body.emailId)
  avalPhone = await loginMod.isPhoneAvailable1(req.body.phoneNumber);
  var result = {
    phone: avalPhone
  };

  res.send(JSON.stringify(result));
});

app.put("/rest/api/signUp/insertUserDetails", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );

  try {
    console.log("in put");
    var resp = await loginMod.addUserDetails(req.body);
    console.log(resp);
    res.send(JSON.stringify(resp));
  } catch (err) {
    throw err;
  }
  //res.end("inserted in DB");
});

app.get("/rest/api/signUp/securityQ", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );

  var ques = await loginMod.getQuestions();
  //console.log(ques)
  res.send(ques);
  res.end("data is sent");
});

app.use(cors()).listen(6324, () => {
  console.log("Server is running");
});
