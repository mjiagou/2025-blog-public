import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const siteUrl = process.env.SITE_URL
		? process.env.SITE_URL
		: process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: 'http://localhost:3000'

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/write/']
		},
		sitemap: `${siteUrl}/sitemap.xml`
	}
}
