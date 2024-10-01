import AccordionPanel from './accordion-panel.html'

export default {
	title: 'blocks/accordion-panel',
	render: AccordionPanel,
	argTypes: {
		open: { type: 'boolean', control: { type: 'boolean' } },
        collapsible: { type: 'boolean', control: { type: 'boolean' } },
        title: { type: 'string' },
        content: { type: 'string' },
    },
	args: {
		open: true,
        collapsible: true,
        title: 'Tab Title',
        content: 'Tab content',
	},
}

export const AccordionOpen = {}

export const AccordionClosed = {
	args: {
        open: false,
    },
}

export const TabOpen = {
	args: {
        collapsible: false,
    },
}

export const TabClosed = {
	args: {
        collapsible: false,
        open: false,
    },
}