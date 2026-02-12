import { AdContainer } from '../ad-container'

export function DisplayAd({ slot, className }: { slot?: string; className?: string }) {
	return <AdContainer slot={slot} format='auto' responsive={true} className={className} />
}
