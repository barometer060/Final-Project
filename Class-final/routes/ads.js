const router = require("express").Router();
const Ad = require("../models/ad");

router.post("/readCategoryAds", async (req, res) => {
  const result = await Ad.category(req.body.category);
  res.send(result);
});

router.post("/readCategoryAds1", async (req, res) => {
  const result = await Ad.subcategory(req.body.category, req.body.subcategory);
  res.send(result);
});

router.post("/readUserData", async (req, res) => {
  const result = await Ad.userData(req.body.userId);
  res.send(result);
});

router.post("/searchads", async (req, res) => {
  const result = await Ad.searchField(req.body.searchdata);
  res.send(result);
});

router.get("/getAllAds", async (req, res) => {
  const result = await Ad.getAllAds();
  // console.log(result);
  res.send(result);
});

module.exports = router;
