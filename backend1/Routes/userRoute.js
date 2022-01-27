const express=require('express')
const router=express.Router()
const app=express()
const jsonwebtoken=require('jsonwebtoken')
const jsonsecret="5sa5sa67s66s66sa6saww"
const main=require('../Sendmail/Sendmail')
const jwt_decode =require('jwt-decode')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const userModel=require('../db/userSchema.js');
const companyModel=require('../db/companySchema');
const sendEmail=require('../Sendmail/Sendemail1')
const multer=require('multer')
const path=require('path')
const bcrypt = require('bcrypt');
const saltRounds = 10;
function autenticateToken(req,res,next){
    //console.log(req!=undefined)

    if(req!=undefined){
    const token=req.query.token
    //console.log(req.headers)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jsonwebtoken.verify(token,jsonsecret,(err,data)=>{
            if(err){
                res.send("Token expired")
            }
            else {
                //console.log("Match")
                next();
            }
        })
    }
}
else{
    next()
}
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
        //console.log(path.join(__dirname, './uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
        //console.log(file)
    }
});
const multi_upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('myfile', 1)
router.post("/adduser",(req,res)=>{
    let fname=req.body.fname;
    let lname=req.body.lname;
    let username=req.body.username;
    let email=req.body.email;
    let mobile=req.body.mobile;
    let age=req.body.age;
    let address=req.body.address;
    let companyname=req.body.companyname;
    let password=req.body.password;
    //console.log(req.body)
    //insert data
    const data={firstName:fname,lastName:lname,username:username,email:email,mobile:mobile,age:age,address:address,CompanyName:companyname,password:password}
    let ins=new userModel(data);
    // //console.log(data)
    ins.save((err)=>{
         if(err){ res.json({err:"user already added",message:"user already added."})}
         else{
         res.json({data:data,err:"",message:"user added"});
         }
     })
})
router.get("/getuser",(req,res)=>{
    userModel.find({},(err,data)=>{
        if(err) throw err;
        else{
        res.send(data);}
    })
})
router.post("/checkuser",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
       
        let token=jsonwebtoken.sign({ UID:email },jsonsecret,{ expiresIn: 60*60 }) //1 minute expire time for jwt token
        //console.log(token)
        companyModel.find({$and:[{email:email}]},(err,data)=>{
            bcrypt.compare(password, data[0].password, function(err, result) {
                if(!result){
                    
                        res.json({err:err,message:"incorrect username And password."})
                        
                    }
                    else{
                        console.log(data)
                    res.json({data:data,err:"",token:token});
                }
            });
        })
    //console.log('a')
    console.log(email,password)
})

 function checkcompanyuser(email,password){
    console.log('a')
    console.log(email)
    console.log(password)
     companyModel.find({$and:[{email:email},{password:password}]},(err,data)=>{
        if(err){
        return false
        }
        else{
            console.log(data)
            
            if(data.length==0){
                console.log("yes1")
                return(0)  
            }
            else{
                console.log("yes")
                return(1)
            }
    }
    })

}

router.delete("/deluser/:id",(req,res)=>{
    let id=req.params.id;
    userModel.deleteOne({_id:id},(err)=>{
        if(err) throw err 
        res.send("user Data Deleted .")
    })
})
router.put("/updateuser/:id",(req,res)=>{
    let id=req.params.id;
    let username=req.body.username;
    let email=req.body.email;
    let mobile=req.body.mobile;
    let age=req.body.age;
    let address=req.body.address;
    userModel.updateOne({_id:id},{$set:{username:username,email:email,mobile:mobile,age:age,address:address}},(err)=>{
        if(err) throw err;
        else {
            res.end("user data Updated .");
        }
    })
})
router.post("/forgetpassword",(req,res)=>{
    let email=req.body.email;
    let token=jsonwebtoken.sign({ UID:email },jsonsecret,{ expiresIn: 60*5 })
    userModel.find({email:email},(err,data)=>{
        if(err) throw err;
        else if(data.length==0){
            res.json({err:"1",msg:"user not found"})
        }
        else{
            main(token,email,"Forget Password")
            res.json({data:email})
        }
    })
})
router.get('/changepassword',autenticateToken,(req,res)=>{
    let token=req.query.token
    const data=jwt_decode(token)
    console.log(data)
    //console.log(jwt_decode(token))
    res.render('Forgetpassword',{email:data.UID})
})
router.post('/updatepassword',(req,res)=>{
    console.log(req.body)
    userModel.updateOne({email:req.body.email},{$set:{password:req.body.password}},(err)=>{
        if(err) throw err;
        else {
            res.end("password Updated .");
        }
    })
})
router.get('/sendemail',(req,res)=>{
    sendEmail()
    res.send("send email")
})




router.post("/adduserdata1",(req,res)=>{
        
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        console.log(req.body)
        let firstname=req.body.fname;
        let lastname=req.body.lname;
        let username=req.body.username;
        let email=req.body.email;
        let address=req.body.address;
        let companyname=req.body.companyname;
        let image=req.files[0].filename;
        let password=req.body.password;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            password=hash

            const data=({firstName:firstname,lastName:lastname,username:username,email:email,address:address,CompanyName:companyname,logo:image,password})
            console.log(data)
            let ins=new companyModel(data);
            ins.save((err)=>{
                console.log(err)
                if(err){ res.json({err:"already added",message:"menu already added"})}
                else{
                res.json({data:data,err:"",message:"user added successfully"});
                }
            })
        });
        //insert data

})})




router.post("/updatecompanyuser",(req,res)=>{
        
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        
        var password=req.body.password
            companyModel.find({$and:[{email:req.body.email}]},(err,data)=>{
                bcrypt.compare(password, data[0].password, function(err, result) {
                if(!result){

                    res.json({err:"1",msg:"wrong password"})

                }
                else{

                    let firstname=req.body.fname;
                    let lastname=req.body.lname;
                    let username=req.body.username;
                    let email=req.body.email;
                    let address=req.body.address;
                    let companyname=req.body.companyname;
                    let image=req.files[0].filename;
                    let password=req.body.password
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        password=hash
                    });
                    
                    //insert data
            
                    const data={firstName:firstname,lastName:lastname,username:username,email:email,address:address,CompanyName:companyname,logo:image,password}
                    console.log(data)
                    companyModel.updateOne({email:req.body.email},{$set:{...data}},(err)=>{
                        if(err) throw err;
                        else {
                            res.json({data:data,err:"",msg:"data updated"})
                        }
                    })

                }
                
                
                });
                        
                
        
        
})})})









//end
module.exports=router;