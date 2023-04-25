import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export const authOptions:any = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		})
	],
	pages:{
		signin:'/auth/signin'
	}
}
export default NextAuth(authOptions)
