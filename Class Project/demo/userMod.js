var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/userManagement';
const uuidv4 = require('uuid/v4');
var md5 = require('md5');

exports.dbread = function(id,x){
    MongoClient.connect(url, {useNewUrlParser:true},(err,dbvar)=>{
        if(err) throw err;
        var dbase = dbvar.db('userManagement');
        dbase.collection('loginCredentials').find({'emailId':id}).toArray((err, result)=>{
            //console.log(result);
            x(result[0]);
        })
    })   
}


//signup-dal----------------
module.exports.addUserDetails = function (data) {
    return MongoClient.connect(url, { useNewUrlParser: true }).then( (dbobj) => {
        // if (err) throw err;
        var db = dbobj.db('userManagement');
        var uid = uuidv4()
        db.collection('loginCredentials').insertOne({ "userId": uid, "emailId": data.emailId, "password": md5(data.password), "securityQ": data.securityQ, "answer": data.answer }, true)
        // , (err, res) => {
        //     if (err) throw err;
        //     console.log(res);
        // })

         return db.collection('userDetails').insertOne({ "userId": uid, "subscriptions": [], "mailBox": [], "firstName": data.firstName, "lastName": data.lastName, "phoneNumber": data.phoneNumber, "address": { "city": data.city, "landmark": data.landmark, "pincode": data.pincode }, "emailId": data.emailId, "dateOfBirth": data.dateOfBirth }, true) 
    }).catch(err=>{throw err})
}

var dbConnection = MongoClient.connect(url, { useNewUrlParser: true });

module.exports.isPhoneAvailable1 = function (phone) {
    return dbConnection
        .then(dbobj => {

            var db = dbobj.db('userManagement');
            db.collection('userDetails').find({ phoneNumber: phone }).count()
        }).then(count => { if (count == 1) return false; else { return true } }).catch(err => console.log(err));

}

module.exports.isEmailAvailable1 = function (phone) {
    return dbConnection
        .then(dbobj => {

            var db = dbobj.db('userManagement');

            db.collection('userDetails').find({ emailId: phone }).count()
        }).then(count => { if (count == 1) return false; else { return true } }).catch(err => console.log(err));

}
module.exports.getQuestions = function () {
    return dbConnection
        .then(dbobj => {
            var db = dbobj.db('userManagement');
            return db.collection('securityQuestions').find({}).toArray()
        })}

//forgot----------------------------------------
exports.findemail=function(emailId,x){
MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbobj= db.db("userManagement");
    // console.log(emailId)
    // var query= {emailId:emailId};
    dbobj.collection("loginCredentials").find({'emailId':emailId}).toArray(function(err,result){
        if(err) throw err;
        // console.log(result);
        x(result);
        db.close();
    })
});
}


// Securtity question will be sent to questions list//
exports.Questions = function (x) {
var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost:27017/userManagement';

MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbobj= db.db("userManagement");
    dbobj.collection("securityQuestions").find({}).toArray(function(err,result){
        if(err) throw err;
        // 
        x(result)
        db.close();
    })
});

}


// //Updating the new password


exports.newPass = function (emailId,newPassword,x){

MongoClient.connect(url,{useNewUrlParser:true},function(err,db){
    if (err) throw err;
    var dbobj= db.db("userManagement");
    var query= {'emailId':emailId};
    dbobj.collection("loginCredentials").updateOne(query,{$set:{"password":newPassword}},true,function(err,result){
        if(err) throw err;
        console.log(result);
        x(result);
        db.close();
    });

    // dbobj.collection("loginCredentials").updateOne(query,{$set:{"password":password}})
    //     .then(function())
});
}
