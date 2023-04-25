export interface Article{
	source: { id: string, name: 'CNN' },
	author: string,
	title: string,
	description: string,
	url: string,
	urlToImage: string,
	publishedAt: Date,
	content: string
}
