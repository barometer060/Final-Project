var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/userManagement";
var encrypt = require("md5");
const uuidv4 = require("uuid/v4");

exports.dbread = function(id, x) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, dbvar) => {
      if (err) throw err;

      var dbase = dbvar.db("userManagement");

      dbase
        .collection("loginCredentials")
        .find({ emailId: id })
        .toArray((err, result) => {
          //console.log(result);

          x(result[0]);
        });
    }
  );
};

exports.readUserId = function(id, x) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, dbvar) => {
      if (err) throw err;

      var dbase = dbvar.db("userManagement");

      dbase
        .collection("userDetails")
        .find({ emailId: id })
        .toArray((err, result) => {
          //console.log(result);

          x(result[0]);
        });
    }
  );
};

exports.Questions = function(x) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/userManagement";

  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbobj = db.db("userManagement");
      dbobj
        .collection("securityQuestions")
        .find({})
        .toArray(function(err, result) {
          if (err) throw err;
          //
          x(result);
          db.close();
        });
    }
  );
};

exports.findemail = function(emailId, x) {
  MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      var dbobj = db.db("userManagement");
      // console.log(emailId)
      // var query= {emailId:emailId};
      dbobj
        .collection("loginCredentials")
        .find({ emailId: emailId })
        .toArray(function(err, result) {
          if (err) throw err;
          // console.log(result);
          x(result);
          db.close();
        });
    }
  );
};

exports.newPass = function(emailId, newPassword, x) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, db) {
      if (err) throw err;
      var dbobj = db.db("userManagement");
      var query = { emailId: emailId };
      dbobj
        .collection("loginCredentials")
        .updateOne(
          query,
          { $set: { password: encrypt(newPassword) } },
          true,
          function(err, result) {
            if (err) throw err;
            console.log(result);
            x(result);
            db.close();
          }
        );

      // dbobj.collection("loginCredentials").updateOne(query,{$set:{"password":password}})
      //     .then(function())
    }
  );
};

var mongourl = "mongodb://localhost:27017/";

module.exports.addUserDetails = function(data) {
  return MongoClient.connect(
    mongourl,
    { useNewUrlParser: true }
  )
    .then(dbobj => {
      // if (err) throw err;
      console.log(data);
      var db = dbobj.db("userManagement");
      var uid = uuidv4();
      db.collection("loginCredentials").insertOne(
        {
          userId: uid,
          emailId: data.emailId,
          password: encrypt(data.password),
          quesId: data.securityQ,
          answer: data.answer
        },
        true
      );
      // , (err, res) => {
      //     if (err) throw err;
      //     console.log(res);
      // })

      return db
        .collection("userDetails")
        .insertOne(
          {
            userId: uid,
            myAds: [],
            subscriptions: [],
            mailBox: [],
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: {
              city: data.city,
              landmark: data.landmark,
              pincode: data.pincode
            },
            emailId: data.emailId,
            dateOfBirth: data.dateOfBirth
          },
          true
        );
      //(err, res) => {
      //     if (err) throw err;
      //     console.log(res);

      //     user = { "userId": uid, "subscriptions": [], "mailBox": [], "firstName": data.firstName, "lastName": data.lastName, "phoneNumber": data.phoneNumber, "address": { "city": data.city, "landmark": data.landmark, "pincode": data.pincode }, "emailId": data.emailId, "dateOfBirth": data.dateOfBirth }

      // })
    })
    .catch(err => {
      throw err;
    });
};

var dbConnection = MongoClient.connect(
  mongourl,
  { useNewUrlParser: true }
);

module.exports.isPhoneAvailable1 = function(phone) {
  return dbConnection
    .then(dbobj => {
      var db = dbobj.db("userManagement");
      return db
        .collection("userDetails")
        .find({ phoneNumber: phone })
        .count();
    })
    .then(count => {
      return count;
    })
    .catch(err => console.log(err));
};

module.exports.isEmailAvailable1 = phone => {
  return dbConnection
    .then(dbobj => {
      var db = dbobj.db("userManagement");
      console.log(phone);
      return db
        .collection("userDetails")
        .find({ emailId: phone })
        .count();
      // if(cnt ===0){
      //     console.log(cnt)
      //     return true;
      // }else{
      //     console.log(cnt)
      //     return false
      // }
    })
    .then(count => {
      return count;
    })
    .catch(err => console.log(err));
};

module.exports.getQuestions = function() {
  return dbConnection.then(dbobj => {
    var db = dbobj.db("userManagement");
    return db
      .collection("securityQuestions")
      .find({})
      .toArray();
  }); //.then(dat=> { console.log(dat); return dat;}).catch(err => console.log(err));
};
