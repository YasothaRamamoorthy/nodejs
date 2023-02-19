const mongoose=require('mongoose');

const expenseschema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required : [true,"please add some text"]
    },
    amount:{
        type:Number,
        trim:true,
        required : [true,"please add positive number"]
    },
    
    desc:{
        type:String,
        trim:true,
        required : [true,"please add some text"]
    }
});

module.exports=mongoose.model('Expenses',expenseschema);