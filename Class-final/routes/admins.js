const router = require("express").Router();
const Admin = require("../models/admin");

async function insertData() {
  await Admin.f1();
}

insertData();

router.post("/electronics", async (req, res) => {
  const result = await Admin.displayElectronics();
  res.send(result);
});

router.post("/others", async (req, res) => {
  const result = await Admin.displayOthers();
  res.send(result);
});

router.post("/property", async (req, res) => {
  const result = await Admin.displayProperty();
  res.send(result);
});

router.post("/vehicles", async (req, res) => {
  const result = await Admin.displayVehicles();
  res.send(result);
});

router.post("/insert", async (req, res) => {
  Admin.action(req, res);
});

router.post("/insert/electronics", async (req, res) => {
  const data = req.body;
  const result = await Admin.electronicsinsert(data);
  res.send(result);
});

router.post("/insert/others", async (req, res) => {
  const data = req.body;
  const result = await Admin.othersinsert(data);
  res.send(result);
});

router.post("/insert/vehicles", async (req, res) => {
  const data = req.body;
  const result = await Admin.vehiclesinsert(data);
  res.send(result);
});

router.post("/insert/property", async (req, res) => {
  const data = req.body;
  const result = await Admin.electronicsinsert(data);
  res.send(result);
});

module.exports = router;
