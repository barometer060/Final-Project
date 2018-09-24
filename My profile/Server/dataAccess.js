var MongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/classified";
// exports.userFetch = function (id) {
//     return MongoClient.connect(mongoUrl, { useNewUrlParser: true }).then(dbVar => {
//         var db = dbVar.db('classified');
//         return db.collection('user').find({ 'userId': id }).toArray()
//     })
// }

exports.userFetch = function(id, x) {
  MongoClient.connect(
    mongoUrl,
    { useNewUrlParser: true },
    (err, dbvar) => {
      if (err) throw err;
      var dbase = dbvar.db("classified");
      dbase
        .collection("user")
        .find({ userId: id })
        .toArray((err, res) => {
          if (err) throw err;
          x(res[0]);
        });
    }
  );
};

exports.editUser = function(id, data) {
  MongoClient.connect(
    mongoUrl,
    { useNewUrlParser: true },
    (err, dbvar) => {
      if (err) throw err;
      var dbase = dbvar.db("classified");
      dbase.collection("user").updateOne(
        { userId: id },
        {
          $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: {
              city: data.address.city,
              landmark: data.address.landmark,
              pincode: data.address.pincode
            },
            dateOfBirth: data.dateOfBirth
          }
        }
      );
    }
  );
};
