import express from "express"
import {
    getAllUsers, 
    getExactUser, 
    addUser 
} from "./src/database.js";

const app = express()
const port = 5002


app.use(express.static('public'));
app.use(express.json());

/////////////////  help page
app.get('/', (req, res)=>{
    res.send(index)
})

//////////////////////  get all users
app.get('/allUsers',async(req,res)=>{
    const allUsers = await getAllUsers()
    res.send(allUsers)
})

/////////////////////  get exact user
app.get('/user/:id',async(req,res)=>{
    const [exactUser] = await getExactUser(req.params.id)
    res.send(exactUser)
})

/////////////////  add user on db
app.post('/allUsers', async (req,res)=>{
    const {fullName, password} = req.body
    const createdUser = await addUser(fullName, password)
    res.status(201).send(createdUser)
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})