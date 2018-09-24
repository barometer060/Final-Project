const MongoClient = require("mongodb").MongoClient;
const uuidv4 = require("uuid/v4");
const encrypt = require("md5");

exports.dbread = function(id) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("loginCredentials")
        .find({ emailId: id })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.readUserId = function(id) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("usersDetails")
        .find({ emailId: id })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.Questions = function() {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("securityQuestions")
        .find({})
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.findemail = function(emailId) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("loginCredentials")
        .find({ emailId: emailId })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.newPass = function(emailId, newPassword) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("loginCredentials")
        .updateOne(
          { emailId: emailId },
          { $set: { password: encrypt(newPassword) } },
          true
        );
    })
    .catch(err => {
      throw err;
    });
};

exports.addUserDetails = function(data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      const uid = uuidv4();
      col.collection("loginCredentials").insertOne({
        userId: uid,
        emailId: data.emailId,
        password: encrypt(data.password),
        quesId: data.securityQ,
        answer: data.answer
      });

      return db.collection("userDetails").insertOne(
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
    })
    .catch(err => {
      throw err;
    });
};

exports.isPhoneAvailable1 = function(phone) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("userDetails")
        .find({ phoneNumber: phone })
        .count();
    })
    .catch(err => {
      throw err;
    });
};

exports.isEmailAvailable1 = function(email) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("userDetails")
        .find({ emailId: email })
        .count();
    })
    .catch(err => {
      throw err;
    });
};

exports.getQuestions = function() {
  return dbConnection
    .then(dbobj => {
      var db = dbobj.db("adDatabase");
      return db
        .collection("securityQuestions")
        .find({})
        .toArray();
    })
    .cath(err => {
      throw err;
    });
};

exports.userFetch = function(id, x) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("userDetails")
        .find({ userId: id })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.editUser = function(id, data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col.collection("userDetails").updateOne(
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
    })
    .catch(err => {
      throw err;
    });
};
