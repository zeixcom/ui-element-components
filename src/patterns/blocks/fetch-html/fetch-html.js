import UIElement from '../../../assets/js/ui-element.js';
import { define } from '../../../assets/js/utils.js';

define('fetch-html', class extends UIElement {
  static observedAttributes = ['src'];

  connectedCallback() {

    this.effect(() => {
      fetch(this.get('src'))
        .then(response => response.text())
        .then(html => {
          const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' });
          shadow.innerHTML = html;
          shadow.querySelectorAll('script').forEach(script => {
            const newScript = document.createElement('script');
            const scriptText = document.createTextNode(script.textContent);
            newScript.appendChild(scriptText);
            shadow.appendChild(newScript);
            script.remove();
          });
        })
        .catch(error => console.error(error));
    });
  }
});