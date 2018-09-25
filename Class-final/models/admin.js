const MongoClient = require("mongodb").MongoClient;
const fr = require("fs");
const path = require("path");

exports.f1 = function() {
  const data1 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/electronics.json"))
  );
  const data2 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/properties.json"))
  );
  const data3 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/vehicles.json"))
  );
  const data4 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/others.json"))
  );
  const data5 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/securityQues.json"))
  );
  const data6 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/ads.json"))
  );
  const data7 = JSON.parse(
    fr.readFileSync(path.resolve(__dirname, "../data/users.json"))
  );
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      // col.collection("Electronics").insertMany(data1, true);
      // col.collection("Others").insertMany(data2, true);
      // col.collection("Property").insertMany(data3, true);
      // col.collection("Vehicles").insertMany(data4, true);
      // col.collection("securityQues").insertMany(data5, true);
      // col.collection("ad").insertMany(data6, true);
      // col.collection("userDetails").insertMany(data7, true);
      return true;
    })
    .catch(err => {
      throw err;
    });
};

exports.electronicsinsert = function(data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return collection("Electronics").insert(data);
    })
    .catch(err => {
      throw err;
    });
};

exports.othersinsert = function(data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return collection("Others").insert(data);
    })
    .catch(err => {
      throw err;
    });
};

exports.propertyinsert = function(data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return collection("Property").insert(data);
    })
    .catch(err => {
      throw err;
    });
};

exports.vehiclesinsert = function(data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return collection("Vehicles").insert(data);
    })
    .catch(err => {
      throw err;
    });
};

exports.displayElectronics = function() {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("Electronics")
        .find({ isAction: 0 })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.displayProperty = function() {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("Property")
        .find({ isAction: 0 })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.displayOthers = function() {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("Others")
        .find({ isAction: 0 })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.displayVehicles = function() {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("Vehicles")
        .find({ isAction: 0 })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.action = function(req, res) {
  var valueApproved;
  MongoClient.connect(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("adDatabase");
      var data = req.body.object;
      var y = { adId: data.adId };
      var cat = req.body.category;
      var i = req.body.i;
      coll
        .collection(`${cat}`)
        .update(y, { $set: { isAction: 1 } }, true, function(err, value) {
          if (err) throw err;
          else {
            console.log("isAction updated");
          }
          dbvar.close();
        });
      coll
        .collection(`${cat}`)
        .find(y)
        .toArray(function(err, value) {
          if (err) throw err;
          else {
            console.log("value" + value);
            valueApproved = value;
            console.log("him" + valueApproved);
            if (i == 1) {
              f2(valueApproved);
            }
          }
          dbvar.close();
        });

      dbvar.close();
    }
  );
};

function f2(valueApproved) {
  MongoClient.connect(
    "mongodb://localhost:27017/approved",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
      coll
        .collection("approvedData")
        .insert(valueApproved, function(err, value) {
          if (err) throw err;
          else {
            console.log("1 document inserted");
          }
          dbvar.close();
        });
    }
  );
}
