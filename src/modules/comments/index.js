// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { commentController, commentsController } from './controller.js'
import { commentAdded } from './controller.js'
import { putController } from './controller.js'
import { deleteController } from './controller.js'

// hadnling routes
router.route('/comments')
    .get( commentsController )
    .put( putController )
    .post( commentAdded )
    .delete( deleteController )    

router.route('/comments/:postId')
	.get( commentController )


export default router