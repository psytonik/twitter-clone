import React, {ChangeEvent, FormEvent, useState} from "react";
import {FaceSmileIcon, PhotoIcon} from "@heroicons/react/24/outline";

const Input = () => {
	const [text,setText] = useState<string>('');
	const [isText,setIsText] = useState<boolean>(false)
	const onSubmit = (event:FormEvent)=>{
		event.preventDefault();
		console.log(text)
	}

	return (
		<div className="flex border-b border-gray-200 p-3 space-x-3">
			<img
				className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 "
				src="https://anthonyfink.dev/profile.png"
				alt="photo of profile"
			/>
			<div className="w-full divide-y divide-gray-200">
				<div className="">
					<textarea
						rows={3}
						className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
						placeholder="What's happening ?"
						value={text}
						onChange={(event:ChangeEvent<HTMLTextAreaElement>)=>setText(event.target.value)}
					/>
				</div>
				<div className="flex items-center justify-between pt-2.5">
					<div className="flex ">
						<PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
						<FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
					</div>
					<button
						type="submit"
						onClick={onSubmit}
						disabled={isText}
						className="font-bold bg-blue-300 text-white px-4 py-1.5 rounded-full shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button>
				</div>
			</div>
		</div>
	);
};

export default Input;
