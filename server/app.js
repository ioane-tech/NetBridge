import express from "express"
import cors from 'cors'
import {
    getAllUsers, 
    getExactUser, 
    addUser, 
    checkUser
} from "./src/database.js";
import bcrypt from 'bcrypt'

const app = express()
const port = 5002


app.use(express.static('public'));
app.use(express.json());
app.use(cors())

/////////////////  help page
app.get('/', (req, res)=>{
    res.status(200).send(index)
})

//////////////////////  get all users
app.get('/api/allUsers',async(req,res)=>{
    const allUsers = await getAllUsers()
    res.status(200).send(allUsers)
})

/////////////////////  get exact user
app.get('/api/user/:id',async(req,res)=>{
    const [exactUser] = await getExactUser(req.params.id)
    res.status(200).send(exactUser)
})

/////////////////  add user on db
app.post('/api/allUsers', async (req,res)=>{
    const { fullName, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await addUser(fullName, hashedPassword);

        if (createdUser.message === 'such user already exists!') {
            res.status(409).send(createdUser.message);
        } else if(createdUser.message === 'success') {
            res.status(201).send(createdUser);
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to add user' });
    }
    
})


/////////////////  check user if exists
app.post('/api/checkUser', async (req,res)=>{
    const {fullName, password} = req.body

    if (!fullName || !password) {
        return res.status(400).send({ error: 'Full name and password are required' });
    }
    const userExists = await checkUser(fullName, password)

    if (userExists.userExists) {
        res.status(200).send(userExists);
    } else if (userExists.message === 'Password is incorrect. Try again') {
        res.status(401).send(userExists);
    } else if(userExists.message === 'User not found'){
        res.status(404).send(userExists);
    }else{
        res.status(500).send(userExists)
    }
    
})



app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})