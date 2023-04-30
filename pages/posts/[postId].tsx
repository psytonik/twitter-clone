import React, {FC, useEffect, useState} from 'react';
import {NextRouter, useRouter} from "next/router";
import Head from "next/head";
import {Post, Sidebar, Widgets} from "@/components";
import {GetServerSideProps} from "next";
import {Article} from "@/interfaces/article";
import {Users} from "@/interfaces/users";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {doc, onSnapshot} from "@firebase/firestore";
import {db} from "@/firebase";

type PostByIdProps = {
	articles:Article[],
	totalArticles: number,
	users:Users[]
}
const PostById:FC<PostByIdProps> = ({articles,totalArticles, users}) => {
	const router:NextRouter = useRouter();
	const {postId} = router.query;
	const [post,setPost] = useState<any>(null);

	useEffect(() => {
		if(!postId) return;
		onSnapshot(doc(db,"posts", postId as string),(snapshot)=>{
			setPost(snapshot)
		})
	}, [postId]);
	return (
		<>
			<Head>
				<title>Post Comments</title>
				<meta name="description" content="Twitter Clone App written in NextJs" />
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<main className="flex min-h-screen mx-auto justify-between">
				{/*{SideBar}*/}
				<Sidebar/>
				{/*{Feed}*/}

				<div
					className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
					<div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 items-center space-x-2">
						<div className="hoverEffect">
							<ArrowLeftIcon className="h-5" onClick={()=>router.push('/')}/>
						</div>
						<h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
					</div>
					{post && (
						<Post
							postData={post.data()}
							postId={postId as string}
						/>
					)}
				</div>

				{/*{Widgets}*/}
				<Widgets articles={articles} totalArticles={totalArticles} users={users}/>
			</main>
		</>
	);
};

export default PostById;

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
