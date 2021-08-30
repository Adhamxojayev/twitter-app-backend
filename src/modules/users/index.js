import express from 'express'
const router = express.Router()

import {getUser} from './controller.js'
import {putUser} from './controller.js'


router.route('/users')
    .get( getUser )
    .put( putUser )


export default router    
