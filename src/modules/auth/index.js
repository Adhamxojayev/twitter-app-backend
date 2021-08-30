// configuring router
import express from 'express'
const router = express.Router()

//loading controllers
import { registerController } from './controller.js'
import { loginController } from './controller.js'

// loading middlewares
import registerValidation from '../../middlewares/registerValidation.js'
import loginValidation from '../../middlewares/loginValidation.js'

// hadnling routes
router.route('/register')
	.post( registerValidation, registerController )

router.route('/login')
	.post( loginValidation, loginController )


export default router