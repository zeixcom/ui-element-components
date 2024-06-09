import { html, nothing } from 'lit';

import DynamicBackground from '../../../components/atoms/dynamic-background/dynamic-background.html.js';
import ColorGraph from '../../../components/colors/color-graph/color-graph.html.js';
import ColorSlider from '../../../components/colors/color-slider/color-slider.html.js';
import ColorScale from '../../../components/colors/color-scale/color-scale.html.js';
import ColorDetails from '../../../components/colors/color-details/color-details.html.js';
import InputField from '../../../components/inputs/input-field/input-field.html.js';
import CodeBlock from '../code-block/code-block.html.js';

import './color-editor.css';
import './color-editor.js';

export default ({ color, name, className }) => html`
<color-editor color=${color || nothing} class=${className || nothing}>
  <div class="panel">
    <div class="editor">
      ${InputField({ label: 'Name', id: 'name', value: name, required: true, className: 'name' })}
      <div class="graph">
        ${DynamicBackground({ color, content: html`
          ${ColorGraph({ color })}
          ${ColorSlider({ label: 'Hue', color, axis: 'h', min: 0, max: 360 })}`
        })}
      </div>
      <div class="scale">
        ${ColorScale({ color, name, size: 'medium' })}
        <div class="inputs">
          ${InputField({
            label: 'Lightness',
            type: 'number',
            length: 'short',
            id: 'l',
            value: 45.96,
            min: 0,
            max: 100,
            step: 0.25,
            suffix: '%',
            required: true,
            className: 'lightness'
          })}
          ${InputField({
            label: 'Chroma',
            type: 'number',
            length: 'short',
            id: 'c',
            value: 0.2393,
            min: 0,
            max: 0.4,
            step: 0.001,
            required: true,
            className: 'chroma'
          })}
          ${InputField({
            label: 'Hue',
            type: 'number',
            length: 'short',
            id: 'h',
            value: 265.04,
            min: 0,
            max: 360,
            step: 1,
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
      <li class="base">${ColorDetails({ color, name: `${name} 50`, open: true })}</li>
      <li class="darken20">${ColorDetails({ name: `${name} 60` })}</li>
      <li class="darken40">${ColorDetails({ name: `${name} 70` })}</li>
      <li class="darken60">${ColorDetails({ name: `${name} 80` })}</li>
      <li class="darken80">${ColorDetails({ name: `${name} 90` })}</li>
    </ol>
  </div>
  ${CodeBlock({ language: 'css', code: `--color-${name.toLowerCase()}-50: ${color};` })}
</color-editor>`;