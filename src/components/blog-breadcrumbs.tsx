'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export function BlogBreadcrumbs({ title }: { title: string }) {
	return (
		<nav aria-label='Breadcrumb' className='flex items-center space-x-2 text-sm text-gray-500'>
			<Link href='/' className='flex items-center hover:text-gray-900 transition-colors'>
				<Home className='h-4 w-4' />
				<span className='sr-only'>首页</span>
			</Link>
			<ChevronRight className='h-4 w-4 text-gray-400' />
			<span className='font-medium text-gray-900 truncate max-w-[200px] sm:max-w-[400px]'>{title}</span>
		</nav>
	)
}
