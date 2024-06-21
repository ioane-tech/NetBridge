import mysql2 from "mysql2"
import bcrypt from 'bcrypt'

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
    try {
        const [allUsers] = await sqlConnection.query('SELECT * FROM community');
        
        const userNameExists = allUsers.find(user => user.fullName.trim() === fullName.trim());
        
        if (userNameExists) {
            return { message: 'such user already exists!' };
        }

        const [addedUser] = await sqlConnection.query(
            `INSERT INTO community (fullName, password) VALUES (?, ?)`,
            [fullName, password]
        );

        const createdUser = await getExactUser(addedUser.insertId);
        
        return { message: 'success', createdUser };

    } catch (error) {
        console.error('Error adding user:', error);
        return { message: 'Failed to add user', error };
    }
}


//check user if exists
export async function checkUser(fullName, password){
    try {
        const [allUsers] = await sqlConnection.query('SELECT * FROM community');

        const user = allUsers.find(user => user.fullName === fullName);
        
        if (!user) {
            return { userExists: false, message: 'User not found' };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            return { user:user, userExists: true, message: 'Success' };
        } else {
            return { userExists: false, message: 'Password is incorrect. Try again' };
        }
    } catch (error) {
        console.error('Error checking user:', error);
        return { userExists: false, message: 'Internal server error' };
    }
}