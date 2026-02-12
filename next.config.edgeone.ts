import { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// EdgeOne Pages需要静态导出
	output: 'export',
	
	devIndicators: false,
	reactStrictMode: false,
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	
	typescript: {
		// 与主配置保持一致，避免构建失败
		ignoreBuildErrors: true
	},
	
	// 静态导出需要禁用图片优化
	images: {
		unoptimized: true
	},
	
	// Empty turbopack config to silence webpack config warning
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		}
	},
	
	// 静态导出不支持运行时headers，需要在EdgeOne控制台配置
	// async headers() {...}
	
	// 静态导出不支持服务端redirects，可以使用客户端重定向
	// async redirects() {...}
	
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: [{ loader: '@svgr/webpack', options: { svgo: false } }]
		})

		return config
	}
}

export default nextConfig
