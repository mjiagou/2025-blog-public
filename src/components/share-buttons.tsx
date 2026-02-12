'use client'

import { motion } from 'motion/react'
import { Twitter, Link2, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

export function ShareButtons({ title }: { title: string }) {
	const [url, setUrl] = useState('')

	useEffect(() => {
		setUrl(window.location.href)
	}, [])

	const handleCopy = () => {
		navigator.clipboard.writeText(url)
		toast.success('链接已复制到剪贴板')
	}

	const handleTwitter = () => {
		window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
	}

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					url: url
				})
			} catch (err) {
				console.error('Error sharing:', err)
			}
		} else {
			handleCopy()
		}
	}

	return (
		<div className='flex items-center gap-3'>
			<span className='text-sm text-gray-500'>分享到：</span>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleTwitter}
				className='rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-black hover:text-white transition-colors'
				aria-label='Share on Twitter'>
				<Twitter className='h-4 w-4' />
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleCopy}
				className='rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-800 hover:text-white transition-colors'
				aria-label='Copy Link'>
				<Link2 className='h-4 w-4' />
			</motion.button>

			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={handleNativeShare}
				className='sm:hidden rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-blue-600 hover:text-white transition-colors'
				aria-label='Share'>
				<Share2 className='h-4 w-4' />
			</motion.button>
		</div>
	)
}
