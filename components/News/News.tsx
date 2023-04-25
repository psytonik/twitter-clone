import React, {FC} from 'react';
import {Article} from "@/interfaces/article";

type NewsComponentProps = {
	article:Article
}
const News:FC<NewsComponentProps> = ({article}) => {
	return (
		<a target="_blank" href={article.url} className="">
			<div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
				<div className="space-y-0.5">
					<h6 className="text-sm font-bold">{article.title}</h6>
					<p className="text-xs font-medium text-gray-500">{article.source.name}</p>
				</div>
				<img src={article.urlToImage} alt={article.title} width={70} className="rounded-xl "/>
			</div>
		</a>
	);
};

export default News;
