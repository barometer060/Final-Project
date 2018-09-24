const MongoClient = require("mongodb").MongoClient;

exports.category = function(category) {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("ad")
        .find({ category: category })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.userData = function(userId) {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("userDetails")
        .find({ userId: userId })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.subcategory = function(category, subcategory) {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("ad")
        .find({ category: category, subCategory: subcategory })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.searchField = function(search) {
  const q = search;
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("ad")
        .find({
          $or: [
            { manufacturer: new RegExp(q, "i") },
            { description: new RegExp(q, "i") },
            { city: new RegExp(q, "i") },
            { location: new RegExp(q, "i") },
            { makeModel: new RegExp(q, "i") },
            { category: new RegExp(q, "i") },
            { subCategory: new RegExp(q, "i") }
          ]
        })
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};

exports.getAllAds = function() {
  return MongoClient.connect("mongodb://localhost:27017")
    .then(dbvar => {
      const col = dbvar.db("adDatabase");
      return col
        .collection("ad")
        .find({})
        .toArray();
    })
    .catch(err => {
      throw err;
    });
};
