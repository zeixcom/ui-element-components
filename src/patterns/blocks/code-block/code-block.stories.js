import { fn } from '@storybook/test'

import CodeBlock from './code-block.html'

export default {
	title: 'blocks/code-block',
	render: CodeBlock,
	argTypes: {
		language: {
			control: { type: 'select' },
			options: ['html', 'css', 'js'],
			defaultValue: { summary: 'html' },
		},
		collapsed: {
			control: 'boolean',
			defaultValue: { summary: false },
		},
		copyLabel: {
			defaultValue: { summary: 'Copy' },
		},
		copySuccess: {
			defaultValue: { summary: 'Copied!' },
		},
		copyError: {
			defaultValue: { summary: 'Error trying to copy to clipboard!' },
		},
		expandLabel: {
			defaultValue: { summary: 'Expand' },
		},
	},
	args: {
		language: 'js',
		code: `import { Capsula, asBoolean, effect, enqueue, toggleAttribute } from '@efflore/capsula'
import Prism from 'prismjs'

class CodeBlock extends Capsula {
	static observedAttributes = ['collapsed']
	static states = {
		collapsed: asBoolean
	}

  	connectedCallback() {

		// Enhance code block with Prism.js
		const language = this.getAttribute('language') || 'html'
		const content = this.querySelector('code')
		this.set('code', content.textContent.trim(), false)
		effect(() => {
			// Apply syntax highlighting while preserving Lit's marker nodes in Storybook
			const code = document.createElement('code')
			code.innerHTML = Prism.highlight(
				this.get('code'),
				Prism.languages[language],
				language
			)
			enqueue(() => {
				Array.from(content.childNodes)
					.filter(node => node.nodeType !== Node.COMMENT_NODE)
					.forEach(node => node.remove())
				Array.from(code.childNodes)
					.forEach(node => content.appendChild(node))
			}, [content, 'h'])
		})

		// Copy to clipboard
		const button = this.querySelector('.copy')
		button.onclick = async () => {
			const label = button.textContent
			let status = 'success'
			try {
				await navigator.clipboard.writeText(content.textContent)
			} catch (err) {
				console.error('Error when trying to use navigator.clipboard.writeText()', err)
				status = 'error'
			}
			button.set('disabled', true)
			button.set('label', this.getAttribute(\`copy-\${status}\`))
			setTimeout(() => {
				button.set('disabled', false)
				button.set('label', label)
			}, status === 'success' ? 1000 : 3000)
		}

		// Expand
		this.first('.overlay').on('click', () => this.set('collapsed', false))
		this.self.sync(toggleAttribute('collapsed'))
	}
}
CodeBlock.define('code-block')`,
		file: 'code-block.js',
		collapsed: false,
		copyLabel: 'Copy',
		copySuccess: 'Copied!',
		copyError: 'Error trying to copy to clipboard!',
		expandLabel: 'Expand',
		onCopyClick: fn(),
		onExpandClick: fn(),
	},
}

export const Expanded = {
	args: {},
}

export const Collapsed = {
	args: {
		language: 'css',
		file: 'code-block.css',
		code: `code-block {
	position: relative;
	display: block;
	margin: calc(-1 * var(--space-l)) 0 var(--space-l);

	.meta {
		display: flex;
		margin-bottom: var(--space-xs);
		font-size: var(--font-size-s);
		color: var(--color-text-soft);
	}

	.language {
		margin-left: auto;
		text-transform: uppercase;
	}

	& pre {
		color: var(--color-gray-10);
		background: var(--color-gray-90);
		padding: var(--space-s);
		margin: var(--space-xs) 0;
		overflow: auto;
		border-radius: var(--space-xs);
	}

	.copy {
		position: absolute;
		right: var(--space-s);
		bottom: var(--space-s);
	}

	.overlay {
		display: none;
	}

	&[collapsed] {
		max-height: 12rem;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: var(--space-m);
			background: linear-gradient(-135deg, var(--color-secondary) 0.5rem, transparent 0) 0 0.5rem, linear-gradient(135deg, var(--color-secondary) 0.5rem, var(--color-background) 0) 0 0.5rem;
			background-color: var(--color-secondary);
			background-size: var(--space-m) var(--space-m);
			background-position: bottom;
		}

		.copy {
			display: none;
		}

		.overlay {
			display: flex;
			flex-direction: column-reverse;
			align-items: center;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 6rem;
			color: var(--color-text);
			background: linear-gradient(transparent, var(--color-secondary));
			border: 0;
			cursor: pointer;
			padding: var(--space-xs) var(--space-s);
			margin-bottom: var(--space-m);
			font-size: var(--font-size-s);
			transition: background var(--transition-short) var(--easing-inout);
			text-shadow: var(--color-background) 1px 0 var(--space-xs);

			&:hover,
			&:active {
				text-shadow: var(--color-text-inverted) var(--space-xs) 0 var(--space-s);
			}
		}
	}
}`,
		collapsed: true,
	},
}
