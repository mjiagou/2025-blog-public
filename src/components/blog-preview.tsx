'use client'

import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'
import { useSize } from '@/hooks/use-size'
import { BlogSidebar } from '@/components/blog-sidebar'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import type { ReactElement } from 'react'
import type { TocItem } from '@/lib/markdown-renderer'

import { BlogBreadcrumbs } from '@/components/blog-breadcrumbs'
import { ShareButtons } from '@/components/share-buttons'
import { InArticleAd } from '@/components/ads/in-article-ad'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// ... existing types ...

type BlogPreviewProps = {
	content: ReactElement | null
	toc: TocItem[]
	title: string
	tags: string[]
	date: string
	summary?: string
	cover?: string
	slug?: string
	prevPost?: { slug: string; title: string } | null
	nextPost?: { slug: string; title: string } | null
}

export function BlogPreview({ content, toc, title, tags, date, summary, cover, slug, prevPost, nextPost }: BlogPreviewProps) {
	const { maxSM: isMobile } = useSize()
	const { siteContent } = useConfigStore()
	const summaryInContent = siteContent.summaryInContent ?? false

	return (
		<div className='mx-auto flex max-w-[1140px] justify-center gap-6 px-6 pt-24 pb-12 max-sm:px-0'>
			<motion.article
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: INIT_DELAY }}
				className='card bg-article static flex-1 overflow-auto rounded-xl p-8'>
				
				<div className='mb-6'>
					<BlogBreadcrumbs title={title} />
				</div>

				<div>
					<div className='text-center text-2xl font-semibold'>{title}</div>

					<div className='text-secondary mt-4 flex flex-wrap items-center justify-center gap-3 px-8 text-center text-sm'>
						{tags.map(t => (
							<span key={t}>#{t}</span>
						))}
					</div>

					<div className='text-secondary mt-3 text-center text-sm'>{date}</div>

					{/* Ad Placement: Below Title */}
					<InArticleAd className='mt-6' />

					{summary && summaryInContent && <div className='text-secondary mt-6 cursor-text text-center text-sm'>"{summary}"</div>}

					<div className='prose mt-6 max-w-none cursor-text'>
						{content}
						{/* Ad Placement: Mid-Article */}
						<InArticleAd />
					</div>

					{/* Ad Placement: Before Footer */}
					<InArticleAd />

					{/* Post Footer: Share & Navigation */}
					<div className='mt-12 border-t pt-8'>
						<div className='mb-8 flex justify-center'>
							<ShareButtons title={title} />
						</div>

						<div className='grid gap-4 sm:grid-cols-2'>
							{prevPost ? (
								<Link href={`/blog/${prevPost.slug}`} className='group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-gray-50'>
									<div className='flex items-center gap-2 text-sm text-gray-500'>
										<ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
										<span>上一篇</span>
									</div>
									<span className='font-medium truncate'>{prevPost.title}</span>
								</Link>
							) : (
								<div />
							)}

							{nextPost ? (
								<Link href={`/blog/${nextPost.slug}`} className='group flex flex-col gap-1 items-end rounded-lg border p-4 transition-colors hover:bg-gray-50 text-right'>
									<div className='flex items-center gap-2 text-sm text-gray-500'>
										<span>下一篇</span>
										<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
									</div>
									<span className='font-medium truncate'>{nextPost.title}</span>
								</Link>
							) : (
								<div />
							)}
						</div>
					</div>
				</div>
			</motion.article>

			{!isMobile && <BlogSidebar cover={cover} summary={summary} toc={toc} slug={slug} />}
		</div>
	)
}
