var express = require("express");
var app = express();
var cors = require("cors");
var parser = require("body-parser");
var mod = require("./moduleRead");
var mod1 = require("./moduleaction");
var mod2 = require("./moduleReadDataFromJson");
var dal = require("./mymodule.js");
var formidable = require("formidable");
var fs = require("fs");
var multer = require("multer");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

//require the express router
var router = express.Router();
//require multer for the file uploads
var multer = require("multer");
// set the directory for the uploads to the uploaded to
var DIR = "./uploads/";
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ dest: DIR }).single("photo");
/* GET home page. */

router.get("/", function(req, res, next) {
  // render the index page, and pass data to it.
  res.render("index", { title: "Express" });
});

//our file upload function.
router.post("/", function(req, res, next) {
  var path = "";
  upload(req, res, function(err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured");
    }
    // No error occured.
    path = req.file.path;
    return res.send("Upload Completed for " + path);
  });
});
module.exports = router;

// var Storage = multer.diskStorage({
//      destination: function(req, file, callback) {
//          callback(null, "../Images");

//      },
//      filename: function(req, file, callback) {
//          callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//         // console.log(file);
//      }

//  });

// var upload = multer({
//      storage: Storage
//  }).array("imgUploader", 3); //Field name and max count

//  app.get("/", function(req, res) {
//      res.sendFile(__dirname + "/index.html");
//  });

//  app.post("/api/Upload", function(req, res) {
//      upload(req, res, function(err) {
//          if (err) throw err;
//              //return res.end("Something went wrong!");

//          console.log("data uploded succesfully");
//          //return res.end("jagdfjg"+Storage.filename);

//  });
//  });

mod2.f1();

app.get("/electronics", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  mod.displayElectronics(res);
});

app.use(parser.json());

app.get("/property", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  mod.displayProperty(res);
});

app.get("/vehicles", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  mod.displayVehicles(res);
});

app.get("/others", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  mod.displayOthers(res);
});
app.post("/insert", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  mod1.action(req, res);
});

//-----insert------------//

app.post("/insert/electronics", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );

  data = req.body;
  //imageUpload(req);

  dal.electronicsinsert(data);
});

app.post("/insert/others", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );

  data = req.body;

  dal.othersinsert(data, res);
  //res.send(value);
});

app.post("/insert/property", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  data = req.body;
  dal.propertyInsert(data);
});

app.post("/insert/vehicles", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  data = req.body;
  dal.vehiclesInsert(data);
});

/*imageUpload =function(req)
{
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var oldpath=files.filetoupload.path;
        console.log(files);
    })
}
*/

/*app.post('/fileupload',function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(function (err, fields, files) {

//file.filetoupload.path
    if(err) throw err;
    else
    {
//var oldpath = files.filetoupload.path;

//var newpath = files.filetoupload.path+".jpeg"

    console.log(files);

}

})
})
*/

app.use(cors()).listen(1234, () => {
  console.log("running");
});
/*
//Insert Data
function f1()
{
    var data1=JSON.parse(fr.readFileSync('electronic.json'));
    var data2=JSON.parse(fr.readFileSync('property.json'));
    var data3=JSON.parse(fr.readFileSync('vehicles.json'));
    var data4=JSON.parse(fr.readFileSync('others.json'));
    MongoClient.connect('mongodb://localhost:27017/temporary',function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('Electronics').insert(data1,true,function(err,value){
            if(err) throw err;
            console.log("document loaded in database");
            dbvar.close();
        })

        coll.collection('Property').insert(data2,true,function(err,value){
            if(err) throw err;
            console.log("document loaded in database");
            dbvar.close();
        })

         coll.collection('Vehicles').insert(data3,true,function(err,value){
            if(err) throw err;
            console.log("document loaded in database");
            dbvar.close();
        })

         coll.collection('Others').insert(data4,true,function(err,value){
            if(err) throw err;
            console.log("document loaded in database");
            dbvar.close();
        })
        dbvar.close();
    })
}
*/

//--------------------display for products------------------------//
/*
app.post('/getads',(req,res)=>{
    console.log(req.body)
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
})

*/
/*
app.get('/electronics',(req,res)=>{    
    console.log("called")
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    mod.displayElectronics(res,Electronics)
})
*/

//------------------------delete----------------//

/*app.post('/delete/electronics',(req,res)=>{
    
    
    console.log(req.body);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    MongoClient.connect('mongodb://localhost:27017/temporary',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('electronics').deleteOne(req.body,function(err,value){
            if(err) throw err;
            else
            {
                console.log("1 document deleted");
                
            }
            dbvar.close();
        });
        dbvar.close();
    })
});


app.post('/delete/property',(req,res)=>{
    
    
    console.log(req.body);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    MongoClient.connect('mongodb://localhost:27017/temporary',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('property').deleteOne(req.body,function(err,value){
            if(err) throw err;
            else
            {
                console.log("1 document deleted");
                
            }
            dbvar.close();
        });
        dbvar.close();
    })
});

app.post('/delete/vehicles',(req,res)=>{
    console.log(req.body);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    MongoClient.connect('mongodb://localhost:27017/temporary',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('vehicles').deleteOne(req.body,function(err,value){
            if(err) throw err;
            else
            {
                console.log("1 document deleted");
                
            }
            dbvar.close();
        });
        dbvar.close();
    })
});


app.post('/delete/others',(req,res)=>{
    
    
    console.log(req.body);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    MongoClient.connect('mongodb://localhost:27017/temporary',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection('others').deleteOne(req.body,function(err,value){
            if(err) throw err;
            else
            {
                console.log("1 document deleted");
                
            }
            dbvar.close();
        });
        dbvar.close();
    })
})
*/

/* MongoClient.connect('mongodb://localhost:27017/approved',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        var data = req.body.object; 
        var y = {"adId":data.adId};
        var cat=req.body.category;
        var i=req.body.i;
        coll.collection(`${cat}`).update(y,{$set:{"isAction":1}},true,function(err,value){
            if(err) throw err;
            else
            {
                console.log("isAction updated");    
            }
            dbvar.close();
        });
        coll.collection(`${cat}`).find(y).toArray(function(err,value){
            if(err) throw err;
            else
            {
                //console.log("value"+value);
                valueApproved=value;
                //console.log("him"+valueApproved)
                if(i==1){
                f2(valueApproved);
                }
            }
            dbvar.close();
        })
        
        
        dbvar.close();
    }) 
})

//Insert Value in new collection
function f2(valueApproved)
{
    MongoClient.connect('mongodb://localhost:27017/approved',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
    var coll=dbvar.db('temporary');
        coll.collection('approvedData').insert(valueApproved,function(err,value){
            if(err) throw err;
            else
            {
                console.log("1 document inserted");
            }
            dbvar.close();
        });
    });
}
*/
/*
app.post('/delete',(req,res)=>{
    console.log(req.body.cat)
    console.log(req.body.query)
    var query= req.body.query
    var category= req.body.cat
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width,Content-Type,Accept");
    MongoClient.connect('mongodb://localhost:27017/temporary',{ useNewUrlParser: true },function(err,dbvar){
        if(err) throw err;
        var coll=dbvar.db('temporary');
        coll.collection(`${category}`).deleteOne(query,function(err,value){
            if(err) throw err;
            else
            {
                console.log("1 document deleted");
                
            }
            dbvar.close();
        });
        dbvar.close();
    })
});
*/
