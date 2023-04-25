import React from 'react';
import Image from 'next/image';
import SidebarMenuItem from "../SidebarMenuItem";
import {HashtagIcon, HomeIcon,BellIcon,EnvelopeIcon,BookmarkIcon,ClipboardIcon,UserIcon,EllipsisHorizontalCircleIcon,EllipsisHorizontalIcon} from "@heroicons/react/24/outline";

const menus:any = [
	{
		name:"Home",
		icon: HomeIcon,
		active:'active'
	},
	{
		name:"Explore",
		icon:HashtagIcon

	},
	{
		name:"Notifications",
		icon: BellIcon
	},
	{
		name:"Messages",
		icon: EnvelopeIcon
	},
	{
		name:"Bookmarks",
		icon: BookmarkIcon
	},
	{
		name:"Lists",
		icon: ClipboardIcon
	},
	{
		name:"Profile",
		icon: UserIcon

	},
	{
		name:"More",
		icon:EllipsisHorizontalCircleIcon

	}
]
const Sidebar = () => {
	return (
		<div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
			{/*{Twitter Logo}*/}
			<div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
				<Image
					width="50"
					height="50"
					alt="logo of twitter"
					src="https://upload.wikimedia.org/wikipedia/sco/9/9f/Twitter_bird_logo_2012.svg"
				/>
			</div>
			{/*{Menu}*/}
			<div className="mt-4 mb-2.5 xl:items-start">
				{menus.map((menu:any,index:number)=>(
					<div key={index}>
						<SidebarMenuItem menuName={menu.name} Icon={menu.icon} active={menu?.active}/>
					</div>
				))}
			</div>
			{/*{Button}*/}
			<button
				className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
			>
				Tweet
			</button>
			{/*{Mini Profile}*/}
			<div className="hoverEffect flex text-gray-700 items-center justify-center xl:justify-start mt-auto">
				<img
					className="h-10 w-10 rounded-full xl:mr-2"
					src="https://anthonyfink.dev/profile.png"
					alt="photo of profile"/>
				<div className="leading-5 hidden xl:inline">
					<h4 className="font-bold">My Name</h4>
					<p className="text-gray-500">@psytonik</p>
				</div>
				<EllipsisHorizontalIcon className="h-5 xl:ml-8"/>
			</div>
		</div>
	);
};

export default Sidebar;
