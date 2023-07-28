const express = require('express');
const app = express();
const fs=require('fs');
var session = require('express-session');
app.use("view engine","ejs");
app.use(express.json());//take out the data and add in the request as the name of the body
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

  app.get('/', function (req, res) {
    if(!checkLoggedIn(req)){
        res.redirect('/login');
        return;
    }
    res.sendFile(__dirname + "/home.html");
});
app.get('/home', function (req, res) {
    if(!checkLoggedIn(req)){
        res.redirect('/login');
        return;
    }
    res.sendFile(__dirname + "/home.html");
});
app.get('/script.js', function (req, res) {
   
    res.sendFile(__dirname + "/script.js");
});
app.get('/script2.js', function (req, res) {
   
    res.sendFile(__dirname + "/script2.js");
});

app.get("/signup",function (req, res) {
    res.render(__dirname + "/signup.html");
});

app.get("/login",function (req, res) {
    res.render(__dirname + "/login.html");
});

app.post("/login-user",function (req, res) {
    // const username=req.body.username;
    // const password=req.body.password;
    console.log(req.body);
    validate(req.body,function(err,data){
        if(err){
            console.log("mai err")
            res.status(500).json({message:err.message+" Internal Server error"});
            return;
        }

            if(data.userFound){
                req.session.isLoggedIn=true;
                req.session.username=req.body.username;
                res.status(200).json(data);
                return;
            }else{
                res.status(401).json({message:" Check Email or Password"});
                return;
            }
        
    });
   

});
app.listen(3000, function () {
    console.log("server is on at port 3000");
});


app.post('/signup',function (req, res) {
    
    validateSignUp(req.body,function(err,data){
        if(err){
            console.log("mai err")
            res.status(500).json({message:err.message+" Internal Server error"});
            return;
        }

            if(data.userFound){
               
                res.status(401).json({message:" Email already Exist"});
                return;
            }else{
                // res.status(200).json(data);
                // return;
                fs.readFile('users.txt','utf-8',function(err, data){

                    if(err) {
                        console.log("hello");
                        res.status(500).json({message:err.message+" Internal Server error"});
                        return;
                    }
            
                    if(data.length===0){
                        data="[]";
                    }
            
                    try{
                        data=JSON.parse(data);
                        data.push(req.body);
            
            
                        fs.writeFile("users.txt",JSON.stringify(data),function(err){
                            if(err){
                                res.status(500).json({message:err.message+" Internal"});
                                return;
                            }
                            res.status(200).json({message:"Todo saved successFully"});
                        });
            
            
            
            
                    }
                    catch(err){
                        res.status(500).json({message:err.message+" Internal Server error"});
                        return;
                    }
            
            
                });
            }
    });

    

    console.log(req.body);
});


function checkLoggedIn(req){
    if(!req.session.isLoggedIn){
        return false;
    }else{
        return true;
    }
}
app.post('/logout',function(req,res){
    req.session.isLoggedIn = false;
    res.redirect('/login');
});
function validate(obj,callback){
    // let obj=JSON.parse(req.body);
    fs.readFile("users.txt", "utf8", function(err,data){
        if(err) {
            callback(err);
            return;
        }
        console.log(typeof data);
        let k=JSON.parse(data);
        console.log(typeof k);
        // let obj={username:username, password:password};
        console.log(obj);
        for(const key in k){
            if(k[key].email==obj.email&&k[key].password==obj.password){
                console.log(k[key].email);
                // obj.checked=!obj.checked;
                let m={userFound:true,user:k[key].name};
                callback(null,m);
                return;
            }
        }

        // console.log(k);
        let m={userFound:false,user:"no user"};
        callback(null,m);
        return;
        
    });
}

function validateSignUp(obj,callback){
    // let obj=JSON.parse(req.body);
    fs.readFile("users.txt", "utf8", function(err,data){
        if(err) {
            callback(err);
            return;
        }
        console.log(typeof data);
        let k=JSON.parse(data);
        console.log(typeof k);
        // let obj={username:username, password:password};
        console.log(obj);
        for(const key in k){
            if(k[key].email==obj.email){
                console.log(k[key].email);
                // obj.checked=!obj.checked;
                let m={userFound:true,user:k[key].name};
                callback(null,m);
                return;
            }
        }

        // console.log(k);
        let m={userFound:false,user:"no user"};
        callback(null,m);
        return;
        
    });
}





