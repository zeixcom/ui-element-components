import UIElement from '@efflore/ui-element';

define('colorscale-editor', class extends UIElement {
  static observedAttributes = ['color', 'name'];

  /* constructor() {
    super();

    // we only need to hydrate if there is no server-generated shadow root or the browser doesn't attach it
    if (!this.shadowRoot) {

      // polyfill shadow root if browser doesn't support declarative shadow root yet
      let template = this.querySelector('template[shadowrootmode]');
      if (template) {
        this.attachShadow({ mode: template.getAttribute('shadowrootmode') }).appendChild(template.content);
        template.remove();
      
      // clone own template to hydrate
      } else {
        template = this.getRootNode().getElementById('colorscale-editor-template');
        if (!template) {
          console.error('Could not attach shadow root for <colorscale-editor>');
        } else {
          this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
        }
      }
    }
  } */

  connectedCallback() {
    
  }
});