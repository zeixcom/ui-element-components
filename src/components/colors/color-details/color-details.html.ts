import { html, nothing } from 'lit'

import './color-details.css'
import './color-details.ts'

export type ColorDetailsParams = {
	name: string,
	color?: string,
	open?: boolean,
	className?: string,
	onClick?: (e: PointerEvent) => void
}

export default ({ color, name, open, className, onClick }: ColorDetailsParams) => html`
<color-details ?color=${color} ?class=${className}>
	<details ?open=${open}>
		<summary @click=${onClick}>
			<div class="summary">
				<span class="swatch"></span>
				<span class="label">
					<strong>${name}</strong>
					<small class="value">${color}</small>
			</div>
		</summary>
		<div class="details">
			<dl>
				<dt>Lightness:</dt>
				<dd class="lightness"></dd>
				<dt>Chroma:</dt>
				<dd class="chroma"></dd>
				<dt>Hue:</dt>
				<dd class="hue"></dd>
			</dl>
			<dl>
				<dt>OKLCH:</dt>
				<dd class="oklch"></dd>
				<dt>RGB:</dt>
				<dd class="rgb"></dd>
				<dt>HSL:</dt>
				<dd class="hsl"></dd>
			</dl>
		</div>
	</details>
</color-details>`