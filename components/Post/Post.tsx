import React, {FC, useState,useEffect} from 'react';
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
import {collection, deleteDoc, doc, onSnapshot, setDoc} from "@firebase/firestore";
import {db, storage} from "@/firebase";
import {signIn, useSession} from "next-auth/react";
import {HeartIcon as HeartIconFull} from "@heroicons/react/24/solid";
import Image from 'next/image';
import {deleteObject, ref} from "@firebase/storage";
import {useRecoilState} from "recoil";
import {modalState, postIdState} from "@/Atoms/modalAtom";

type PostComponent = {
	postData:IPost,
	postId:string
}

const Post:FC<PostComponent> = ({postData,postId}) => {
	const {data:session}:any = useSession();
	const [open,setOpen] = useRecoilState(modalState);
	const [,setPostIdS] = useRecoilState(postIdState);
	const [likes, setLikes] = useState<any[]>([]);
	const [hasLiked, setHasLiked] = useState<boolean>(false);
	useEffect(()=>{
		onSnapshot(collection(db,'posts', postId,"likes"),({docs})=>{
			setLikes(docs)
		})
	},[postId]);
	useEffect(() => {
		setHasLiked(likes.findIndex((like)=> like.id === session?.user?.uid) !== -1)
	}, [likes,session]);


	const likePost = async ():Promise<void> => {
		if(!hasLiked){
			if(!session) {
				await signIn()
			} else {
				await setDoc(doc(db,"posts",postId, "likes",session?.user.uid),{
					username: session.user.username
				})
			}
		} else{
			await deleteDoc(doc(db,"posts", postId,"likes", session?.user?.uid));
		}
	};

	const deletePost = async ():Promise<void> => {
		if(window.confirm("Are you sure you want to delete post ?")){
			await deleteDoc(doc(db,"posts",postId))
			if(postData.image){
				await deleteObject(ref(storage, `posts/${postId}/image`))
			}
		}
	}

	return (
		<div className="flex p-3 cursor-pointer border-b border-gray-200">
			{/*{User Image}*/}
			<Image
				src={postData.userImage}
				alt={postData.name}
				width={44}
				height={44}
				className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
			/>
			{/*{Right side}*/}
			<div className="">
				{/*{Header}*/}
				<div className="flex justify-between items-center">
					{/*{Post User Info}*/}
					<div className="flex space-x-1 items-center whitespace-nowrap">
						<h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{postData.name}</h4>
						<span className="text-sm sm:text-[15px]">@{postData.username}</span>
						<span className="text-sm sm:text-[15px] hover:underline">
							<Moment fromNow>{postData?.timestamp?.toDate()}</Moment>
						</span>
					</div>
					<EllipsisHorizontalIcon
						className="h-10 w-10 hoverEffect hover:text-sky-500 hover:bg-sky-100 p-2"/>
				</div>
				<p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{postData.text}</p>
					{postData.image && (
						<Image
							width={300}
							height={300}
							style={{
								width: '100%',
								height: 'auto',
							}}
							src={postData.image} alt={postData.text} className="rounded-2xl mr-2"/>
					)}
				{/*{Icons Block}*/}
				<div className="flex justify-between text-gray-500 p-2">
					<ChatBubbleOvalLeftEllipsisIcon

						onClick={async ()=>{
							if(!session){
								await signIn()
							}else{
								setPostIdS(postId)
								setOpen(!open)
							}
						}}
						className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"/>
					{session?.user?.uid === postData.id &&(
						<TrashIcon
							onClick={()=>deletePost()}
							className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"/>
					)}
					<div className="flex items-center">
						{hasLiked ? (
							<HeartIconFull
								onClick={()=>likePost()}
								className={`h-9 w-9 hoverEffect text-red-500 p-2 hover:bg-red-100`}
							/>
						): (
							<HeartIcon
								onClick={()=>likePost()}
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

export default Post;
