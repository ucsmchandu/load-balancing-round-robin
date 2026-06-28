const express=require('express')

const app=express();

app.get('/health',async(req,res)=>{
    res.json({
        status:"UP"
    })
})


app.get('/server1',async(req,res)=>{
    res.json({msg:"hello from server 1"})
})

app.listen(3000,()=>{
    console.log("server1 3000");
})