var mongo = require("mongodb").MongoClient;

exports.addSubCategory = (category, subCategory, userId) => {
  mongo.connect(
    "mongodb://localhost:27017/",
    (err, dbVar) => {
      if (err) throw err;

      var col = dbVar.db("users");
      col.collection("userDetails").update(
        { userId: userId },
        {
          $addToSet: {
            mySubCategories: { category: category, subCategory: subCategory }
          }
        }
      );
    }
  );
};

exports.addSubscribedUsers = (category, subCategory, userId) => {
  mongo.connect(
    "mongodb://localhost:27017/data",
    (err, dbVar) => {
      if (err) throw err;
      console.log("SDs");
      var col = dbVar.db("userDetails");
      col
        .collection("subscriptions")
        .update(
          { category: category, subCategory: subCategory },
          { $addToSet: { subscribedUsers: userId } }
        );
    }
  );
};
