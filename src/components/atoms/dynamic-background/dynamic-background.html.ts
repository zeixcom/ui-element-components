import { html } from 'lit';

import './dynamic-background.ts';

export default ({ content, color }) => html`
<dynamic-background color=${color}>
  ${content}
  <template shadowrootmode="open">
    <style>
      :host {
        display: block;
        position: relative;
      }

      .background {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
        top: 0;
        left: 0;
        filter: blur(2rem);
      }

      .one {
        --color-bubble: oklch(88.88% 0.0449 265);
        opacity: 0.9;
      }

      .two {
        --color-bubble: oklch(78.03% 0.104 265);
        animation-duration: 20s;
        animation-direction: reverse;
        transform-origin: 40% 30%;
        opacity: 0.8;
      }

      .three {
        --color-bubble: oklch(67.44% 0.1639 265);
        animation-duration: 40s;
        transform-origin: 60% 70%;
        opacity: 0.7;
      }

      .four {
        --color-bubble: oklch(57.1% 0.2085 265);
        animation-duration: 40s;
        transform-origin: 40%;
        opacity: 0.6;
      }

      .five {
        --color-bubble: oklch(47% 0.225 265);
        opacity: 0.3;
      }

      @media (prefilled-color-scheme: dark) {

        .one {
          --color-bubble: oklch(8.95% 0.0449 265);
        }

        .two {
          --color-bubble: oklch(18.13% 0.104 265);
        }

        .three {
          --color-bubble: oklch(27.52% 0.1639 265);
        }

        .four {
          --color-bubble: oklch(37.14% 0.2085 265);
        }

      }

      @keyframes move-circular {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes move-vertical {
        0% { transform: translateX(10%) translateY(-50%); }
        50% { transform: translateX(-10%) translateY(50%); }
        100% { transform: translateX(10%) translateY(-50%); }
      }

      @keyframes move-horizontal {
        0% { transform: translateX(-50%) translateY(-10%); }
        50% { transform: translateX(50%) translateY(10%); }
        100% { transform: translateX(-50%) translateY(-10%); }
      }

      gradient-bubble {
        display: block;
        position: absolute;
        background: radial-gradient(circle at center, var(--color-bubble) 0, transparent 50%) no-repeat;
        mix-blend-mode: overlay;
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
        animation: move-vertical 30s infinite;
        transform-origin: center center;

        &[move="vertical"] {
          animation-timing-function: ease-in-out;
        }

        &[move="horizontal"] {
          animation-name: move-horizontal;
          animation-timing-function: ease-in-out;
        }

        &[move="circular"] {
          animation-name: move-circular;
        }

        &[move="pointer"] {
          animation: none;
          top: -50%;
          left: -50%;
          width: 100%;
          height: 100%;
        }
      }
    </style>
    <div class="background">
      <gradient-bubble class="one" move="vertical"></gradient-bubble>
      <gradient-bubble class="two" move="circular"></gradient-bubble>
      <gradient-bubble class="three" move="circular"></gradient-bubble>
      <gradient-bubble class="four" move="horizontal"></gradient-bubble>
      <gradient-bubble class="five" move="pointer"></gradient-bubble>
    </div>
    <slot></slot>
  </template>
</dynamic-background>`;