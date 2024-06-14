import mysql2 from "mysql2"

const sqlConnection = mysql2.createPool({
    host: 'localhost:5002',
    user: 'ioane_tech',
    password: 'ioturman1234$',
    database: 'netBridge',
}).promise()


//get user
export async function getAllUsers(){
    const [allUsers] = await sqlConnection.query('select * from community')
    return allUsers
}

//get user id
export async function getExactUser(id){
    const [exactUser] =await sqlConnection.query(
        'SELECT * FROM community where id = ?',[id]
    )
    return exactUser
}

//add user name and password
export async function addUser(fullName, password){
    const [addedUser] =await sqlConnection.query(
        `
            insert into community (fullName, password)
            values(?, SHA2(?, 256))
         `,[fullName, password]
    )
    return getExactUser(addedUser.insertId)
}