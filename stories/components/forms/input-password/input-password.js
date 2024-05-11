import UIElement from '@efflore/ui-element';

define('input-password', class extends UIElement {
  static observedAttributes = ['description'];

  connectedCallback() {
    this.set('value', '');
    const input = this.querySelector('input');
    const [error, description] = ['error', 'description'].map(className => this.querySelector(`.${className}`));
    !this.has('error') && this.set('error', error.textContent);
    description.textContent && !this.has('description') && this.set('description', description.textContent);

    // replace textContent while preserving Lit's marker nodes in Storybook
    const replaceText = (parentNode, text) => {
      Array.from(parentNode.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      parentNode.append(document.createTextNode(text));
    };

    // event listener for 'input' event on the input field
    this.oninput = e => this.set('value', e.target.value);

    // update error message and aria-invalid attribute
    this.effect(() => {
      const errorMsg = this.get('error');
      const errorId = error.getAttribute('id');
      const invalidAttr = 'aria-invalid';
      const erorAttr = 'aria-errormessage';
      replaceText(error, errorMsg);
      if (errorMsg) {
        input.setAttribute(invalidAttr, 'true');
        input.setAttribute(erorAttr, errorId);
      } else {
        input.setAttribute(invalidAttr, 'false');
        input.removeAttribute(erorAttr);
      }
    });

    // update description message and aria-describedby attribute
    this.effect(() => {
      if (this.has('description')) {
        const descMsg = this.get('description');
        const descId = description.getAttribute('id');
        const descAttr = 'aria-describedby';
        replaceText(description, descMsg);
        descMsg ? input.setAttribute(descAttr, descId) : input.removeAttribute(descAttr);
      }
    });
  }

  /**
   * Clear the input field
   */
  clear() {
    this.set('value', '');
    this.querySelector('input').value = '';
  }

});