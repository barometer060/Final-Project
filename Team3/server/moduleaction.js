var MongoClient = require("mongodb").MongoClient;

exports.action = function(req, res) {
  var valueApproved;
  MongoClient.connect(
    "mongodb://localhost:27017/approved",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
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

//Insert Value in new collection
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
