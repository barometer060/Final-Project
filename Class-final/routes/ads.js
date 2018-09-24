const router = require("express").Router();
const Ad = require("../modules/ad");

router.post("/readCategoryAds", async (req, res) => {
  const result = await Ad.category(req.body.category);
  res.send(result);
});

router.post("/readCategoryAds1", async (req, res) => {
  const result = await Ad.subcategory(req.body.category, req.body.subcategory);
  res.send(result);
});

router.post("/readUserData", async (req, res) => {
  const result = await Ad.userData(req.bodu.userId);
  res.send(result);
});

router.post("/searchads", async (req, res) => {
  const result = await Ad.searchField(req.bodu.searchdata);
  res.send(result);
});

module.exports = router;
