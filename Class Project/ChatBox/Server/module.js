var MongoClient = require('mongodb').MongoClient;

exports.mssg=function(data){

MongoClient.connect('mongodb://localhost:27017/messages', { useNewUrlParser: true },(err,document)=>{
    if(err) throw err;
    var col1 = document.db('messages');
    col1.collection('messages').update({"receiverId":data.receiverId,"senderId":data.senderId},{$push:{"msgArr":data.message}},{"upsert":true},function(data){
      console.log("1 data added successfully "+data);
    })
  });

}

exports.ReadMsgInbox= function(id,res){
    MongoClient.connect('mongodb://localhost:27017/',{ useNewUrlParser: true }, function(err,dbvar){
            if(err) throw err;
            
            var coll = dbvar.db('messages');
            coll.collection('messages').find({"receiverId":parseInt(id)}).toArray(function(err,data){
                if(err) throw err;
                
                // data = data[0];
                console.log(data)
                //console.log(data.msgArr[1]);
                res.send(data);
                dbvar.close();
            })
            dbvar.close();
    })
}

exports.ReadMsgOutbox = function(id, res){
    MongoClient.connect('mongodb://localhost:27017/',{ useNewUrlParser: true }, function(err,dbvar){
        if(err) throw err;

        var coll = dbvar.db('messages');
        coll.collection('messages').find({"senderId": parseInt(id)}).toArray(function(err,data){
            if(err) throw err;

            console.log(data)

            res.send(data);
            dbvar.close();
        })
            dbvar.close();
    } )
}
