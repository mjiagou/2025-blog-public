'use client'

import { useEffect } from 'react'
import { useReadArticles } from '@/hooks/use-read-articles'

export function MarkAsRead({ slug }: { slug: string }) {
	const { markAsRead } = useReadArticles()

	useEffect(() => {
		if (slug) {
			markAsRead(slug)
		}
	}, [slug, markAsRead])

	return null
}
