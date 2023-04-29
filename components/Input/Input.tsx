import React, {ChangeEvent, FormEvent, RefObject, useRef, useState} from "react";
import {FaceSmileIcon, PhotoIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {signOut, useSession} from "next-auth/react";
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db, storage} from "@/firebase";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import Image from "next/image";

const Input = () => {
	const {data: session}: any = useSession();
	const refInput: RefObject<HTMLInputElement> = useRef(null);

	const [text, setText] = useState<string>('');
	const [image, setImage] = useState<string | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const addImageToPost = (e: ChangeEvent<HTMLInputElement>): void => {
		const reader = new FileReader();
		if (e.target.files?.[0]) {
			reader.readAsDataURL(e.target.files[0])
		}
		reader.onload = (readerEvent) => {
			const arrayBuffer = readerEvent.target?.result;
			setImage(arrayBuffer as string);
		}
	}

	const onSubmit = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		setIsLoading(true);
		const docRef = await addDoc(collection(db, 'posts'), {
			id: session?.user.uid,
			text: text,
			userImage: session.user.image,
			timestamp: serverTimestamp(),
			name: session.user.name,
			username: session.user.username
		})
		const imageRef = ref(storage, `posts/${docRef.id}/image`);
		if (image) {
			await uploadString(imageRef, image, "data_url")
				.then(async (): Promise<void> => {
					const downloadUrl: string = await getDownloadURL(imageRef);
					await updateDoc(doc(db, 'posts', docRef.id), {
						image: downloadUrl
					})
				}).finally(()=>{
					setImage(null);
				})
		}
		setText('');
		setIsLoading(false);
	}

	return (
		<>
			{session && (<div className="flex border-b border-gray-200 p-3 space-x-3">
				<Image
					width={44}
					height={44}
					onClick={() => signOut()}
					className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 "
					src={session.user?.image || ''}
					alt="photo of profile"
				/>
				<div className="w-full divide-y divide-gray-200">
					<div className="">
						<textarea
							rows={3}
							className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
							placeholder="What's happening ?"
							value={text}
							onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
						/>
					</div>

					{image && (<div className="relative">
						<XMarkIcon
							onClick={()=>setImage(null)}
							className="border border-white h-7 absolute cursor-pointer text-red-500 shadow-md rounded-2xl m-1 shadow-white"/>
							<Image
								width={300}
								height={400}
								sizes="100vw"
								style={{
									width: '100%',
									height: 'auto',
								}}
								src={image} alt="temp" className={`rounded-2xl ${isLoading && "animate-pulse"}`}/>
						</div>
					)}

					<div className="flex items-center justify-between pt-2.5">
						<div className="flex ">
							<div className="" onClick={() => refInput.current?.click()}>
								<PhotoIcon
									className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
								/>
								<input
									type="file"
									name="" id=""
									className="hidden"
									hidden
									ref={refInput}
									onChange={addImageToPost}
								/>
							</div>

							<FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
						</div>
						<button
							type="submit"
							onClick={onSubmit}
							disabled={!text.trim() || isLoading}
							className="font-bold bg-blue-300 text-white px-4 py-1.5 rounded-full shadow-md hover:brightness-95 disabled:opacity-50">Tweet
						</button>
					</div>
				</div>
			</div>)}
		</>
	);
};

export default Input;
