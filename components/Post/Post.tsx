import React, {FC} from 'react';
import {
	ChartBarIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	EllipsisHorizontalIcon,
	HeartIcon,
	ShareIcon,
	TrashIcon
} from "@heroicons/react/24/outline";
import {IPost} from "@/interfaces/post";
import Moment from "react-moment";

type PostComponent = {
	postData:IPost
}
const Post:FC<PostComponent> = ({postData}) => {

	return (
		<div className="flex p-3 cursor-pointer border-b border-gray-200">
			{/*{User Image}*/}
			<img
				src={postData.userImage}
				alt={postData.name}
				className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
			/>
			{/*{Right side}*/}
			<div className="">
				{/*{Header}*/}
				<div className="flex justify-between items-center">
					{/*{Post User Info}*/}
					<div className="flex space-x-1 items-center whitespace-nowrap">
						<h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{postData.name}</h4>
						<span className="text-sm sm:text-[15px]">{postData.username}</span>
						<span className="text-sm sm:text-[15px] hover:underline">
							<Moment fromNow>{postData?.timestamp?.toDate()}</Moment>
						</span>
					</div>
					<EllipsisHorizontalIcon
						className="h-10 w-10 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100 p-2"/>
				</div>

				<p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{postData.text}</p>
				{postData.image && (<img src={postData.image} alt={postData.text} className="rounded-2xl mr-2"/>)}

				{/*{Icons Block}*/}
				<div className="flex justify-between text-gray-500 p-2">
					<ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
					<TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
					<HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
					<ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
					<ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
				</div>
			</div>
		</div>
	);
};

export default Post;
