import UIElement from '@efflore/ui-element';
import { define } from '../../../assets/js/utils';

define('scroll-area', class extends UIElement {

  connectedCallback() {
    this.set('visible', false);
    this.set('overflow', false);
    let scrolling;
    const threshold = 0.999;
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
        this.set('overflow', entry.intersectionRatio < threshold); // ignore rounding errors because of fraction pixels
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
        (overflowingAtStart(e.target))? this.classList.add(overflowStartClass) : this.classList.remove(overflowStartClass);
        (overflowingAtEnd(e.target))? this.classList.add(overflowEndClass) : this.classList.remove(overflowEndClass);
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
});