/* import { Capsula, setText, effect } from '@efflore/capsula'
import 'culori/css'
import { converter, formatHex } from 'culori/fn'

class ColorPicker extends Capsula {
	static observedAttributes = ['color', 'name']
	static attributeMap = {
		color: converter('oklch')
	}

  / * constructor() {
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
  } * /

	connectedCallback() {

		// Derived states
		this.set('hex', () => formatHex(this.get('color')))

		// Event listeners
		this.self
			.on('color-change', e => { this.set('color', e.detail) })
			.on('value-change', e => { this.set('name', e.detail) })

		// Effects
		this.first('modal-dialog > button > .label small').sync(setText('hex'))
		this.first('modal-dialog > button > .label strong').sync(setText('name'))
		const scale = this.querySelector('color-scale')
		const editor = this.querySelector('color-editor')
		effect(() => {
			const base = this.get('color')
			scale.set('color', base)
			editor.set('color', base)
		})
		effect(() => {
			const label = this.get('name')
			scale.set('name', label)
			editor.set('name', label)
		})
	}
}
ColorPicker.define('color-picker')
*/