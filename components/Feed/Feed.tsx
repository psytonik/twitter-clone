import React from 'react';
import {SparklesIcon} from "@heroicons/react/24/outline";
import {Input, Post} from "@/components";

const Feed = () => {
	const posts = [
		{
			id: 1,
			name: 'Anthony',
			username: '@psytonik',
			userImage: 'https://anthonyfink.dev/profile.png',
			img: 'https://images.unsplash.com/photo-1681999683665-6902894af42c',
			text: 'good colors',
			timestamp: '2 hours ago'
		},
		{
			id: 2,
			name: 'Nitzan',
			username: '@fandina45',
			userImage: 'https://cdn.xplace.com/companyLogo/u/m/umszny.png',
			img: 'https://images.unsplash.com/photo-1682070346575-8c6a27814963',
			text: 'Nice',
			timestamp: '6 hours ago'
		}
	]

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
			{
				posts.map((post)=>(
					<div key={post.id}>
						<Post postData={post}/>
					</div>
				))
			}
		</div>
	);
};

export default Feed;
