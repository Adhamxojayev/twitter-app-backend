import model from './model.js'
import { read, write } from '../../lib/orm.js'
import JWT from '../../lib/jwt.js'

const postsController = (req, res) => {
	try {
		res.status(200).json( model.posts(req,res,req.query) )
	} catch (error) {
		console.log(error)
	}
}

const postController = (req, res) => {
	try {
		res.status(200).json( model.post(req,res,req.params) )
	} catch (error) {
		console.log(error)
	}
}

const postAdded = (req, res) => {
	try{
		let data = ''
			let { token } = req.headers
			if(!token) throw "The token required";
		    let { userId } = JWT.verify(token)
			data = req.body
			if(userId){
				let post = read('posts')
				let newPosts = {
					post_id : post.length ? post[post.length-1].post_id +1 : 1,
					post_title : data.post_title,
					post_body : data.post_body,
					post_created_at : new Date(),
					user_id: userId
				}
				post.push(newPosts)
				if(write('posts',post)) res.status(201).json({ status: 201, message: 'post successfully' })
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
				let post = read('posts')
				let {post_title, post_body} = data
				let update = post.find(val => val.user_id == userId && val.post_id == data.post_id)
				if(update){
					if(post_title) update.post_title = post_title
					if(post_body) update.post_body = post_body
				}
				if(write('posts',post)) res.status(201).json({ status: 201, message: 'post update successfully' })
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
			let post = read('posts')
			let index = post.findIndex(val => val.user_id == userId && val.post_id == data.post_id);
			if(index > -1) post.splice(index, 1);
			if(write('posts',post)) res.status(201).json({ status: 204, message: 'post deleted successfully' })
		}		
	}catch(err){
		res.status(401).json({ status: 500, message: err })	
	}
}

export {
	postsController,
	postController,
	postAdded,
	putController,
	deleteController
}