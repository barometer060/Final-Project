var DAL= require('./module.js')
var express= require('express')
var parser= require('body-parser');
var cors=require('cors');
var app=express();
app.use(parser.json());//
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.post('/readCategoryAds', function(req, res){
  
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    DAL.category(res,req.body.category);
    
})
app.post('/readCategoryAds1', function(req, res){
    
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    DAL.subcategory(res,req.body.category, req.body.subcategory);
    
})
app.post('/readUserData', function(req, res){
    console.log(req.body);
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    DAL.userData(res,req.body.userId);
})

app.post('/searchads', function(req, res){
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
    DAL.searchField(res,req.body.searchdata);
})

app.listen(8081,()=>{
    console.log("Server has started")
})