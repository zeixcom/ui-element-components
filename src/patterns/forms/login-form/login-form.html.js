import { html } from 'lit';

import InputField from '../../../components/inputs/input-field/input-field.html.js';
import InputButton from '../../../components/inputs/input-button/input-button.html.js';

import './login-form.css';
import './login-form.js';

export default ({ onLoginSubmit, onLogoutClick }) => html`
<login-form>
  <form @submit=${onLoginSubmit}>
    ${InputField({
      type: 'text',
      id: 'username',
      name: 'username',
      label: 'Username',
      autocomplete: 'username',
      required: true,
      className: 'username'
    })}
    ${InputField({
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password',
      autocomplete: 'current-password',
      required: true,
      className: 'password'
    })}
    ${InputButton({ type: 'submit', label: 'Login', variant: 'primary', disabled: true, className: 'login' })}
  </form>
  ${InputButton({ label: 'Logout', className: 'logout', onClick: onLogoutClick })}
</login-form>`;