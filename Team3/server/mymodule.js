var MongoClient = require("mongodb").MongoClient;

exports.electronicsinsert = function(data, res) {
  MongoClient.connect(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
      coll.collection("Electronics").insert(data, function(err, value) {
        if (err) throw err;
        else {
          console.log("1 document inserted");
        }
        //res.send(value);
        /*imageUpload(req)
        {
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var oldpath=files.filetoupload.path;
        console.log(files);
    })
        }*/
        dbvar.close();
      });
      dbvar.close();
    }
  );
};

exports.othersinsert = function(data) {
  MongoClient.connect(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
      coll.collection("Others").insert(data, function(err, value) {
        if (err) throw err;
        else {
          console.log("1 document inserted");
        }
        dbvar.close();
      });
      dbvar.close();
    }
  );
};

exports.propertyInsert = function(data) {
  MongoClient.connect(
    "mongodb://localhost:27017/emp",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
      coll.collection("Property").insert(data, function(err, value) {
        if (err) throw err;
        else {
          console.log("1 document inserted");
        }
        dbvar.close();
      });
      dbvar.close();
    }
  );
};

exports.vehiclesInsert = function(data) {
  MongoClient.connect(
    "mongodb://localhost:27017/",
    { useNewUrlParser: true },
    function(err, dbvar) {
      if (err) throw err;
      var coll = dbvar.db("temporary");
      coll.collection("Vehicles").insert(data, function(err, value) {
        if (err) throw err;
        else {
          console.log("1 document inserted");
        }
        dbvar.close();
      });
      dbvar.close();
    }
  );
};
