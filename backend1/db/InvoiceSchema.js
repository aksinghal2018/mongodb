const mongoose =require('mongoose')
const invoiceSchema=new mongoose.Schema({
userid:{
    type:String,
    required:true
},
orderdate:{
type:String,
default:Date()
},
invoicename:{
    type:String,
    required:true
}
,data:{
    type:mongoose.Schema.Types.Mixed,
    required:true
}
})
module.exports=mongoose.model("invoicedata",invoiceSchema)