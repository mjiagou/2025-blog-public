import { Metadata } from 'next'
import { getBlogConfig } from '@/lib/blog-server'

type Props = {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { id } = await params
  const config = await getBlogConfig(id)

  if (!config) {
    return {
      title: 'Article Not Found',
    }
  }

  const siteUrl = process.env.SITE_URL 
    ? process.env.SITE_URL 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
      
  // Handle cover image paths:
  // - If starts with http/https: use as-is (external URL)
  // - If starts with /: prepend site URL (absolute path from public root)
  // - Otherwise: construct path as /blogs/{slug}/{filename} (relative filename)
  const coverUrl = config.cover
    ? (config.cover.startsWith('http') 
        ? config.cover 
        : config.cover.startsWith('/') 
          ? `${siteUrl}${config.cover}`
          : `${siteUrl}/blogs/${id}/${config.cover}`)
    : undefined

  return {
    title: config.title,
    description: config.summary || config.title,
    openGraph: {
        title: config.title,
        description: config.summary || config.title,
        type: 'article',
        publishedTime: config.date,
        tags: config.tags,
        images: coverUrl ? [{ url: coverUrl }] : undefined
    },
    twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.summary || config.title,
        images: coverUrl ? [coverUrl] : undefined
    }
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
