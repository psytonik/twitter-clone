import {Feed, Sidebar, Widgets} from "@/components";
import Head from "next/head";

const Home = () => {
	return (
		<>
			<Head>
				<title>Twitter Clone</title>
				<meta name="description" content="Twitter Clone App written in NextJs" />
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<main className="flex min-h-screen max-w-7xl mx-auto justify-between">
				{/*{SideBar}*/}
				<Sidebar/>
				{/*{Feed}*/}
				<Feed/>
				{/*{Widgets}*/}
				<Widgets/>
				{/*{Modal}*/}

			</main>
		</>
	)
}
export default Home;
