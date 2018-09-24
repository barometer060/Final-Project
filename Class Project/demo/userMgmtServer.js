var exp=require('express');
var app=exp();
var cors=require('cors');
var parser=require('body-parser');
var userMod = require('./userMgmtModule');
var encrypt = require('md5');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


//login-----------------------------------------------------------------------------------
app.post('/rest/api/login/', async (req,res)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    var id = req.body.emailId;
    var pwd = (req.body.password);
console.log(id);
    console.log(pwd);
    var allowLogin=false;
    await userMod.dbread(id, (user)=>{
       
        console.log(user);
        if(user){
            if(user.password == encrypt(pwd)){
                console.log('Logged in');
                allowLogin=true;
            }
            else console.log('Incorrect credentials.')
        }
        else console.log('Incorrect credentials.1')
        //console.log(allowLogin);
        res.send({loginPerm: allowLogin});
        res.end()
    });
    console.log(allowLogin)
    
}
)
//signup------------------------------------------------------------------------------------------------------
app.post("/rest/api/signUp/emailId", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"),
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
    //var avalEmail; 
    var avalPhone;

    var avalEmail = await userMod.isEmailAvailable1(req.body.emailId)
    //avalPhone = await dal.isPhoneAvailable1(req.body.phoneNumber)
    var result = {
        "email": avalEmail

    }

    res.send(JSON.stringify(result))

})

app.post("/rest/api/signUp/phoneNumber", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"),
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
    //var avalEmail; 
    var avalPhone;

    //var avalEmail = await dal.isEmailAvailable1(req.body.emailId)
    avalPhone = await userMod.isPhoneAvailable1(req.body.phoneNumber)
    var result = {

        "phone": avalPhone
    }

    res.send(JSON.stringify(result))

})


app.put("/rest/api/signUp/insertUserDetails", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"),
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")

    try {
        var resp = await userMod.addUserDetails(req.body)
        console.log(resp)
        res.send(JSON.stringify(resp));
    }
    catch (err) {
        throw err
    }
    //res.end("inserted in DB");
})

app.get("/rest/api/signUp/securityQ", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*"),
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
    var ques = await userMod.getQuestions();
    //console.log(ques)
    res.send((ques));
    res.end('data is sent');
})
//forgot----------------------------------------------------------------
app.get('/rest/api/forgot/questions',(req,res)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    userMod.Questions((user)=>{
        console.log(user);
         res.send({myObj:user});
         res.end()
        
    });
})

app.post('/rest/api/forgot/questionsVarify',(req,res)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    console.log(req.body);
  
    userMod.findemail(req.body.emailId,(user)=>{
        console.log(user);
        if(user.length>0){
        if(req.body.quesId==user[0].qId && req.body.answer==user[0].answer)
        {
           res.send({verifyData:true})
        }
        else
        {
            res.send({verifyData:false})
        }
    }
    else res.send({verifyData:false});
    })
})

app.post('/rest/api/forgot/changePassword',(req,res)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    console.log(req.body);
  
    userMod.newPass(req.body.emailId, req.body.newPassword,(user)=>
    {
       if(JSON.parse(user).nModified==1){
        res.send({confirmUpdate:true})
       }
    
    }
    );
    })








app.use(cors()).listen(6324,()=>{
    console.log('Server is running')
})
