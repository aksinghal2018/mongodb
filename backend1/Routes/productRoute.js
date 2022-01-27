const express=require('express')
const PORT=8899
const router=express.Router()
//const history=require('history')
router.use(express.json())
router.use(express.urlencoded({extended:false}))
const menuModel=require('../db/productSchema');
const cartModel=require('../db/cartSchema');
const invoiceModel=require('../db/InvoiceSchema')
const jsonwebtoken=require('jsonwebtoken')
const jsonsecret="5sa5sa67s66s66sa6saww"
const main=require('../Sendmail/Sendmail')
const invoicegeneate=require('../Invoicegenerate')
const path = require("path")
const fs = require('fs')
const cors = require('cors')
const formidable = require('formidable')
router.use(cors())
var multer = require('multer');
var upload = multer();
router.use(express.static("uploads"));
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

function autenticateToken(req,res,next){
    //console.log(req!=undefined)

    if(req!=undefined){
    const authHeader=req.headers['authentication'];
    const token=authHeader && authHeader.split(' ')[1];
    //console.log(req.headers)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jsonwebtoken.verify(token,jsonsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token expired"})
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






router.post("/addmenu",autenticateToken,(req,res)=>{
        
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
       // console.log(req.body)
        let name=req.body.name;
        let image=req.files[0].filename;
        let price=req.body.price;
        let category=req.body.category;
        let quantity=req.body.quantity;
        
        //insert data

        const data=({name:name,image:image,price:price,category:category,quantity:quantity})
       // console.log(data)
        let ins=new menuModel({name:name,image:image,price:price,category:category,quantity:quantity});
        ins.save((err)=>{
            console.log(err)
            if(err){ res.json({err:"already added",message:"menu already added"})}
            else{
            res.json({data:data,err:"",message:"menu added successfully"});
            }
        })
})})
router.get("/getmenu",autenticateToken,(req,res)=>{
    menuModel.find({},(err,data)=>{
        if(err) throw err;
        res.send({data:data});
    })
})
router.get("/getmenu/:id",autenticateToken,(req,res)=>{
    const id=req.params.id
    menuModel.find({_id:id},(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})
router.delete("/delmenu/:id",autenticateToken,(req,res)=>{
    let id=req.params.id;
    menuModel.deleteOne({_id:id},(err)=>{
        if(err) throw err 
        res.send("menu Data Deleted .")
    })
})
router.put("/updatemenu/:id",autenticateToken,(req,res)=>{
    let id=req.params.id;
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
        //console.log(req.body)
        let name=req.body.name;
        let image=req.files[0].filename;
        let price=req.body.price;
        let category=req.body.category;
        let quantity=req.body.quantity;
        
        //insert data
        menuModel.find({_id:id},(err,data)=>{
            if(err) throw err;
            //console.log(data[0].image)
            fs.unlinkSync(path.join(__dirname + `/../uploads/${data[0].image}`));
        })

        const data=({name:name,image:image,price:price,category:category,quantity:quantity})
       // console.log(data)
        let ins=new menuModel({name:name,image:image,price:price,category:category,quantity:quantity});
        menuModel.updateOne({_id:id},{$set:data},(err)=>{
            if(err) throw err;
            else {
                res.end("menu data Updated .");
            }
        })
        
})  
})

router.post("/ordersend",autenticateToken,(req,res)=>{
    let id=req.body.id
    let time=req.body.date
    let order=req.body.order
    let email=req.body.user.email
    let mobile=req.body.user.mobile
    let address=req.body.user.address
    let username=req.body.user.username
    var total=0
    order.map((item)=>{
        total=total+item.price*item.quantity
    })
   // console.log(req.body)
    const orderitem=({userid:id,orderdate:time,order:order})

    let ins=new cartModel(orderitem);
        ins.save((err)=>{
            console.log(err)
            if(err){ res.json({err:"error occur",msg:"cart error"})}
            else{
            res.json({data:orderitem,err:"",msg:"order added successfully"});
            const filename=`new${Math.random()}`
            // console.log(order)
            //Genrate Invoice
              
              const invoice = {
                shipping: {
                    name: username,
                    address: address,
                    mobile:mobile,
                    email:email
                },
                items:order,
                subtotal: total,
                paid: 0,
                invoice_nr: 1234,
            };
            let ins=new invoiceModel({userid:req.body.id,invoicename:filename+".pdf"});
        ins.save((err)=>{
            console.log(err)
        })
        invoicegeneate(invoice,"./uploads/Orderspdf/"+filename+".pdf")
       // main(JSON.stringify(orderitem),email,"Order Details",filename).catch((error) => {
        //    console.log(error);
         // });
              //end
            }
        })
})

router.post("/orderhistory",autenticateToken,(req,res)=>{
    let id=req.body.id
    //console.log(req.body)
    cartModel.find({userid:id},(err,data)=>{
        if(err) throw err;
        res.send(data);
    })

})

 router.post("/getinvoicedata",(req,res)=>{
     var id=req.body.id
    // console.log(req.body)
     invoiceModel.find({email:req.body.email},(err,data)=>{
         if(err) throw err;
         //console.log(data)
         res.json({err:0,data,data});
     })

 })

router.post("/getinvoice",(req,res)=>{
    var id=req.body
    var email=req.body.email
 console.log(req.body)
    var total=0
    req.body.data.map(item=>{
       // console.log(item)
        total=total+item.total
    })
    const data1=parseInt(req.body.cdate.split("-")[2])
    const data2=parseInt(req.body.ddate.split("-")[2])
  //  console.log(req.body.cdate)
    req.body.total=Math.round(total * 100) / 100
    req.body.duedate=data2-data1
    const filename=`new${Math.floor(Math.floor(100000000 + Math.random() * 900000000))}.pdf`
    const filepath=__dirname+`/../uploads/Orderspdf/${filename}`
    let ins=new invoiceModel({userid:req.body.userid,invoicename:filename,data:req.body});
        ins.save((err)=>{
            console.log(err)
        })
    invoicegeneate(req.body,filepath)
    res.json({err:"1",msg:"invoice generated"})
    main(email,"Order Details",filename).catch((error) => {
        console.log(error);
      });

})
router.get("/getimages",(req,res)=>{
    const data=fs.readdirSync(__dirname+`/../uploads/`)
    res.json({data:data})
})
router.get("/getpdf",(req,res)=>{
    const data=fs.readdirSync(__dirname+`/../uploads/Orderspdf`)
    res.json({data:data})
})
router.post("/updatepdf",(req,res)=>{
    const id=req.body.id
    if(req.body.status=="fullyPaid"){

        invoiceModel.find({_id:id},(err,data)=>{
            if(err) throw err;
            else {
                var item1=data[0].data
                //console.log(data)
                item1.Status="Paid"
                item1.valuepay=item1.totalo
                item1.balance=0
                const filepath=__dirname+`/../uploads/Orderspdf/${data[0].invoicename}`
                invoicegeneate(item1,filepath)
                invoiceModel.updateOne({_id:id},{$set:{data:item1}},(err)=>{
                    if(err) throw err;
                    else {
                        console.log(" data Updated .");
                    }
                })
                res.json({"Msg":"Successfull update"})
            }
        })
    }
    else{
        const dataitem=req.body.amount;
        invoiceModel.find({_id:id},(err,data)=>{
            if(err) throw err;
            else {
                var item1=data[0].data
                //console.log(data)
                item1.Status="Partially Paid"
                item1.valuepay=item1.valuepay+dataitem
                item1.balance=item1.balance-dataitem
                const filepath=__dirname+`/../uploads/Orderspdf/${data[0].invoicename}`
                invoicegeneate(item1,filepath)
                invoiceModel.updateOne({_id:id},{$set:{data:item1}},(err)=>{
                    if(err) throw err;
                    else {
                        console.log(" data Updated .");
                    }
                })
                res.json({"Msg":"Successfull update"})
            }
        })
    }
        })
        router.post("/sendemail",(req,res)=>{
            const email=req.body.email;
            const filename=req.body.filename;
            //console.log(email)
            //console.log(filename)
            main(email,"Order Details",filename).catch((error) => {
                console.log(error);
              });
              res.json({err:"1","Msg":"email send Successfully."})
        })




//end
module.exports=router;