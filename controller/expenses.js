const { findById } = require('../model/expense');
const Expenses = require('../model/expense');            //getting the schema written in expense file in models folder
 
exports.getExpenses = async(req,res,next)=>{
    try{
        const expenses = await Expenses.find();              //here find is a promise so we are using async await
        console.log(expenses);          
        return res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}
//Expenses.find() print the data in that model

exports.getExpensesbyid = async(req,res,next)=>{
    try{
        const expenses=await Expenses.findById(req.params.id);//what ever id we reqested it will be stored 
        //findbyid will return the id datas from db
        //await will until we found that id
        //console.log(expenses);
        if(!expenses)//if expenses is not founded
        {
            return res.status(500).json({
                success: false,
                error: 'transcation failed'
            });
        }
        return res.status(200).json(expenses); //expenses that we get from that findbyid function 
    }
    catch(err)
    {
res.send(err);
    }
}


exports.postExpenses=async(req,res,next)=>{
try{
    const{name,amount ,desc }=req.body;
    const expenses=await Expenses.create(req.body);
    return res.status(200).json({
        success: true,
        data: expenses
    });
}catch(err)
{
    if(err.name === 'ValidationError')
    {
        const message = Object.values(err.errors).map(val=>val.message);
        return res.status(400).json({
            success: false,error:message
        });
    }
    else{
        return res.status(500).json({
            success: false,
            error:'server error'
        });
    }
}
}

exports.deleteExpenses=async(req,res,next)=>{
    try{
        const expenses=await Expenses.findById(req.params.id);
        if(!expenses)
        {
            return res.status(404).json({
                success:false,
                error:'No Expense found'
            });
        }

        await expenses.remove();

        return res.status(200).json({
            success:true,
            data:{}
        });
    }catch(err)
    {
        return res.status(500).json({
            success:false,
            error:'server error'
        });
    }
    }
    
    //findbyidandupdate
    //const{name,amount ,desc }=req.body;
    //const expense=await Expenses.findByIdAndUpdate({name:name,amount:amount,desc:desc});
    exports.updateExpenses= async(req,res,next)=>{
        try{
            const expense=await Expenses.findByIdAndUpdate({name:req.params.name,amount:req.params.amount,desc:req.params.desc});
            return res.status(200).json({
                success:true,
                data:{}
            });
        }catch(err)
        {
            return res.status(500).json({
                success:false,
                error:'server error'
            });
        }
    }



    exports.loggerFunc=(req,res,next)=>
    {
       console.log("login");
       console.log(req.method,req.url);
       next(); 
    }

    exports.checkAdmin=(req,res,next)=>
    {
        const isAdmin=true;
        if(isAdmin)
        {
            res.status(401).json({
                message:"unauthorized user please contact admin"
            })
            next();
        }
    }