import express from 'express'
import * as config from './config.js'

// loading modules
import authModule from './modules/auth/index.js'
import postModule from './modules/post/index.js'
import commentModule from './modules/comments//index.js'
import userget from './modules/users/index.js'
import likeAdd from './modules/likes/index.js'


// loading middlewares
import checkToken from './middlewares/checkToken.js'

// server
const app = express()

// global middlewares
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use( checkToken )

// loding modules
app.use( authModule )
app.use( postModule )
app.use( commentModule )
app.use( userget )
app.use( likeAdd )

app.listen( config.PORT,  () => {
	console.log('Server is running on http://' + config.host + ':' + config.PORT)
})