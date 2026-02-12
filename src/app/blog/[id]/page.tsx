import { notFound } from 'next/navigation'
import dayjs from 'dayjs'
import { BlogPreview } from '@/components/blog-preview'
import { getBlogConfig, getBlogMarkdown, getAdjacentPosts } from '@/lib/blog-server'
import { renderMarkdownServer } from '@/lib/markdown-server-render'
import { MarkAsRead } from '@/components/mark-as-read'
import LiquidGrass from '@/components/liquid-grass'
import { EditButton } from '../components/edit-button'
import blogIndex from '@/../public/blogs/index.json'

export async function generateStaticParams() {
	return blogIndex.map((post: any) => ({
		id: post.slug
	}))
}

type Props = {
	params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
	const { id: slug } = await params

	const config = await getBlogConfig(slug)
	const markdown = await getBlogMarkdown(slug)

	if (!config || !markdown) {
		notFound()
	}

	const { content, toc } = await renderMarkdownServer(markdown)
	const { prev, next } = await getAdjacentPosts(slug)

	const title = config.title || slug
	const date = dayjs(config.date).format('YYYY年 M月 D日')
	const tags = config.tags || []
	const cover = config.cover

	return (
		<>
			<BlogPreview
				content={content}
				toc={toc}
				title={title}
				tags={tags}
				date={date}
				summary={config.summary}
				cover={cover}
				slug={slug}
				prevPost={prev}
				nextPost={next}
			/>

			<EditButton slug={slug} />

			<MarkAsRead slug={slug} />

			{slug === 'liquid-grass' && <LiquidGrass />}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: title,
						datePublished: date,
						dateModified: date,
						description: config.summary || config.title,
						image: cover ? [cover] : [],
						author: {
							'@type': 'Person',
							name: 'YYsuni',
							url: 'https://yysuni.com'
						}
					})
				}}
			/>
		</>
	)
}
