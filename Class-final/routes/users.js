const router = require("express").Router();
const User = require("../models/user");
const encrypt = require("md5");

router.post("/login", async (req, res) => {
  let allowLogin = false;
  let user = await User.dbread(req.body.emailId, req.body.password);
  user = user[0];
  if (!user) return res.status(400).send("Invalid login details");

  if (user.password === encrypt(req.body.password)) {
    allowLogin = true;
  }

  // if (allowLogin) return res.status(301).redirect("http://localhost:4200/");
  res.send(allowLogin);
});

router.get("/forgot/questions", async (req, res) => {
  const result = await User.Questions();
  res.send({ myObj: result });
});

router.post("/forgot/questionsVerify", async (req, res) => {
  const result = await User.findemail(req.body.emailId);
  if (result.length > 0) {
    if (
      parseInt(req.body.quesId) === result[0].quesId &&
      req.body.answer === result[0].answer
    ) {
      res.send({ verifyData: true });
    }
  }
  res.send({ verifyData: false });
});

router.post("/forgot/changePassword", async (req, res) => {
  const result = await User.newPass(req.body.emailId, req.body.newPassword);
  if (JSON.parse(result).nModified === 1) res.send({ confirmUpdate: true });
});

router.post("/signUp/emailId", async (req, res) => {
  const avalEmail = await User.isEmailAvailable1(req.body.emailId);
  res.send({ email: avalEmail });
});

router.post("/signUp/phoneNumber", async (req, res) => {
  const avalPhone = await User.isPhoneAvailable1(req.body.phoneNumber);
  res.send({ phone: avalPhone });
});

router.put("/signUp/insertUserDetails", async (req, res) => {
  const result = await User.addUserDetails(req.body);
  res.send(result);
});

router.get("/signUp/securityQ", async (req, res) => {
  const result = await User.getQuestions();
  res.send(result);
});

router.post("/userdetails", async (req, res) => {
  const result = await User.userFetch(req.body.userId);
  res.send(result[0]);
});

router.post("/edituserdetails", async (req, res) => {
  const result = await User.editUser(req.body.userId, req.body);
  console.log(result);
  res.send(result);
});

router.get("/getSubscribedAds/:id", async (req, res) => {
  const result = await User.getSubscriptions(req.params.id);
  res.send(result);
});

router.post("/subscribeAd", async (req, res) => {
  const result = await User.addSubscriptions(req.body.userId, req.body.adId);
  res.send(result);
});

router.get("/getAds/:id", async (req, res) => {
  const result = await User.getAds(req.params.id);
  res.send(result);
});

module.exports = router;
