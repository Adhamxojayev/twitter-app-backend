import JWT from '../lib/jwt.js'

export default function (req, res, next) {
	try {
		if(req.url == '/register' || req.url == '/login') return next()
		let { token } = req.headers
		let { userId } = JWT.verify(token)
		req.userId = userId
		next()
	} catch(error) {
		res.status(401).json({ status: 401, message: error })
	}
}