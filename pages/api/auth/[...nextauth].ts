import NextAuth,{Session} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		})
	],
	secret: process.env.NEXTAUTH_SECRET as string,
	pages:{
		signIn:'/auth/signin'
	},
	callbacks:{
		async session({session, token}:any):Promise<Session> {
			session.user.username = session.user.name.split(' ').join("").toLocaleLowerCase();
			session.user.uid = token.sub;
			return session;
		}
	}
}
export default NextAuth(authOptions)
