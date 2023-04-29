import React, {useEffect, useState} from 'react';
import {SparklesIcon} from "@heroicons/react/24/outline";
import {Input, Post} from "@/components";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "@/firebase";
import {AnimatePresence,motion} from "framer-motion";

const Feed = () => {
	const [posts, setPosts] = useState<any>([]);
	useEffect(() => {
		onSnapshot(
			query(collection(db, 'posts')
				, orderBy("timestamp", "desc"))
			, ({docs}) => {
				if(docs.length >0){
					setPosts(docs)
				}
			});
	}, []);

	return (
		<div
			className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
			<div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 items-center">
				<h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
				<div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
					<SparklesIcon className="h-5 "/>
				</div>
			</div>
			<Input/>
			<AnimatePresence>
				{
					posts.map((post:any)=>(
							<motion.div
								key={post.id}
								initial={{opacity:0}}
								animate={{opacity:1}}
								exit={{opacity:0}}
								transition={{duration:1}}
							>
								<Post postData={post.data()} postId={post.id}/>
							</motion.div>
						)
					)
				}
			</AnimatePresence>
		</div>
	);
};

export default Feed;
