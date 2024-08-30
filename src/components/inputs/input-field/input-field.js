import { UIElement, effect, maybe, on, setText, setProperty, setAttribute, toggleClass } from '@efflore/ui-element'

/* === Pure Functions === */

const isNumber = num => typeof num === 'number'
const parseNumber = (v, int = false) => int ? parseInt(v, 10) : parseFloat(v)

/* === Class Definition === */

class InputField extends UIElement {
	static observedAttributes = ['value', 'description']
	static attributeMap = {
		value: value => this.isNumber
			? value.map(v => parseNumber(v, this.isInteger)).filter(Number.isFinite)
			: value
	}

	connectedCallback() {
		this.input = this.querySelector('input')
		this.isNumber = this.input && this.input.type === 'number'
		this.isInteger = this.hasAttribute('integer')

		// set default states
		this.set('value', this.isNumber ? this.input.valueAsNumber : this.input.value, false)
		this.set('length', this.input.value.length)
		
		// derived states
		this.set('empty', () => this.get('length') === 0)

		// setup sub elements
		this.#setupErrorMessage()
		this.#setupDescription()
		this.#setupSpinButton()
		this.#setupClearButton()

		// handle input changes
		this.input.onchange = () => this.#triggerChange(this.isNumber ? this.input.valueAsNumber : this.input.value)
		this.input.oninput = () => this.set('length', this.input.value.length)

		// update value
		effect(async () => {
			const value = this.get('value')
			const validate = this.getAttribute('validate')
			if (value && validate) {
				// validate input value against a server-side endpoint
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
		});
 	}

	/**
	 * Clear the input field
	 */
	clear() {
		this.input.value = ''
		this.set('value', '')
		this.set('length', 0)
	}

	/**
	 * Trigger value-change event to commit the value change
	 * 
	 * @private
	 * @param {number|string|function} value - value to set
	 */
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

	/**
	 * Setup error message
	 * 
	 * @private
	 */
	#setupErrorMessage() {
		const error = this.first('.error')

		// derived states
		this.set('aria-invalid', () => String(Boolean(this.get('error'))))
		this.set('aria-errormessage', () => this.get('error')
			? error[0]?.target.id
			: undefined
		)

		// effects
		error
			.map(setText('error'))
		this.first('input')
			.map(setAttribute('aria-invalid'))
			.map(setAttribute('aria-errormessage'))
	}

	/**
	 * Setup description
	 * 
	 * @private
	 */
	#setupDescription() {
		const description = this.first('.description')
		if (!description[0])
			return // no description, so skip
		
		// derived states
		const input = this.first('input')
		const maxLength = this.input.maxLength
		const remainingMessage = maxLength && description[0].target.dataset.remaining
		const defaultDescription = description[0].target.textContent
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
			? description[0].target.id
			: undefined
		)

		// effects
		description.forEach(setText('description'))
		input.forEach(setAttribute('aria-describedby'))
	}

	/**
	 * Setup spin button
	 * 
	 * @private
	 */
	#setupSpinButton() {
		const spinButton = this.querySelector('.spinbutton')
		if (!this.isNumber || !spinButton)
			return // no spin button, so skip

		const getNumber = attr => maybe(parseNumber(this.input[attr], this.isInteger)).filter(Number.isFinite)[0]
		const tempStep = parseNumber(spinButton.dataset.step, this.isInteger)
		const [step, min, max] = Number.isFinite(tempStep)
			? [tempStep, getNumber('min'), getNumber('max')]
			: []

		// bring value to nearest step
		const nearestStep = v => {
			const steps = Math.round((max - min) / step)
			let zerone = Math.round((v - min) * steps / (max - min)) / steps // bring to 0-1 range    
			zerone = Math.min(Math.max(zerone, 0), 1) // keep in range in case value is off limits
			const value = zerone * (max - min) + min
			return this.isInteger ? Math.round(value) : value
		}

		/**
		 * Step down
		 * 
		 * @param {number} [stepDecrement=step] - value to increment by
		 */
		this.stepDown = (stepDecrement = step) => this.#triggerChange(v => nearestStep(v - stepDecrement))

		/**
		 * Step up
		 * 
		 * @param {number} [stepIncrement=step] - value to increment by
		 */
		this.stepUp = (stepIncrement = step) => this.#triggerChange(v => nearestStep(v + stepIncrement))

		// derived states
		this.set('decrement-disabled', () => isNumber(min) && (this.get('value') - step < min))
		this.set('increment-disabled', () => isNumber(max) && (this.get('value') + step > max))

		// handle spin button clicks and update their disabled state
		this.first('.decrement')
			.map(setProperty('disabled', 'decrement-disabled'))
			.forEach(on('click', e => this.stepDown(e.shiftKey ? step * 10 : step)))
		this.first('.increment')
			.map(setProperty('disabled', 'increment-disabled'))
			.forEach(on('click', e => this.stepUp(e.shiftKey ? step * 10 : step)))

		// handle arrow key events
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

	/**
	 * Setup clear button
	 * 
	 * @private
	 */
	#setupClearButton() {
		this.first('.clear')
			.map(toggleClass('hidden', 'empty'))
			.forEach(on('click', () => {
				this.clear()
				this.input.focus()
			}))
	}

}

InputField.define('input-field')
