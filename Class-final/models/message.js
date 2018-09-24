const MongoClient = require("mongodb").MongoClient;

exports.mssg = function(data) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("messages")
        .update(
          { receiverId: data.receiverId, senderId: data.senderId },
          { $push: { msgArr: data.message } },
          { upsert: true }
        );
    })
    .catch(err => {
      throw err;
    });
};

exports.ReadMsgInbox = function(id) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("messages")
        .find({ receiverId: parseInt(id) })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.ReadMsgOutbox = function(id) {
  return MongoClient.connect("mongodb://localhost:27017/")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("messages")
        .find({ senderId: parseInt(id) })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};
