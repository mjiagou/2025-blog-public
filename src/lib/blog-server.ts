import fs from 'fs'
import path from 'path'
import type { BlogConfig } from '@/app/blog/types'

export async function getBlogConfig(slug: string): Promise<BlogConfig | null> {
	try {
		const filePath = path.join(process.cwd(), 'public', 'blogs', slug, 'config.json')
		if (!fs.existsSync(filePath)) {
			return null
		}
		const content = await fs.promises.readFile(filePath, 'utf-8')
		return JSON.parse(content)
	} catch (error) {
		console.error(`Error reading blog config for ${slug}:`, error)
		return null
	}
}

export async function getBlogMarkdown(slug: string): Promise<string | null> {
	try {
		const filePath = path.join(process.cwd(), 'public', 'blogs', slug, 'index.md')
		if (!fs.existsSync(filePath)) {
			return null
		}
		return await fs.promises.readFile(filePath, 'utf-8')
	} catch (error) {
		console.error(`Error reading blog markdown for ${slug}:`, error)
		return null
	}
}

import blogIndex from '@/../public/blogs/index.json'

export type BlogPostSummary = {
	slug: string
	title: string
}

export async function getAdjacentPosts(slug: string): Promise<{ prev: BlogPostSummary | null; next: BlogPostSummary | null }> {
	// Filter hidden posts and sort by date descending (newest first)
	const sortedPosts = blogIndex
		.filter((post: any) => !post.hidden)
		.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const currentIndex = sortedPosts.findIndex((post: any) => post.slug === slug)

	if (currentIndex === -1) {
		return { prev: null, next: null }
	}

	// In a descending list:
	// Index - 1 is newer (Next)
	// Index + 1 is older (Previous)
	const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
	const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

	return {
		prev: prevPost ? { slug: prevPost.slug, title: prevPost.title } : null,
		next: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null
	}
}
