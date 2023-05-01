import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {modalState, postIdState} from "@/Atoms/modalAtom";
import Modal from 'react-modal';
import {FaceSmileIcon, PhotoIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {db} from "@/firebase";
import {addDoc, collection, doc, onSnapshot, serverTimestamp} from "@firebase/firestore";
import Image from "next/image";
import Moment from "react-moment";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

export type CommentsModalProps = {
	postId: string | undefined;
}
const CommentsModal:FC<CommentsModalProps> = ({postId}) => {
	const [open, setOpen] = useRecoilState(modalState);
	const [postIdS,] = useRecoilState(postIdState);
	const [post, setPosts] = useState<any>({});
	const [text, setText] = useState('')
	const {data: session}: any = useSession();
	const router = useRouter();
	useEffect(() => {
		onSnapshot(doc(db, "posts", postIdS), (snapshot) => {
			setPosts(snapshot)
		})
	}, [postIdS]);
	const sendComment = async (event: FormEvent) => {
		event.preventDefault();
		await addDoc(collection(db,'posts',postIdS,"Comments"),{
			comment: text,
			name:session.user.name,
			username:session.user.username,
			userImage:session.user.image,
			timestamp:serverTimestamp(),
			uid:session.user.uid
		});
		setOpen(false);
		setText('');
		if(postId) {
			await router.push(`/posts/${postIdS}`)
		} else {
			return;
		}
	};

	return (
		<>
			{post && (
				<div>
					{open && (
						<Modal
							appElement={document.getElementById('__next') as HTMLElement}
							isOpen={open}
							onRequestClose={() => setOpen(false)}
							className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md border-gray-400"
						>
							<div className="p-1">
								<div className="border-b border-gray-200 py-2 px-1.5">
									<div className="hoverEffect w-9 h-9 flex items-center justify-center p-0">
										<XMarkIcon
											onClick={() => setOpen(false)}
											className="h-7 cursor-pointer text-gray-700"
										/>
									</div>
								</div>
								<div className="p-2 flex items-center space-x-1 relative">
									<span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"/>
									<Image
										src={post?.data()?.userImage}
										alt={post?.data()?.name}
										width={44}
										height={44}
										className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
									/>
									<h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
									<span className="text-sm sm:text-[15px]">@{post?.data()?.username}</span>
									<span className="text-sm sm:text-[15px] hover:underline">
								<Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
							</span>
								</div>
								<p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.data()?.text}</p>

								<div className="flex p-3 space-x-3">
									<Image
										width={44}
										height={44}
										className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 "
										src={session?.user?.image || ''}
										alt="photo of profile"
									/>
									<div className="w-full divide-y divide-gray-200">
										<div className="">
									<textarea
										rows={3}
										className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
										placeholder="Tweet your replay?"
										value={text}
										onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
									/>
										</div>

										<div className="flex items-center justify-between pt-2.5">
											<div className="flex ">
												<div
													// className="" onClick={() => refInput.current?.click()}
												>
													<PhotoIcon
														className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
													/>
													{/*<input*/}
													{/*	type="file"*/}
													{/*	name="" id=""*/}
													{/*	className="hidden"*/}
													{/*	hidden*/}
													{/*	ref={refInput}*/}
													{/*	onChange={addImageToPost}*/}
													{/*/>*/}
												</div>

												<FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
											</div>
											<button
												type="submit"
												onClick={sendComment}
												disabled={!text.trim()}
												className="font-bold bg-blue-300 text-white px-4 py-1.5 rounded-full shadow-md hover:brightness-95 disabled:opacity-50">Replay
											</button>
										</div>
									</div>
								</div>

							</div>

						</Modal>
					)}
				</div>
			)}
		</>
	);
};

export default CommentsModal;
