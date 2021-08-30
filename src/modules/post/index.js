// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { postsController } from './controller.js'
import { postController } from './controller.js'
import { postAdded } from './controller.js'
import { putController } from './controller.js'
import { deleteController } from './controller.js'

// hadnling routes
router.route('/posts')
	.get( postsController )

router.route('/posts/:postId')
	.get( postController )

router.route('/posts')
	.post( postAdded )
	.put( putController )
	.delete( deleteController )	

export default router