var fr = require("fs");
var MongoClient = require("mongodb").MongoClient;
exports.f1 = function() {
  var data1 = JSON.parse(fr.readFileSync("electronic.json"));
  var data2 = JSON.parse(fr.readFileSync("property.json"));
  var data3 = JSON.parse(fr.readFileSync("vehicles.json"));
  var data4 = JSON.parse(fr.readFileSync("others.json"));
  MongoClient.connect(
    "mongodb://localhost:27017/temporary",
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
      coll.collection("Electronics").insert(data1, true, function(err, value) {
        if (err) throw err;
        console.log("document loaded in database");
        dbvar.close();
      });

      coll.collection("Property").insert(data2, true, function(err, value) {
        if (err) throw err;
        console.log("document loaded in database");
        dbvar.close();
      });

      coll.collection("Vehicles").insert(data3, true, function(err, value) {
        if (err) throw err;
        console.log("document loaded in database");
        dbvar.close();
      });

      coll.collection("Others").insert(data4, true, function(err, value) {
        if (err) throw err;
        console.log("document loaded in database");
        dbvar.close();
      });
      dbvar.close();
    }
  );
};
