'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

export function EditButton({ slug }: { slug: string }) {
	const router = useRouter()

	const handleEdit = () => {
		router.push(`/write/${slug}`)
	}

	return (
		<motion.button
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{ opacity: 1, scale: 1 }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleEdit}
			className='absolute top-4 right-6 rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80 max-sm:hidden'>
			编辑
		</motion.button>
	)
}
