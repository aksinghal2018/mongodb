const express=require('express')
const PORT=8899
const app=express()
const invoicegeneate=require('./Invoicegenerate')
const cors=require('cors')
const connectDB = require('./Connection/connectDB')
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use('/images',express.static('uploads'))
app.use(cookieParser())
app.set('view engine','ejs')
app.use(cookieSession({
    name: 'session',                              
    secret: 'MAKE_THIS_SECRET_SECURE',            
    maxAge: 24 * 60 * 60 * 1000,                  
    sameSite: 'lax',                              
    path: '/',                                    
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true                                
  }));
const userRoutes=require('./Routes/userRoute')
const productRoutes=require('./Routes/productRoute')
//dbconnection 
connectDB();
//end
const invoice = {
    shipping: {
        name: 'John Doe',
        address: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        postal_code: 94111,
    },
    items: [
        {
            item: 'TC 100',
            description: 'Toner Cartridge',
            quantity: 2,
            amount: 6000,
        },
        {
            item: 'USB_EXT',
            description: 'USB Cable Extender',
            quantity: 1,
            amount: 2000,
        },
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234,
};
app.get('/',(req,res)=>{
    invoicegeneate(invoice,"new1.pdf")
    res.send("")
})
//User
app.use('/',userRoutes)
//end
//Products
app.use('/',productRoutes)
//end
app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on PORT ${PORT}`)

})