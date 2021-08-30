let validation = {
	username (value) {
		if(!(value.length > 3 && value.length < 30)) throw 'The username input must be 3-30 characters!'
		return value 
	},
	
	age (value) {
		if(!Number.isInteger(+value)) throw 'The age must be number!'
		if(!(value >= 0 && value < 100)) throw 'The age must be between 1 and 100!'
		return value
	},

	contact (value) {
		if(!Number.isInteger(+value)) throw 'The contact must be number!'
		if(!(value.length === 12)) throw 'The contact must be 12 length!'
		return value
	},

	password (value) {
		if(value.length < 8) throw 'The password length must be more than 8'
		if( !(/[A-Z]/).test(value) ) throw 'The password must include uppercase letters!'
		if( !(/[a-z]/).test(value) ) throw 'The password must include lowercase letters!'
		if( !(/[0-9]/).test(value) ) throw 'The password must include numbers!'
		if( !(/[ `!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/).test(value)) throw 'The password must include special characters!'
		return value
	},

	gender(value) {
		if( !(value == 1 || value == 2) ) throw 'The gender type must be 1 and 2'
		return value
	}
}

export default validation