import MySlider from './my-slider.html.js'

export default {
	title: 'blocks/my-slider',
	render: MySlider,
	args: {
		slides: ['Slide 1', 'Slide 2', 'Slide 3'],
		prevLabel: 'Previous',
        nextLabel: 'Next',
	},
}

export const Base = {}