import { read, write } from '../../lib/orm.js'
import jwt from '../../lib/jwt.js'


function likeAdded (req,res) {
    try{
        if(!req.headers.token) throw 'The token required'
        let {userId} = jwt.verify(req.headers.token)
        let data = req.body
        let likes = read('likes')
        let posts = read('posts')
        let likeFalseTrue = likes.find(val => val.post_id == data.post_id && val.is_like == false && val.user_id == userId && data.is_like == true)  
        let likeTrueFalse = likes.find(val => val.post_id == data.post_id && val.is_like == true && val.user_id == userId && data.is_like == false)  
        let likeTrue = likes.find(val => val.post_id == data.post_id && val.is_like == true && val.user_id == userId)
        let likeNull = likes.find(val => val.post_id == data.post_id && val.is_like == null && val.user_id == userId) 
        let disLike = likes.find(val => val.post_id == data.post_id && val.is_like == false && val.user_id ==  userId) 
        let disNull = likes.find(val => val.post_id == data.post_id && val.is_like == null && val.user_id == userId) 
        let post = posts.find(val => val.post_id == data.post_id)
        if(likeFalseTrue) likeFalseTrue.is_like = data.is_like
        else if(likeTrueFalse) likeTrueFalse.is_like = data.is_like
        else if(likeTrue) likeTrue.is_like = null
        else if(likeNull) likeNull.is_like = data.is_like
        else if(disLike) disLike.is_like = null
        else if(disNull) disNull.is_like = data.is_like
        else if (userId) {
            if(post){
                let newLike = {
                    post_id: data.post_id,
                    is_like: data.is_like,
                    user_id: userId
                }
                likes.push(newLike)  
            }     
        }
        if(write('likes', likes)) res.status(201).json({status: 201, message: 'like successfully'})
    }catch(err){
        res.status(401).json({status: 401, message: err})
    }
}

export {
    likeAdded
}