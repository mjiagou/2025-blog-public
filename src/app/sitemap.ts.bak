import { MetadataRoute } from 'next'
import blogIndex from '@/../public/blogs/index.json'
import type { BlogIndexItem } from '@/app/blog/types'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// 域名配置：
	// 1. 优先使用 SITE_URL (你在 Vercel 手动设置的正式域名)
	// 2. 其次尝试 VERCEL_URL (Vercel 自动生成的预览域名，通常不带 https://)
	// 3. 最后回退到本地开发地址
	const baseUrl = process.env.SITE_URL ? process.env.SITE_URL : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

	console.log(`[Sitemap] Generating for: ${baseUrl}`)

	let posts: BlogIndexItem[] = blogIndex

	const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.date ? new Date(post.date) : new Date(),
		changeFrequency: 'weekly',
		priority: 0.8
	}))

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8
		},
		{
			url: `${baseUrl}/snippets`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8
		},
		{
			url: `${baseUrl}/bloggers`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5
		},
		{
			url: `${baseUrl}/image-toolbox`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5
		},
		{
			url: `${baseUrl}/clock`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3
		},
		{
			url: `${baseUrl}/music`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3
		}
	]

	return [...staticEntries, ...postEntries]
}
