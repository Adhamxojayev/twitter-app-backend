import { read, write } from '../../lib/orm.js'

const comments = ({ userId }) => {
	let comment = read('comments')
	if(userId) {
		return comment.filter( com => com.user_id == userId )
	} else {
		return comment
	}
}

const comment = ({ postId }) => {
	let comment = read('comments')
	return comment.find( comment => comment.post_id == postId )
}

export default {
	comments,
	comment
}