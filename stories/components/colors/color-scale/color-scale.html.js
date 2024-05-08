import { html } from 'lit';

import './color-scale.js';

export default ({ color = '#325df1', size = 'medium' }) => html`
<color-scale color=${color} class=${size}>
  <template shadowrootmode="open">
    <style>
      :host {
        --scale-max-size: 18rem;
        --scale-padding: 0.5em;
        --scale-text-color: white;

        display: inline-flex;
        margin: 0 auto;
      }

      :host-context(.small) ol {
        height: 6rem;
      }

      :host-context(.medium) ol {
        height: 12rem;
      }

      :host-context(.large) ol {
        height: 18rem;
      }

      ol {
        display: grid;
        list-style: none;
        margin: 0 auto;
        border-radius: 6% / 4%;
        padding: 0;
        grid-template-areas:
          'lighten80 lighten60 lighten40 lighten20'
          'base base base base'
          'darken20 darken40 darken60 darken80';
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 4fr 1fr;
        aspect-ratio: 2 / 3;
        min-height: min(100%, 150cqw, 100cqh, var(--scale-max-size));
        max-width: calc(2 * var(--scale-max-size) / 3);
        overflow: hidden;
        object-fit: contain;
        align-self: center;
        container-type: inline-size;
      }

      .lighten80 { grid-area: lighten80; background: var(--color-lighten80); }
      .lighten60 { grid-area: lighten60; background: var(--color-lighten60); }
      .lighten40 { grid-area: lighten40; background: var(--color-lighten40); }
      .lighten20 { grid-area: lighten20; background: var(--color-lighten20); }
      .base { grid-area: base; background: var(--color-base); }
      .darken20 { grid-area: darken20; background: var(--color-darken20); }
      .darken40 { grid-area: darken40; background: var(--color-darken40); }
      .darken60 { grid-area: darken60; background: var(--color-darken60); }
      .darken80 { grid-area: darken80; background: var(--color-darken80); }

      .base {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding: var(--scale-padding);
        color: var(--scale-text-color);
        font-size: 15cqi;
        font-weight: 700;
      }

      @container (width < 5rem) or (height < 7.5rem) {
        .label {
          display: none;
        }
      }
    </style>

    <ol>
      <li class="lighten80"></li>
      <li class="lighten60"></li>
      <li class="lighten40"></li>
      <li class="lighten20"></li>
      <li class="base">
        <span class="label">
          <slot></slot>
        </span>
      </li>
      <li class="darken20"></li>
      <li class="darken40"></li>
      <li class="darken60"></li>
      <li class="darken80"></li>
    </ol>
  </template>
  Blue
</color-scale>`;