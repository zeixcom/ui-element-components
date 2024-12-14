import { Capsula, effect, setText, setProperty, setAttribute, toggleClass } from '@efflore/capsula'

const isNumber = num => typeof num === 'number'
const parseNumber = (v, int = false) => int ? parseInt(v, 10) : parseFloat(v)

class InputField extends Capsula {
	static observedAttributes = ['value', 'description']
	static states = {
		value: value => this.isNumber
			? value.map(v => parseNumber(v, this.isInteger)).filter(Number.isFinite)
			: value
	}

	connectedCallback() {
		this.input = this.querySelector('input')
		this.isNumber = this.input && this.input.type === 'number'
		this.isInteger = this.hasAttribute('integer')

		// Set default states
		this.set('value', this.isNumber ? this.input.valueAsNumber : this.input.value, false)
		this.set('length', this.input.value.length)
		
		// Derived states
		this.set('empty', () => !this.get('length'))

		// Setup sub elements
		this.#setupErrorMessage()
		this.#setupDescription()
		this.#setupSpinButton()
		this.#setupClearButton()

		// Handle input changes
		this.input.onchange = () =>
			this.#triggerChange(this.isNumber ? this.input.valueAsNumber : this.input.value)
		this.input.oninput = () =>
			this.set('length', this.input.value.length)

		// Update value
		effect(async () => {
			const value = this.get('value')
			const validate = this.getAttribute('validate')
			if (value && validate) {

				// Validate input value against a server-side endpoint
				await fetch(`${validate}?name=${this.input.name}value=${this.input.value}`)
				.then(async response => {
					const text = await response.text()
					this.input.setCustomValidity(text)
					this.set('error', text)
				})
				.catch(err => this.set('error', err.message))
			}
			if (this.isNumber && !isNumber(value)) // ensure value is a number if it is not already a number
				return this.set('value', parseNumber(value, this.isInteger)) // effect will be called again with numeric value
			if (this.isNumber && !Number.isNaN(value)) // change value only if it is a valid number
				this.input.value = value
		})
 	}

	// Clear the input field
	clear() {
		this.input.value = ''
		this.set('value', '')
		this.set('length', 0)
		this.input.focus()
	}

	// Trigger value-change event to commit the value change
	#triggerChange = value => {
		this.set('value', value)
		this.set('error', this.input.validationMessage)
		if (typeof value === 'function')
			value = this.get('value')
		if (this.input.value !== String(value))
			this.dispatchEvent(new CustomEvent('value-change', {
				detail: value,
				bubbles: true
			}))
	}

	// Setup error message
	#setupErrorMessage() {
		const error = this.first('.error')

		// Derived states
		this.set(
			'ariaInvalid',
			() => String(Boolean(this.get('error')))
		)
		this.set(
			'aria-errormessage',
			() => this.get('error') ? error.targets[0]?.id : undefined
		)

		// Effects
		error.sync(setText('error'))
		this.first('input').sync(
			setProperty('ariaInvalid'),
			setAttribute('aria-errormessage')
		)
	}

	// Setup description
	#setupDescription() {
		const description = this.first('.description')
		if (!description.targets.length)
			return // no description, so skip
		
		// derived states
		const input = this.first('input')
		const maxLength = this.input.maxLength
		const remainingMessage = maxLength && description.targets[0].dataset.remaining
		const defaultDescription = description.targets[0].textContent
		this.set('description', remainingMessage
			? () => {
				const length = this.get('length')
				return length > 0
					? remainingMessage.replace('${x}', maxLength - length)
					: defaultDescription
			}
			: defaultDescription
		)
		this.set('aria-describedby', () => this.get('description')
			? description.targets[0].id
			: undefined
		)

		// Effects
		description.sync(setText('description'))
		input.sync(setAttribute('aria-describedby'))
	}

	// Setup spin button
	#setupSpinButton() {
		const spinButton = this.querySelector('.spinbutton')
		if (!this.isNumber || !spinButton)
			return // no spin button, so skip

		const getNumber = attr => {
			const temp = parseNumber(this.input[attr], this.isInteger)
			return Number.isFinite(temp) ? temp : 0
		}
		const tempStep = parseNumber(spinButton.dataset.step, this.isInteger)
		const [step, min, max] = Number.isFinite(tempStep)
			? [tempStep, getNumber('min'), getNumber('max')]
			: []

		// Bring value to nearest step
		const nearestStep = v => {
			const steps = Math.round((max - min) / step)
			let zerone = Math.round((v - min) * steps / (max - min)) / steps // bring to 0-1 range
			zerone = Math.min(Math.max(zerone, 0), 1) // keep in range in case value is off limits
			const value = zerone * (max - min) + min
			return this.isInteger ? Math.round(value) : value
		}

		// Step down
		this.stepDown = (stepDecrement = step) =>
			this.#triggerChange(v => nearestStep(v - stepDecrement))

		// Step up
		this.stepUp = (stepIncrement = step) =>
			this.#triggerChange(v => nearestStep(v + stepIncrement))

		// derived states
		this.set('decrement-disabled', () => isNumber(min) && (this.get('value') - step < min))
		this.set('increment-disabled', () => isNumber(max) && (this.get('value') + step > max))

		// Handle spin button clicks and update their disabled state
		this.first('.decrement')
			.sync(setProperty('disabled', 'decrement-disabled'))
			.on('click', e => this.stepDown(e.shiftKey ? step * 10 : step))
		this.first('.increment')
			.sync(setProperty('disabled', 'increment-disabled'))
			.on('click', e => this.stepUp(e.shiftKey ? step * 10 : step))

		// Handle arrow key events
		this.input.onkeydown = e => {
			if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
				e.stopPropagation()
				e.preventDefault()
				if (e.key === 'ArrowDown')
					this.stepDown(e.shiftKey ? step * 10 : step)
				if (e.key === 'ArrowUp')
					this.stepUp(e.shiftKey ? step * 10 : step)
			}
		}
	}

	// Setup clear button
	#setupClearButton() {
		this.first('.clear')
			.sync(toggleClass('hidden', 'empty'))
			.on('click', () => {
				this.clear()
				this.input.focus()
			})
	}

}
InputField.define('input-field')
