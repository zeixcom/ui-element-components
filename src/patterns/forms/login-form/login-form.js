import UIElement from '../../../assets/js/ui-element';
import { define } from '../../../assets/js/utils';
import { ContextConsumer } from '../../../assets/js/context-controller';

define('login-form', class extends UIElement {
  static observedContexts = ['logged-in'];

  connectedCallback() {
    this.set('logged-in', false, false);
    this.contextConsumer = new ContextConsumer(this);
    const form = this.querySelector('form');
    const usernameField = this.querySelector('.username');
    const passwordField = this.querySelector('.password');
    const logoutButton = this.querySelector('.logout');

    // event listener for 'submit' event on form
    this.onsubmit = async e => {
      e.preventDefault();
      await 1000; // TODO do real auth work here instead
      this.set('logged-in', true);
      const event = new CustomEvent('user-login', { bubbles: true, detail: usernameField.get('value') });
      this.dispatchEvent(event);
    };

    logoutButton.onclick = () => {
      usernameField.clear();
      passwordField.clear();
      this.set('logged-in', false);
      const event = new CustomEvent('user-logout', { bubbles: true });
      this.dispatchEvent(event);
    };

    // derive disabled state of submit button from whether the input fields are empty
    this.effect(() => {
      this.querySelector('.login').set('disabled', usernameField.get('empty') || passwordField.get('empty'));
    });

    this.effect(() => {
      const loggedIn = this.get('logged-in');
      if (loggedIn) {
        form.classList.add('hidden');
        logoutButton.classList.remove('hidden');
      } else {
        form.classList.remove('hidden');
        logoutButton.classList.add('hidden');
      }
    });
  }

  disconnectedCallback() {
    this.contextConsumer.disconnect();
  }

});