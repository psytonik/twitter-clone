import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import {RecoilRoot} from 'recoil'
import "../config/recoil";
const App = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
	return <RecoilRoot>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</RecoilRoot>
}
export default App;
