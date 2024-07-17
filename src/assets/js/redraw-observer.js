import { effect } from '@efflore/ui-element';

const VISIBILITY_STATE = 'visible';
const REDRAW_STATE = 'redraw';

export default class RedrawObserver {

  constructor(el, resizeCallback, redrawTimeout = 250) {
    let resizing;
    el.set(REDRAW_STATE, false);

    this.observer = new ResizeObserver(([entry]) => {
      if (entry.contentBoxSize) {
        resizing && clearTimeout(resizing);
        resizing = setTimeout(() => {
          resizing = null;
          el.set(REDRAW_STATE, true);
        }, redrawTimeout);
        resizeCallback(entry.contentBoxSize[0]);
      }
    });

    effect(() => {
      if (el.get(VISIBILITY_STATE)) {
        this.observer.observe(el);
        el.set(REDRAW_STATE, true);
      } else {
        this.observer.unobserve(el);
        el.set(REDRAW_STATE, false);
      }
    });
  }

  disconnect() {
    this.observer && this.observer.disconnect();
  }
}