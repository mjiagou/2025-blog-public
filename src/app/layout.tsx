import '@/styles/globals.css'

import type { Metadata } from 'next'
import Layout from '@/layout'
import Head from '@/layout/head'
import siteContent from '@/config/site-content.json'

const {
	meta: { title, description },
	theme
} = siteContent

const baseUrl = process.env.SITE_URL
	? process.env.SITE_URL
	: process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: title,
		template: `%s | ${title}`
	},
	description,
	keywords: ['前端开发', 'React', 'Next.js', 'Web开发', 'YYsuni', '博客', '技术分享'],
	authors: [{ name: siteContent.meta.username || 'YYsuni', url: baseUrl }],
	creator: siteContent.meta.username || 'YYsuni',
	publisher: siteContent.meta.username || 'YYsuni',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	openGraph: {
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description,
		url: baseUrl,
		siteName: title,
		locale: 'zh_CN',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description,
		creator: '@yysuni' // Assuming based on previous context or leave generic
	}
}

const htmlStyle = {
	cursor: 'url(/images/cursor.svg) 2 1, auto',
	'--color-brand': theme.colorBrand,
	'--color-primary': theme.colorPrimary,
	'--color-secondary': theme.colorSecondary,
	'--color-brand-secondary': theme.colorBrandSecondary,
	'--color-bg': theme.colorBg,
	'--color-border': theme.colorBorder,
	'--color-card': theme.colorCard,
	'--color-article': theme.colorArticle
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='zh-CN' suppressHydrationWarning style={htmlStyle}>
			<Head />
			
			{/* Google Analytics */}
			{process.env.NEXT_PUBLIC_GA_ID && (
				<>
					<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
					<script
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
							`
						}}
					/>
				</>
			)}

			{/* Google AdSense */}
			{process.env.NEXT_PUBLIC_ADSENSE_ID && (
				<>
					<meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_ID} />
					<script
						async
						src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
						crossOrigin="anonymous"
					/>
				</>
			)}


			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
					if (/windows|win32/i.test(navigator.userAgent)) {
						document.documentElement.classList.add('windows');
					}
		      `
					}}
				/>

				<Layout>{children}</Layout>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebSite',
							name: title,
							url: baseUrl,
							potentialAction: {
								'@type': 'SearchAction',
								target: `${baseUrl}/search?q={search_term_string}`,
								'query-input': 'required name=search_term_string'
							}
						})
					}}
				/>
			</body>
		</html>
	)
}
