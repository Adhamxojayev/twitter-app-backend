import { write, read } from "../../lib/orm.js";


function users (req,res,{userId}){
    try{
        if(!req.headers.token) throw 'The token required'
        let users = read('users')
        users = users.filter(val => delete(val.password))
        return users
    }catch(err){
        res.status(401).json({status: 401, message: err})
    }
}

export default {
    users
}