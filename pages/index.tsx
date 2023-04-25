import {Feed, Sidebar, Widgets} from "@/components";
import Head from "next/head";
import {FC} from "react";
import {Article} from "@/interfaces/article";
import {GetServerSideProps} from "next";

type HomeProps = {
	articles:Article[],
	totalResults: number
}
const Home:FC<HomeProps> = ({articles,totalResults}) => {
	return (
		<>
			<Head>
				<title>Twitter Clone</title>
				<meta name="description" content="Twitter Clone App written in NextJs" />
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<main className="flex min-h-screen mx-auto justify-between">
				{/*{SideBar}*/}
				<Sidebar/>
				{/*{Feed}*/}
				<Feed/>
				{/*{Widgets}*/}
				<Widgets articles={articles} total={totalResults}/>
				{/*{Modal}*/}
			</main>
		</>
	)
}
export default Home;

const newsLink = "https://saurav.tech/NewsAPI/everything/cnn.json";

export const getServerSideProps:GetServerSideProps = async () => {
	const newsResult = await fetch(newsLink);
	const news = await newsResult.json()
	return {
		props: {articles: news.articles,totalResults:news.totalResults}
	}
}

