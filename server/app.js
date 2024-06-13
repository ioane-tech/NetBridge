import express from "express"


const app = express()
const port = 5002

app.get('/',(req,res)=>{
    res.send("Hello! this is NetBridge server")
})


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})