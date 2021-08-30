import express from 'express'
import { likeAdded } from './controller.js'
const router = express.Router()



router.route('/posts/like')
    .post( likeAdded )


export default router