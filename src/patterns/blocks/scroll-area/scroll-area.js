import UIElement from '@efflore/ui-element';

class ScrollArea extends UIElement {

  connectedCallback() {
    this.set('visible', false);
    this.set('overflow', false);
    let scrolling;
    const threshold = 0.999; // ignore rounding errors because of fraction pixels
    const orientation = this.getAttribute('orientation');
    const overflowClass = 'overflow';
    const overflowStartClass = 'overflow-start';
    const overflowEndClass = 'overflow-end';
    const content = this.querySelector('.scroll-area__content');

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio <= 0) {
        this.set('visible', false);
      } else {
        this.set('visible', true);
        this.set('overflow', entry.intersectionRatio < threshold);
      }
    }, { root: this, threshold: [0, threshold] }).observe(content);

    const overflowingAtStart = container => {
      if (orientation === 'horizontal') return (container.scrollLeft !== 0);
      else return (container.scrollTop !== 0);
    };

    const overflowingAtEnd = container => {
      if (orientation === 'horizontal') return (container.scrollLeft < (container.scrollWidth - container.offsetWidth));
      else return (container.scrollTop < (container.scrollHeight - container.offsetHeight));
    };

    const onScroll = e => {
      scrolling && cancelAnimationFrame(scrolling);
      scrolling = requestAnimationFrame(() => {
        scrolling = null;
        this.classList.toggle(overflowStartClass, overflowingAtStart(e.target));
        this.classList.toggle(overflowEndClass, overflowingAtEnd(e.target));
      });
    };

    this.effect(() => {
      const overflow = this.get('overflow');
      if (this.get('visible') && overflow) {
        this.addEventListener('scroll', onScroll);
        this.classList.add(overflowClass, overflowEndClass);
      } else {
        this.removeEventListener('scroll', onScroll);
        !overflow && this.classList.remove(overflowClass, overflowEndClass, overflowStartClass);
      }
    });
  }

  disconnectedCallback() {
    this.intersectionObserver && this.intersectionObserver.disconnect();
  }
}

ScrollArea.define('scroll-area');