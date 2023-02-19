/*const express = require('express');
const bodyparser = require('body-parser')


const app =express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.get('/api/v1/health',(req,res)=>
{
    //res.send("hello express");
    res.status(200).json({
        message:"it working.....!",
        status:"sucess"
    })
});

const expenses=[
    {
       id:1, name:'movie',amount:'200',desc:'vaathi'
    },
    {
        id:2, name:'sooru',amount:'1000',desc:'dinner'
    },
    {
        id:3, name:'dress',amount:'2000',desc:'clgwear'
    }
]

const expenses_details=[
    {
       id:1, paymentmode:"upi"
    },
    {
        id:2, paymentmode:"cash"
    },
    {
        id:3, paymentmode:"gpay"
    }
]

//api creation
//app.get('/api/v1/expenses1',(req,res)=>{
  //res.status(200).json(expenses);
//})

app.get('/api/v1/expenses/:id',(req,res)=>{
    //console.log(req.params);
    /*for(const val of expenses_details) {
   // if(req.params.id == val.id && 
   if(req.params.id == val.id)
    {
        //console.log(val);
        res.status(200).json(val.paymentmode);
    if(req.params.id == val.id && req.params.id == val.id)
    {
        res.status(200).json(val);   
    }
    }}
    //res.send('trails');
    //for(const val of expenses)
    let id = req.params.id;
    for(let i=0;i<expenses.length;i++)
    {
        if(expenses[i].id==id)
        {
            let detailed={
                id : id,
                name:expenses[i].name,
                amount:expenses[i].amount,
                desc:expenses[i].desc,
                paymentmode: expenses_details[i].paymentmode
            }
            res.status(200).json(detailed);//response will we shown in postman
        }
    }
})
app.get('/api/v1/expenses',(req,res)=>{
    res.status(200).json(expenses);
})

app.post('/api/v1/expenses',(req,res)=>
{
   console.log(req.body);
    //res.send('create new expenses');
    let newExpenses = req.body;
    newExpenses.id=expenses[expenses.length-1].id+1;
    expenses.push(newExpenses);
    res.status(201).json(newExpenses);
})

app.delete('/api/v1/expense/:id',(req,res)=>{
    for(let i=0;i<expenses.length;i+=1)
    {
        if(expenses[i].id == req.params.id){
         expenses.splice(i,1);
        }
    }
    res.send("deleted");
})

// app.delete('/api/v1/expense/:id',(req,res)=>{
//     for(let i=0;i<expenses.length;i+=1){
//         if(expenses[i].id==req.params.id){
//             expenses.splice(i,1);                              //splice is used to remove or delete the particular object
//         }
//     }
//     res.send("Deleted");
// })

app.put('/api/v1/expense/:id',(req,res)=>{
    console.log(req.body);
    for(let i=0;i<expenses.length;i+=1)
    {
        if(expenses[i].id == req.params.id){
        if(req.body.name)
         {
            expenses[i].name=req.body.name;
         }
         if(req.body.desc)
         {
            expenses[i].desc=req.body.desc;
         }
         if(req.body.amount)
         {
            expenses[i].amount=req.body.amount;
         }
        }
    }
    res.send("upadated");
})


app.listen(3000,()=>
{
    console.log("server is running");
})*/

const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const { getExpenses, getExpensesbyid,postExpenses,deleteExpenses,updateExpenses,loggerFunc,checkAdmin } = require('./controller/expenses');//adding controller modules




mongoose.connect('mongodb://localhost:27017/expensetracker',{
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));//event listing 
db.once("open",function(){
    console.log("connection sucessful");
})

const app =express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
//app.use(loggerFunc);
app.get('/api/v1/health',(req,res)=>
{
    //res.send("hello express");
    res.status(200).json({
        message:"it working.....!",
        status:"sucess"
    })
});

app.get('/api/v1/expenses',getExpenses);
//app.get('/api/v1/expenses/:id',loggerFunc,getExpensesbyid);
app.post('/api/v1/expenses',loggerFunc,postExpenses);
app.delete('/api/v1/expenses/:id',checkAdmin,loggerFunc,deleteExpenses);
//app.put('/api/v1/expenses/:id',updateExpenses);
app.listen(3000,()=>
{
    console.log("server is running");
})