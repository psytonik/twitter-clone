import React, {FC, useState} from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Article} from "@/interfaces/article";
import {News} from "@/components";

type WidgetsComponentProps = {
	articles:Article[],
	total:number
}
const Widgets:FC<WidgetsComponentProps> = ({articles, total}) => {
	const [articleNum,setArticleNum] = useState<number>(3);
	return (
		<div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
			<div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
				<div className="flex items-center border rounded-full p-3 bg-gray-200 relative">
					<MagnifyingGlassIcon className="h-5 z-50 text-gray-500 "/>
					<input type="text" className="border-none rounded-full focus:ring-0 bg-gray-100 inset-0 absolute pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white" placeholder="Search Tweeter"/>
				</div>
			</div>
			<div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
				<h4 className="font-bold text-xl px-4">What&apos;s happening</h4>
				{articles.slice(0,articleNum).map(article=>{
					return(
						<News key={article.url} article={article}/>
					)
				})}
				<button
					onClick={()=>setArticleNum(articleNum + 3)}
					className={`text-blue-300 pl-4 pb-3 hover:text-blue-400 ${articleNum ==100 && 'hidden'}`}
					disabled={articleNum >= total}
				>Show More</button>
			</div>

		</div>
	);
};

export default Widgets;
