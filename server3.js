const express=require('express')

const app=express();

app.get('/health',async(req,res)=>{
    res.json({
        status:"UP"
    })
})

app.get('/server3',async(req,res)=>{
    res.json({msg:"hello from server 3"})
})

app.listen(3002,()=>{
    console.log("server3 running");
})