import UIElement, { effect } from '@efflore/ui-element';

class FetchHTML extends UIElement {
  static observedAttributes = ['src'];

  connectedCallback() {

    effect(async () => {
      await fetch(this.get('src'))
        .then(async response => {
          const html = await response.text();
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
}

FetchHTML.define('fetch-html');