import React, {FC} from 'react';
import Image from "next/image";
import Moment from "react-moment";
export type CommentsProps = {
	comment:any,
	commentId:string
}
const Comments:FC<CommentsProps> = ({comment,commentId}) => {
	return (
		<div className="p-2">
			<div className="flex items-center space-x-2">
				<Image
					src={comment.userImage}
					alt={comment.name}
					className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
					width={44}
					height={44}
				/>
				<p className="font-bold">{comment.name}</p>
				<p>@{comment?.username}</p>
				<Moment fromNow>{comment?.timestamp?.toDate()}</Moment>

			</div>
			<p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
				{comment.comment}
			</p>
		</div>
	);
};

export default Comments;
