import React from 'react';
import {useRecoilState} from "recoil";
import {modalState} from "@/Atoms/modalAtom";

const Modal = () => {
	const [open,setOpen] = useRecoilState(modalState);

	return (
		<div>
			<h1>Comments modal</h1>
			{open&& (
				<h1>Hello from modal</h1>
			)}
		</div>
	);
};

export default Modal;
