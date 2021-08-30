import model from './model.js'
import { read, write } from '../../lib/orm.js'
import JWT from '../../lib/jwt.js'

function getUser (req,res) {
    try{
        if(!req.headers.token) throw 'The token required'
        res.status(200).json( model.users(req,res,req.query) )
    }catch(err){
        res.status(401).json({ status:401, message: err })
    }
}

function putUser (req,res) {
    try{
        if(!req.headers.token) throw 'The token required'
        let {userId} = JWT.verify(req.headers.token)
        let data = req.body
        if(userId){
            let users = read('users')
            let {username, password, contact, age, gender} = data
            let user = users.find(val => val.user_id == userId)
            if(user){
                if(username) user.username = username
                if(password) user.password = password
                if(contact) user.contact = contact
                if(age) user.age = age
                if(gender) user.gender = gender
            }
            if(write('users', users)) res.status(201).json({ status: 201, message: 'user update successfully' })
        }

    }catch(err){
        res.status(401).json({status: 401, message: err})
    }
}

export {
    getUser,
    putUser
}    