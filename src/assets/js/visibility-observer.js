const VISIBILITY_STATE = 'visible';

export default class VisibilityObserver {

  constructor(el) {
    el.set(VISIBILITY_STATE, false);

    this.observer = new IntersectionObserver(([entry]) => {
      el.set(VISIBILITY_STATE, entry.isIntersecting);
    }).observe(el);
  }

  disconnect() {
    this.observer && this.observer.disconnect();
  }
}