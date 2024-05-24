import { html } from 'lit';

import ColorScale from '../../../components/colors/color-scale/color-scale.html'

import './colorscale-editor.css';
import './colorscale-editor.js';

export default ({ color, name, size, onClick }) => html`
<colorscale-editor color=${color} name=${name}>
  <template shadowrootmode="open">
    <style>
      :host {
        display: block;
      }
    </style>
    <slot></slot>
  </template>
  <button type="button" @click=${onClick}>
    ${size === 'tiny'
      ? html`<span class="scale">${ColorScale({ color, name, size })}</span>
        <span class="label">
          <strong>${name}</strong>
          <small>${color}</small>
        </span>`
      : ColorScale({ color, name, size })}
  </button>
</colorscale-editor>`;