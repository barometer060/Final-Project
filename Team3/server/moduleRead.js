var MongoClient=require('mongodb').MongoClient;

//Read electronics
exports.displayElectronics= function(res)
{
    MongoClient.connect('mongodb://localhost:27017/temporary',function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('Electronics').find({"isAction":0}).toArray(function(err,value){
            if(err) throw err;
            else
            {
                console.log(value);
                res.send(value);
            }
            dbvar.close();
        })
        dbvar.close() 
    })
}

//Read Property
exports.displayProperty= function(res){
    MongoClient.connect('mongodb://localhost:27017/temporary',function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('Property').find({"isAction":0}).toArray(function(err,value){
            if(err) throw err;
            else
            {
                console.log(value);
                res.send(value);
            }
            dbvar.close();
        });
        dbvar.close();
    })
}

//Read Vehicles
exports.displayVehicles= function(res){
    MongoClient.connect('mongodb://localhost:27017/temporary',function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('Vehicles').find({"isAction":0}).toArray(function(err,value){
            if(err) throw err;
            else
            {
                console.log(value);
                res.send(value);
            }
            dbvar.close();
        });
        dbvar.close();
    })
}

//Read Others
exports.displayOthers= function(res){
    MongoClient.connect('mongodb://localhost:27017/temporary',function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('Others').find({"isAction":0}).toArray(function(err,value){
            if(err) throw err;
            else
            {
                console.log(value);
                res.send(value);
            }
            dbvar.close();
        });
        dbvar.close();
    })
}


/*//Read Data
exports.displayElectronics= function(res,cat)
{   var cat=cat
    MongoClient.connect('mongodb://localhost:27017/emp',function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection(cat).find({"isApproved":0}).toArray(function(err,value){
            if(err) throw err;
            else
            {
                console.log(value);
                res.send(value);
            }
            dbvar.close();
        })
        dbvar.close() 
    })
}
*/
