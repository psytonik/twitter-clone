import {Feed, CommentsModal, Sidebar, Widgets} from "@/components";
import Head from "next/head";
import {FC} from "react";
import {Article} from "@/interfaces/article";
import {GetServerSideProps} from "next";
import {Users} from "@/interfaces/users";

type HomeProps = {
	articles:Article[],
	totalArticles: number,
	users:Users[]
}
const Home:FC<HomeProps> = ({articles,totalArticles, users}) => {
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
				<Widgets articles={articles} totalArticles={totalArticles} users={users}/>
				{/*{CommentsModal}*/}
				<CommentsModal/>
			</main>
		</>
	)
}
export default Home;

const newsLink = "https://saurav.tech/NewsAPI/everything/cnn.json";

export const getServerSideProps:GetServerSideProps = async () => {
	const newsResult:Response = await fetch(newsLink);
	const news = await newsResult.json()
	const randomUserRes:Response = await fetch('https://randomuser.me/api/?results=50&inc=name,login,picture,email');
	const users = await randomUserRes.json();
	return {
		props: {
			articles: news.articles,
			totalArticles:news.totalResults,
			users:users.results
		}
	}
}

