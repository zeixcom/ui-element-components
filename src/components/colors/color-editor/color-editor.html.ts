import { html, nothing } from 'lit';

import DynamicBackground from '../../atoms/dynamic-background/dynamic-background.html.js';
import ColorGraph from '../color-graph/color-graph.html';
import ColorSlider from '../color-slider/color-slider.html';
import ColorScale from '../color-scale/color-scale.html';
import ColorDetails from '../color-details/color-details.html';
import InputField from '../../inputs/input-field/input-field.html';
import CodeBlock from '../../blocks/code-block/code-block.html';

import './color-editor.css';
import './color-editor.ts';

type ColorEditorParams = {
	color?: string,
	name?: string,
	className?: string
}

export default ({ color, name, className }: ColorEditorParams) => html`
<color-editor color=${color || nothing} class=${className || nothing}>
	<div class="panel">
		<div class="editor">
			${InputField({
				label: 'Name',
				id: 'name',
				value: name,
				required: true,
				className: 'name'
			})}
			<div class="graph">
				${ /* DynamicBackground({ color, content: html`
					${ColorGraph({ color })}
					${ColorSlider({
						label: 'Hue',
						color,
						axis: 'h',
						min: 0,
						max: 360
					})}`
				}) */ ''}
			</div>
			<div class="scale">
				${ColorScale({ color, name, size: 'medium' })}
				<div class="inputs">
					${InputField({
						label: 'Lightness',
						type: 'number',
						width: 'short',
						id: 'l',
						value: 45.96,
						min: 0,
						max: 100,
						step: 0.25,
						spinButton: true,
						suffix: '%',
						required: true,
						className: 'lightness'
					})}
					${InputField({
						label: 'Chroma',
						type: 'number',
						width: 'short',
						id: 'c',
						value: 0.2393,
						min: 0,
						max: 0.4,
						step: 0.001,
						spinButton: true,
						required: true,
						className: 'chroma'
					})}
					${InputField({
						label: 'Hue',
						type: 'number',
						width: 'short',
						id: 'h',
						value: 265.04,
						min: 0,
						max: 360,
						step: 1,
						spinButton: true,
						suffix: '°',
						required: true,
						className: 'hue'
					})}
				</div>
			</div>
		</div>
		<ol class="list">
			<li class="lighten80">${ColorDetails({ name: `${name} 10` })}</li>
			<li class="lighten60">${ColorDetails({ name: `${name} 20` })}</li>
			<li class="lighten40">${ColorDetails({ name: `${name} 30` })}</li>
			<li class="lighten20">${ColorDetails({ name: `${name} 40` })}</li>
			<li class="base">${ColorDetails({
				color,
				name: `${name} 50`,
				open: true
			})}</li>
			<li class="darken20">${ColorDetails({ name: `${name} 60` })}</li>
			<li class="darken40">${ColorDetails({ name: `${name} 70` })}</li>
			<li class="darken60">${ColorDetails({ name: `${name} 80` })}</li>
			<li class="darken80">${ColorDetails({ name: `${name} 90` })}</li>
		</ol>
	</div>
	${CodeBlock({
		language: 'css',
		code: `--color-${name?.toLowerCase()}-50: ${color};`
	})}
</color-editor>`;