declare namespace SprAPI {
	/** The necessary data needed for the user to login. */
	type LoginData = {
		email: string
		password: string
	}

	/** The necessary data needed for the user to register. */
	type RegisterData = {
		username: string
		email: string
		password: string
	}
}
