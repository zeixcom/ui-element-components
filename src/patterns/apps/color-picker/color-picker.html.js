import { html /*, render */ } from 'lit';

import ModalDialog from '../../overlays/modal-dialog/modal-dialog.html.js';
import ColorScale from '../../../components/colors/color-scale/color-scale.html.js';
import ColorEditor from '../../blocks/color-editor/color-editor.html.js';

import './color-picker.css';
import './color-picker.js';

export default ({ color, name, size, title = 'Edit Color Scale' }) => {
  // const render = (strings, ...values) => String.raw({ raw: strings }, ...values);
  const result = html`
    <color-picker color=${color} name=${name}>
      ${ModalDialog({
        openLabel: size === 'tiny'
          ? html`<span class="scale">${ColorScale({ color, name, size })}</span>
            <span class="label">
              <strong>${name}</strong>
              <small>${color}</small>
            </span>`
          : ColorScale({ color, name, size }),
        title,
        content: ColorEditor({ color, name }),
      })}
    </color-picker>`;
  /* const container = document.createElement('div');
  render(result, container);
  console.log(container.innerHTML.trim().replace(/<\!--(.|\n)*?-->/g, '').replace(/>(\s+|\n)</g, '> <')); */
  return result;
};