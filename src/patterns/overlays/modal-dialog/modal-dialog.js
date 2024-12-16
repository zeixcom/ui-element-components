import { Capsula } from '@efflore/capsula'

class ModalDialog extends Capsula {
  scrollLockClass = 'scroll-lock'
  scrollTop = 0

  connectedCallback() {
    this.dialog = this.querySelector('dialog')

	this.first('.open').on('click', () => this.open())
	this.first('.close').on('click', () => this.close())
	this.first('form').on('submit', e => e.preventDefault())
    this.dialog.addEventListener('click', e => (e.target === this.dialog) && this.close())
  }

  disconnectedCallback() {
    this.close()
  }

  open() {
    this.dialog.showModal()
    this.scrollTop = document.documentElement.scrollTop
    document.body.classList.add(this.scrollLockClass)
    document.body.style.top = `-${this.scrollTop}px`
  }

  close() {
    document.body.classList.remove(this.scrollLockClass)
    window.scrollTo({ top: this.scrollTop, left: 0, behavior: 'instant' })
    document.body.style.top = null
    this.dialog.close()
  }
}
ModalDialog.define('modal-dialog')