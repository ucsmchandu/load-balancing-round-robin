const express=require('express')

const app=express();

app.get('/health',async(req,res)=>{
    res.json({
        status:"UP"
    })
})

app.get('/server2',async(req,res)=>{
    res.json({msg:"hello from server 2"})
})

app.listen(3001,()=>{
    console.log("server2 running");
})