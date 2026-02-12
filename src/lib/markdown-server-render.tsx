import { Fragment, type ReactElement } from 'react'
import parse, { type HTMLReactParserOptions, Element, type DOMNode } from 'html-react-parser'
import { renderMarkdown, type TocItem } from '@/lib/markdown-renderer'
import { MarkdownImage } from '@/components/markdown-image'
import { CodeBlock } from '@/components/code-block'

type MarkdownRenderResult = {
	content: ReactElement | null
	toc: TocItem[]
}

export async function renderMarkdownServer(markdown: string): Promise<MarkdownRenderResult> {
	try {
		const { html, toc } = await renderMarkdown(markdown)


		// We don't need to replace the whole pre block, just ensure the data-code attribute is safe
		// The issue is likely that html-react-parser or the regex replacement is messing up certain characters
		// Let's try to just let html-react-parser handle the HTML, but we need to ensure the data-code attribute is valid
		
		// Actually, the error "Invalid attribute name: `0`" suggests that the replacement might be producing invalid HTML or the parser is choking on something specific inside the code block or attributes.
		// The previous approach of replacing the whole block with a placeholder `__CODE_BLOCK_X__` is safer for the parser because it removes the complex HTML structure from the initial parse.
		// However, returning a Fragment from `replace` for a text node might be causing issues if the parent structure expects something else?
		// Or maybe the regex replacement is failing for some edge cases.

		// Let's change strategy: Instead of replacing with a text placeholder, replace with a valid, simple HTML tag that we can easily identify and replace during parsing.
		// e.g. <x-code-block id="0"></x-code-block>

		// Extract pre elements and replace with a custom placeholder tag
		const codeBlocks: Array<{ id: string; code: string; preHtml: string }> = []
		let processedHtml = html.replace(/<pre\s+data-code="([^"]*)"([^>]*)>([\s\S]*?)<\/pre>/g, (match, codeAttr, attrs, content) => {
			const id = `cb-${codeBlocks.length}`
			// Decode HTML entities in code attribute for our storage
			const code = codeAttr
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&amp;/g, '&')
			
			// CRITICAL: Escape the content to prevent html-react-parser from treating
			// code examples (like <canvas ref={...}>) as actual React components
			// This fixes the "Refs cannot be used in Server Components" error
			const escapedContent = content
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
			
			codeBlocks.push({
				id,
				code,
				preHtml: escapedContent
			})
			// Return a custom tag that is valid HTML but easy to catch
			return `<x-code-block id="${id}"></x-code-block>`
		})

		// Fix JSX-style attributes (like style={{ border: 0 }}) that html-react-parser can't handle
		// Convert them to regular HTML attributes
		processedHtml = processedHtml.replace(/\s+style=\{\{([^}]+)\}\}/g, (match, styleContent) => {
			// Parse the object-like content and convert to CSS string
			// e.g., "border: 0" -> "border: 0"
			const cssString = styleContent.trim().replace(/(\w+):\s*([^,}]+)/g, '$1: $2').replace(/,/g, ';')
			return ` style="${cssString}"`
		})

		// Parse HTML and replace img elements and code block placeholders
		const options: HTMLReactParserOptions = {
			replace(domNode: DOMNode) {
				if (domNode instanceof Element) {
					if (domNode.name === 'img') {
						const { src, alt, title } = domNode.attribs
						return <MarkdownImage src={src} alt={alt} title={title} />
					}
					
					if (domNode.name === 'x-code-block') {
						const id = domNode.attribs.id
						const block = codeBlocks.find(b => b.id === id)
						if (block) {
							// For the inner content, we need to parse it as well because it might contain highlighted HTML span tags
							const preElement = parse(block.preHtml) as ReactElement
							return (
								<CodeBlock key={id} code={block.code}>
									{preElement}
								</CodeBlock>
							)
						}
					}
				}
			}
		}
		const content = parse(processedHtml, options) as ReactElement
		return { content, toc }
	} catch (error) {
		console.error('Markdown render error:', error)
		return { content: null, toc: [] }
	}
}
