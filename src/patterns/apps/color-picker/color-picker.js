import { UIElement, effect, uiRef } from '../../../assets/js/ui-component';
import 'culori/css';
import { converter, formatHex } from 'culori/fn';

class ColorPicker extends UIElement {
  static observedAttributes = ['color', 'name'];
  attributeMap = { color: ['base', v => converter('oklch')(v)] };

  /* constructor() {
    super();

    // we only need to hydrate if there is no server-generated shadow root or the browser doesn't attach it
    if (!this.shadowRoot) {
      const component = this.tagName.toLocaleLowerCase();

      // polyfill shadow root if browser doesn't support declarative shadow root yet
      let template = this.querySelector('template[shadowrootmode]');
      if (template) {
        this.attachShadow({ mode: template.getAttribute('shadowrootmode') }).appendChild(template.content);
        template.remove();
      
      // clone own template and stylesheet to hydrate
      } else {
        template = this.getRootNode().getElementById(`${component}-template`);
        if (template) {
          this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
          const sheet = new CSSStyleSheet();
          const styles = document.getElementById(`${component}-styles`);
          if (styles) {
            sheet.replaceSync(styles.textContent);
            this.shadowRoot.adoptedStyleSheets = [sheet];
          } else {
            console.error(`Could not adopt stylesheet for <${component}>`);
          }
        } else {
          console.error(`Could not attach shadow root for <${component}>`);
        }        
      }
    }
  } */

  connectedCallback() {
    const ref = uiRef(this);
    const scale = ref.first('color-scale');
    const editor = ref.first('color-editor');
    const name = ref.first('modal-dialog > button > .label strong');
    const color = ref.first('modal-dialog > button > .label small');

    this.addEventListener('color-change', e => {
      this.set('base', e.detail);
    });

    this.addEventListener('value-change', e => {
      this.set('name', e.detail);
    });

    effect(q => {
      const base = this.get('base');

      scale().set('base', base);
      editor().set('base', base);
      color && q(color(), color.text.set(formatHex(base)));
    });

    effect(() => {
      const label = this.get('name');

      scale().set('name', label);
      editor().set('name', label);
      name && q(name(), name.text.set(label));
    });
  }
}

ColorPicker.define('color-picker');