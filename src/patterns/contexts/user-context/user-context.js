import UIElement from '../../../assets/js/ui-element';
import { ContextProvider } from '../../../assets/js/context-controller';

class UserContext extends UIElement {
  static providedContexts = ['logged-in', 'display-name'];

  connectedCallback() {
    this.contextProvider = new ContextProvider(this);
    this.set('logged-in', this.hasAttribute('logged-in'));
    this.set('display-name', this.getAttribute('display-name'));

    this.addEventListener('user-login', e => {
      this.set('logged-in', true);
      this.set('display-name', e.detail);
    });

    this.addEventListener('user-logout', () => {
      this.set('logged-in', false);
      // we don't delete the context, so registered listeners get updated if the user logs in again
      this.set('display-name', undefined);
    });
  }

  disconnectedCallback() {
    this.contextProvider.disconnect();
  }
}

UserContext.define('user-context');