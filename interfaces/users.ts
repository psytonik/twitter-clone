export interface Users{
		"name": {
			"title": string,
			"first": string,
			"last": string
		},
		"email": string,
		"login": {
			"uuid": string,
			"username": string,
			"password": string,
			"salt": string,
			"md5": string,
			"sha1": string,
			"sha256": string
		},
		"picture": {
			"large": string,
			"medium": string,
			"thumbnail": string
		}
}
export interface User {
	email: string
	image:string
	name:string
	uid:string
	username:string
}
