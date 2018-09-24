var MongoClient = require('mongodb').MongoClient;

exports.category = function (res, category) {
    MongoClient.connect('mongodb://localhost:27017/adFinalData', function (err, db) {
        if (err) throw err;
        var coll = db.db('adFinalData');
        coll.collection('ad').find({ "category": category }).toArray(function (err, data) {
            if (err) throw err;
            res.send(data);
            db.close();
        });
        db.close();
    })
}

exports.searchField = function (res, search) {
    console.log(search);
    var q = search;
    MongoClient.connect('mongodb://localhost:27017/adFinalData', function (err, db) {
        if (err) throw err;
        var coll = db.db('adFinalData');
        coll.collection('ad').find({
            "$or": [{ "manufacturer": new RegExp(q, "i") }, { "description": new RegExp(q, "i") }, { "city": new RegExp(q, "i") },
            { "location": new RegExp(q, "i") },
            { "makeModel": new RegExp(q, "i") },
            { "category": new RegExp(q, "i") },
            { "subCategory": new RegExp(q, "i") },
            ]
        }).toArray(function (err, data) {
            if (err) throw er
            res.send(data);
            console.log(data);
            console.log("The data is sent successfully");
            db.close();
        })
        db.close();
    })
}
exports.userData = function (res, userId) {
    MongoClient.connect('mongodb://localhost:27017/adFinalData', function (err, db) {
        if (err) throw err;
        var coll = db.db('adFinalData');

        coll.collection('userData').find({ "userId": userId }).toArray(function (err, data) {
            if (err) throw err;

            res.send(data);
            db.close();
        });
        db.close();
    })
}

exports.subcategory=function(res,category, subcategory){
    MongoClient.connect('mongodb://localhost:27017/adFinalData', function(err,db){
            if (err) throw err;
            var coll= db.db('adFinalData');
            coll.collection('ad').find({"category":category,"subCategory":subcategory}).toArray(function(err,data){
                if (err) throw err;
                res.send(data);
                db.close();
            });
            db.close();
        })
    }


