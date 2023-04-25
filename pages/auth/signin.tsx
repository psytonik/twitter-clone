import React from 'react';
import {getProviders, signIn} from "next-auth/react";

const SignIn = ({providers}:any) => {
	return (
		<div className="flex justify-center mt-20 space-x-4">
			<img
				className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"
				src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
				alt="sign in page"
			/>
			<div className="">
				{providers && Object.values(providers).map((provider:any,index)=>(
					<div key={index} className="flex flex-col items-center ">
						<img
							className="w-36 object-cover"
							src="https://upload.wikimedia.org/wikipedia/sco/9/9f/Twitter_bird_logo_2012.svg"
							alt=""/>
						<p className="text-center text-sm italic my-10">This app is created for learning purposes</p>
						<button
							onClick={()=>signIn(provider.id,{callbackUrl:'/'})}
							className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500">Sign In with {provider.name}</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SignIn;
export const getServerSideProps = async() => {
	const providers = await getProviders();
	return {
		props:{
			providers
		}
	}
}
