import UIElement, { effect } from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss } from 'culori/fn';
import { getStepColor } from '../../../assets/js/utils';

class DynamicBackground extends UIElement {
  static observedAttributes = ['color'];
  attributeMap = { color: ['base', v => converter('oklch')(v)] };

  constructor() {
    super();

    // we only need to hydrate if there is no server-generated shadow root or the browser doesn't attach it
    if (!this.shadowRoot) {
      
      // polyfill shadow root if browser doesn't support declarative shadow root yet
      // or we are in a client-rendered environment like Storybook
      let template = this.querySelector('template[shadowrootmode]');
      if (template) {
        this.attachShadow({ mode: template.getAttribute('shadowrootmode') }).appendChild(template.content);
        template.remove();
      } else {
        const component = this.tagName.toLocaleLowerCase();
        template = this.getRootNode().getElementById(`${component}-template`);
        if (template) {
          this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
        } else {
          console.error(`Could not attach shadow root for <${component}>`);
        }
      }
    }
  }

  connectedCallback() {
    const pointerBubble = this.shadowRoot.querySelector('gradient-bubble[move="pointer"]');
    if (pointerBubble) {
      let posX = 0;
      let posY = 0;
      let pointerX = 0;
      let pointerY = 0;
      
      const move = () => {
        posX += (pointerX - posX) / 20;
        posY += (pointerY - posY) / 20;
        pointerBubble.style.transform = `translate(${Math.round(posX)}px, ${Math.round(posY)}px)`;
        requestAnimationFrame(move);
      };
      move();
      
      const onPointerMove = e => {
        const rect = this.getBoundingClientRect();
        pointerX = e.clientX - rect.left;
        pointerY = e.clientY - rect.top;
      }

      this.addEventListener('pointermove', onPointerMove);
    }

    // update if base color changes
    effect(() => {
      const base = this.get('base');

      const [one, two, three, four, five] = this.shadowRoot.querySelectorAll('gradient-bubble');
      five.style.setProperty('--color-bubble', formatCss(base));
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        one.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.1)));
        two.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.2)));
        three.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.3)));
        four.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.4)));
      } else {
        one.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.9)));
        two.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.8)));
        three.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.7)));
        four.style.setProperty('--color-bubble', formatCss(getStepColor(base, 0.6)));
      }
    });
  }
}

DynamicBackground.define('dynamic-background');