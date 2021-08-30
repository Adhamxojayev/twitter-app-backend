import model from './model.js'
import JWT from '../../lib/jwt.js'

const registerController = (req, res) => {
	try {
		let user = model.register(req.body)
		if(user) {
			res.status(201).json({
				status: 201,
				message: 'The user succesfully registered!',
				token: JWT.sign({ userId: user.user_id })
			})
		} else throw 'Something went wrong!'
	} catch (error) {
		console.log(error)
	}
}

const loginController = (req, res) => {
	res.status(200).json({
		status: 200,
		message: "The user succesfully logged in!",
		token: JWT.sign({ userId: req.user.user_id })
	})
}

export {
	registerController,
	loginController
}