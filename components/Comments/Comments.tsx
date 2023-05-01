import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import Moment from "react-moment";
import {signIn, useSession} from "next-auth/react";
import {collection, deleteDoc, doc, onSnapshot, setDoc} from "@firebase/firestore";
import {db} from "@/firebase";

import {
	ChartBarIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	EllipsisHorizontalIcon,
	HeartIcon, ShareIcon,
	TrashIcon
} from "@heroicons/react/24/outline";
import {HeartIcon as HeartIconFull} from "@heroicons/react/24/solid";
import {useRecoilState} from "recoil";
import {modalState} from "@/Atoms/modalAtom";
export type CommentsProps = {
	comment:any,
	commentId:string,
	originalPostId:string
}
const Comments:FC<CommentsProps> = ({comment,commentId,originalPostId}) => {
	const {data:session}:any = useSession();
	const [likes, setLikes] = useState<any[]>([]);
	const [hasLiked, setHasLiked] = useState<boolean>(false);
	const [open,setOpen] = useRecoilState(modalState);

	useEffect(()=>{
		onSnapshot(collection(db,'posts', originalPostId,"comments", commentId, "likes"),({docs})=>{
			setLikes(docs)
		})
	},[commentId, originalPostId]);
	useEffect(() => {
		setHasLiked(likes.findIndex((like)=> like.id === session?.user?.uid) !== -1)
	}, [likes,session]);

	const likeComment = async ():Promise<void> => {
		if(!hasLiked){
			if(!session) {
				await signIn()
			} else {
				await setDoc(doc(db,"posts",originalPostId,"comments", commentId, "likes",session?.user.uid),{
					username: session.user.username
				})
			}
		} else{
			await deleteDoc(doc(db,"posts", originalPostId,"comments", commentId, "likes", session?.user?.uid));
		}
	};

	const deleteComment = async ():Promise<void> => {
		if(window.confirm("Are you sure you want to delete comment ?")){
			await deleteDoc(doc(db,"posts", originalPostId, "comments", commentId))
		}
	}
	return (
		<div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
			{/*{User Image}*/}
			<Image
				src={comment.userImage}
				alt={comment.name}
				width={44}
				height={44}
				className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
			/>
			{/*{Right side}*/}
			<div className="flex-1">
				{/*{Header}*/}
				<div className="flex justify-between items-center">
					{/*{Comment User Info}*/}
					<div className="flex space-x-1 items-center whitespace-nowrap">
						<h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comment.name}</h4>
						<span className="text-sm sm:text-[15px]">@{comment.username}</span>
						<span className="text-sm sm:text-[15px] hover:underline">
							<Moment fromNow>{comment.timestamp?.toDate()}</Moment>
						</span>
					</div>
					<EllipsisHorizontalIcon
						className="h-10 w-10 hoverEffect hover:text-sky-500 hover:bg-sky-100 p-2"/>
				</div>

				{/*{Comment Text}*/}
				<p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{comment.comment}</p>

				{/*{Icons Block}*/}
				<div className="flex justify-between text-gray-500 p-2">
					<div className="flex items-center select-none">
						<ChatBubbleOvalLeftEllipsisIcon
							onClick={async ()=>{
								if(!session){
									await signIn()
								}else{
									// setPostId(originalPostId)
									setOpen(!open)
								}
							}}
							className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
						/>
					</div>

					{session?.user?.uid === comment.uid &&(
						<TrashIcon
							onClick={deleteComment}
							className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
					)}

					<div className="flex items-center">
						{hasLiked ? (
							<HeartIconFull
								onClick={likeComment}
								className={`h-9 w-9 hoverEffect text-red-500 p-2 hover:bg-red-100`}
							/>
						): (
							<HeartIcon
								onClick={likeComment}
								className={`h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100`}
							/>
						)
						}
						{likes.length > 0 && (
							<span className={`${hasLiked && "text-red-600"} text-sm select-none`}>
								{likes.length}
							</span>
						)}
					</div>
					<ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
					<ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
				</div>
			</div>
		</div>
	);
};

export default Comments;
