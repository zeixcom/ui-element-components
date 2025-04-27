import { html, nothing } from 'lit';

import './input-button.css';
import './input-button.ts';

type InputButtonParams = {
	label: string,
	type?: 'button' | 'submit' | 'reset' | 'menu',
	disabled?: boolean,
	className?: string,
	variant?: 'primary' | 'secondary' | 'constructive' | 'destructive',
	size?: 'small' | 'medium' | 'large',
	badge?: string,
	onClick?: (e: PointerEvent) => void
}

export default ({
	label,
	type = 'button',
	disabled = false,
	className,
	variant,
	size,
	badge,
	onClick
}: InputButtonParams) => html`
<input-button class=${className || nothing}>
	<button
		type=${type}
		class=${[variant || 'secondary', size || 'medium'].join(' ')}
		?disabled=${disabled}
		@click=${onClick}
	>
		<span class="label">${label}</span>
		${badge != null ? html`<span class="badge">${badge}</span>` : nothing}
	</button>
</input-button>`
