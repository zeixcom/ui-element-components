import { html } from 'lit';

import ColorGraph from '../../../components/colors/color-graph/color-graph.html.js';
import ColorScale from '../../../components/colors/color-scale/color-scale.html.js';
import ColorDetails from '../../../components/colors/color-details/color-details.html.js';
import InputText from '../../../components/forms/input-text/input-text.html.js';
import InputNumber from '../../../components/forms/input-number/input-number.html.js';

import './color-editor.css';
import './color-editor.js';

export default ({ color = '#143dda', name }) => html`
<color-editor color=${color}>
  <div class="graph">
    ${ColorGraph({ color })}
    <div class="scale">
      ${ColorScale({ color, name, size: 'medium' })}
      <div class="inputs">
        ${InputNumber({
          label: 'Lightness',
          id: 'l',
          value: '45.96',
          min: '0',
          max: '100',
          step: '0.25',
          suffix: '%',
          required: true,
          className: 'lightness'
        })}
        ${InputNumber({
          label: 'Chroma',
          id: 'c',
          value: '0.2393',
          min: '0',
          max: '0.4',
          step: '0.01',
          required: true,
          className: 'chroma'
        })}
        ${InputNumber({
          label: 'Hue',
          id: 'h',
          value: '265.04',
          min: '0',
          max: '360',
          step: '1',
          suffix: '°',
          required: true,
          className: 'hue'
        })}
      </div>
    </div>
    ${InputText({ label: 'Name', id: 'name', value: name, required: true, className: 'name' })}
  </div>
  <ol class="list">
    <li class="lighten80">${ColorDetails({ name: `${name} 10` })}</li>
    <li class="lighten60">${ColorDetails({ name: `${name} 20` })}</li>
    <li class="lighten40">${ColorDetails({ name: `${name} 30` })}</li>
    <li class="lighten20">${ColorDetails({ name: `${name} 40` })}</li>
    <li class="base">${ColorDetails({ color, name: `${name} 50` })}</li>
    <li class="darken20">${ColorDetails({ name: `${name} 60` })}</li>
    <li class="darken40">${ColorDetails({ name: `${name} 70` })}</li>
    <li class="darken60">${ColorDetails({ name: `${name} 80` })}</li>
    <li class="darken80">${ColorDetails({ name: `${name} 90` })}</li>
  </ol>
</color-editor>`;