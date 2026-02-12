'use client'

import { useEffect, useState } from 'react'

type AdContainerProps = {
	slot?: string
	format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
	responsive?: boolean
	className?: string
}

export function AdContainer({ slot, format = 'auto', responsive = true, className = '' }: AdContainerProps) {
	const [adLoaded, setAdLoaded] = useState(false)
	const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

	useEffect(() => {
		if (adsenseId && slot) {
			try {
				// @ts-ignore
				;(window.adsbygoogle = window.adsbygoogle || []).push({})
				setAdLoaded(true)
			} catch (err) {
				console.error('AdSense error:', err)
			}
		}
	}, [adsenseId, slot])

	// Don't render if no AdSense ID is configured
	if (!adsenseId) {
		return null
	}

	// Placeholder when ad slot is not provided
	if (!slot) {
		return (
			<div className={`ad-placeholder min-h-[100px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 ${className}`}>
				<span className='text-sm text-gray-400'>广告位</span>
			</div>
		)
	}

	return (
		<div className={`ad-container ${className}`}>
			<ins
				className='adsbygoogle'
				style={{ display: 'block' }}
				data-ad-client={adsenseId}
				data-ad-slot={slot}
				data-ad-format={format}
				data-full-width-responsive={responsive ? 'true' : 'false'}></ins>
		</div>
	)
}
