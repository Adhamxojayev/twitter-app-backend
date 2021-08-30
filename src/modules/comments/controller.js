import model from './model.js'
import { read, write } from '../../lib/orm.js'
import JWT from '../../lib/jwt.js'

const commentsController = (req, res) => {
	try {
		if(!req.headers.token) throw 'The token required';
		res.status(200).json( model.comments(req.query) )
	} catch (error) {
		res.status(401).json({ status: 401, message: err })	
	}
}

const commentController = (req, res) => {
	try {
		if(!req.headers.token) throw 'The token required'
		res.status(200).json( model.comment(req.params) )
	} catch (error) {
		res.status(401).json({ status: 401, message: err })	
	}
}

const commentAdded = (req, res) => {
	try{
		let data = ''
			let { token } = req.headers
			if(!token) throw "The token required";
		    let { userId } = JWT.verify(token)
			data = req.body
			if(userId){
				let comment = read('comments')
				let newComment = {
					comment_id : comment.length ? comment[comment.length-1].comment_id +1 : 1,
					comment_body : data.comment_body,
					comment_created_at : new Date(),
                    post_id: data.post_id,
					user_id: userId
				}
				comment.push(newComment)
				if(write('comments',comment)) res.status(201).json({ status: 201, message: 'comment successfully' })
			}
	}catch(err) {
		res.status(401).json({ status: 401, message: err })	
	}
}

const putController = (req,res) => {
	try{
		let data = ''
			let { token } = req.headers
			if(!token) throw "The token required";
		    let { userId } = JWT.verify(token)
			data = req.body
			if(userId){
				let comment = read('comments')
				let {comment_body} = data
				let update = comment.find(val => val.user_id == userId && val.comment_id == data.comment_id)
				if(update){
					if(comment_body) update.comment_body = comment_body
				}
				if(write('comments',comment)) res.status(201).json({ status: 201, message: 'comment update successfully' })
			}
	}catch(err){
		res.status(401).json({ status: 401, message: err })	
	}
}
const deleteController = (req,res) => {
	try{
		let data = ''
			let { token } = req.headers
			if(!token) throw "The token required";
		    let { userId } = JWT.verify(token)
		data = req.body
		if(userId){
			let comment = read('comments')
			let index = comment.findIndex(val => val.user_id == userId && val.comment_id == data.comment_id);
			if(index > -1) comment.splice(index, 1);
			if(write('comments',comment)) res.status(201).json({ status: 204, message: 'comment deleted successfully' })
		}		
	}catch(err){
		res.status(401).json({ status: 500, message: err })	
	}
}

export {
	commentsController,
	commentController,
	commentAdded,
    putController,
    deleteController
}