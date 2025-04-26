export class ModalDialog extends HTMLElement {
	scrollLockClass = 'scroll-lock'
	scrollTop = 0
	dialog: HTMLDialogElement | null

	connectedCallback() {
		this.dialog = this.querySelector('dialog')
		if (!this.dialog) throw new Error('No dialog element found')

		this.querySelector('.open')?.addEventListener('click', () => this.open())
		this.querySelectorAll('.close').forEach(
			target => target.addEventListener('click', () => this.close())
		)
		this.querySelector('form')?.addEventListener('submit', e => e.preventDefault())
		this.dialog?.addEventListener('click', e => (e.target === this.dialog) && this.close())
	}

	disconnectedCallback() {
		this.close()
	}

	open() {
		this.dialog?.showModal()
		this.scrollTop = document.documentElement.scrollTop
		document.body.classList.add(this.scrollLockClass)
		document.body.style.top = `-${this.scrollTop}px`
	}

	close() {
		document.body.classList.remove(this.scrollLockClass)
		window.scrollTo({ top: this.scrollTop, left: 0, behavior: 'instant' })
		document.body.style.removeProperty('top')
		this.dialog?.close()
	}
}
customElements.define('modal-dialog', ModalDialog)

declare global {
	interface HTMLElementTagNameMap {
		'modal-dialog': ModalDialog
	}
}