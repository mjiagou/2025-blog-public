import { AdContainer } from '../ad-container'

export function InArticleAd({ slot, className }: { slot?: string; className?: string }) {
	return <AdContainer slot={slot} format='auto' responsive={true} className={`my-8 ${className || ''}`} />
}
