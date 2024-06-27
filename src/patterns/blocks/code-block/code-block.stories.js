import { fn } from '@storybook/test';
import CodeBlock from './code-block.html';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'blocks/code-block',
  render: (args) => CodeBlock(args),
  argTypes: {
    language: {
      control: { type: 'select' },
      options: ['html', 'css', 'js'],
      defaultValue: { summary: 'html' },
    },
    collapsed: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    copyLabel: {
      defaultValue: { summary: 'Copy' },
    },
    copySuccess: {
      defaultValue: { summary: 'Copied!' },
    },
    copyError: {
      defaultValue: { summary: 'Error trying to copy to clipboard!' },
    },
    expandLabel: {
      defaultValue: { summary: 'Expand' },
    },
  },
  args: {
    language: 'js',
    code: `import UIElement from '../../../assets/js/ui-element';
import Prism from 'prismjs';

class CodeBlock extends UIElement {
  static observedAttributes = ['collapsed'];
  attributeMap = new Map([['collapsed', 'boolean']]);

  connectedCallback() {
    const language = this.getAttribute('language') || 'html';
    const copyButton = this.querySelector('.copy');
    const overlay = this.querySelector('.overlay');
    const content = this.querySelector('code');
    this.set('code', content.textContent.trim(), false);
    this.set('collapsed', false, false);

    // copy to clipboard
    copyButton.onclick = async () => {
      const label = copyButton.textContent;
      let success = true;
      try {
        await navigator.clipboard.writeText(content.textContent);
      } catch (err) {
        console.error('Error when trying to use navigator.clipboard.writeText()', err);
        success = false;
      }

      if (success) {
        copyButton.set('disabled', true);
        copyButton.set('variant', 'success');
        copyButton.set('label', this.getAttribute('copy-success'));
      } else {
        copyButton.set('disabled', true);
        copyButton.set('variant', 'error');
        copyButton.set('label', this.getAttribute('copy-error'));
      }

      setTimeout(() => {
        copyButton.set('disabled', false);
        copyButton.set('variant', 'secondary');
        copyButton.set('label', label);
      }, success ? 1000 : 3000);
    };

    // expand
    overlay.onclick = () => this.set('collapsed', false);

    // update code
    this.effect(() => {
      // apply syntax highlighting while preserving Lit's marker nodes in Storybook
      const code = document.createElement('code');
      code.innerHTML = Prism.highlight(this.get('code'), Prism.languages[language], language);
      Array.from(content.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      Array.from(code.childNodes).forEach(node => content.appendChild(node));
    });

    // update collapsed attribute
    this.effect(() => {
      this.get('collapsed')? this.setAttribute('collapsed', '') : this.removeAttribute('collapsed');
    });
    
  }

}

CodeBlock.define('code-block');`,
    file: 'code-block.js',
    collapsed: false,
    copyLabel: 'Copy',
    copySuccess: 'Copied!',
    copyError: 'Error trying to copy to clipboard!',
    expandLabel: 'Expand',
    onCopyClick: fn(),
    onExpandClick: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Expanded = {
  args: {},
};

export const Collapsed = {
  args: {
    language: 'css',
    file: 'code-block.css',
    code: `code-block {
  position: relative;
  display: block;
  margin: calc(-1 * var(--space-l)) 0 var(--space-l);

  .meta {
    display: flex;
    margin-bottom: var(--space-xs);
    font-size: var(--font-size-s);
    color: var(--color-text-soft);
  }

  .language {
    margin-left: auto;
    text-transform: uppercase;
  }

  & pre {
    color: var(--color-gray-10);
    background: var(--color-gray-90);
    padding: var(--space-s);
    margin: var(--space-xs) 0;
    overflow: auto;
    border-radius: var(--space-xs);
  }

  .copy {
    position: absolute;
    right: var(--space-s);
    bottom: var(--space-s);
  }

  .overlay {
    display: none;
  }

  &[collapsed] {
    max-height: 12rem;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: var(--space-m);
      background: linear-gradient(-135deg, var(--color-secondary) 0.5rem, transparent 0) 0 0.5rem, linear-gradient(135deg, var(--color-secondary) 0.5rem, var(--color-background) 0) 0 0.5rem;
      background-color: var(--color-secondary);
      background-size: var(--space-m) var(--space-m);
      background-position: bottom;
    }

    .copy {
      display: none;
    }

    .overlay {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6rem;
      color: var(--color-text);
      background: linear-gradient(transparent, var(--color-secondary));
      border: 0;
      cursor: pointer;
      padding: var(--space-xs) var(--space-s);
      margin-bottom: var(--space-m);
      font-size: var(--font-size-s);
      transition: background var(--transition-short) var(--easing-inout);
      text-shadow: var(--color-background) 1px 0 var(--space-xs);

      &:hover,
      &:active {
        text-shadow: var(--color-text-inverted) var(--space-xs) 0 var(--space-s);
      }
    }
  }
}`,
    collapsed: true,
  },
};
