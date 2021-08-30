import JWT from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config.js'

export default {
	sign: (payload) => JWT.sign(payload, PRIVATE_KEY),
	verify: (token) => JWT.verify(token, PRIVATE_KEY),
}