import UIElement, { effect } from '@efflore/ui-element';
import { ContextConsumer } from '../../../assets/js/context-controller';

class LoginForm extends UIElement {
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
      await new Promise(resolve => setTimeout(resolve, 1000)); // TODO do real auth work here instead
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
    effect(() => {
      this.querySelector('.login').set('disabled', usernameField.get('empty') || passwordField.get('empty'));
    });

    effect(() => {
      const loggedIn = this.get('logged-in');
      form.classList.toggle('hidden', !loggedIn);
      logoutButton.classList.toggle('hidden', loggedIn);
    });
  }

  disconnectedCallback() {
    this.contextConsumer.disconnect();
  }

}

LoginForm.define('login-form');