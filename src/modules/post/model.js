import { read, write } from '../../lib/orm.js'

const posts = (req,res,{ userId }) => {
	try{
	let posts = read('posts')
	let users = read('users')
	let comments = read('comments')
	let likes = read('likes')
	if(!req.headers.token) throw 'The token required'
	if(userId) {
		let postss = posts.filter( post => post.user_id == userId ) 
			let user = users.find(user => user.user_id == postss[0].user_id)
			user.password = null
			postss[0].user = user 	
			let comment =comments.filter(comment => comment.post_id == postss[0].post_id)
			postss[0].comment = comment
		return postss
	} else {
		let like = 0
		let dislike = 0
		for(let post of posts){
			let user = users.find(user => user.user_id == post.user_id)
			delete(user.password)
			post.user = user
			let comment =	comments.filter(comment => comment.post_id == post.post_id)
			post.comment = comment
			likes.filter(val => {
				if(val.post_id == post.post_id && val.is_like){
					like += 1
				}
				if(val.post_id == post.post_id && val.is_like == false){
					dislike += 1
				}
			})
			post.like = like
			like = 0
			post.disLike = dislike
			dislike = 0
		}
		return posts
	}
	}catch(err){
		res.status(401).json({ status: 401, message: err })	
	}
}

const post = (req,res,{ postId }) => {
	try{
	if(!req.headers.token) throw 'The token required'
	let posts = read('posts')
	let users = read('users')
	let comments = read('comments')
	let postss = posts.find( post => post.post_id == postId )
		let user = users.find(user => user.user_id == postss.user_id)
		user.password = null
		postss.user = user 	
		let comment =comments.filter(comment => comment.post_id == postss.post_id)
		postss.comment = comment
	return postss
	}catch(err){
		res.status(401).json({ status: 401, message: err })	
	}
}

export default {
	posts,
	post
}