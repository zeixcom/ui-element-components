import TabList from './tab-list.html'

export default {
	title: 'blocks/tab-list',
    render: TabList,
	argTypes: {
		accordion: { type: 'boolean', control: 'boolean' },
        tabs: { type: 'array' },
    },
    args: {
		accordion: false,
        tabs: [
            { title: 'Tab 1', open: true, collapsible: false, content: 'Tab 1 content' },
            { title: 'Tab 2', open: false, collapsible: false, content: 'Tab 2 content' },
            { title: 'Tab 3', open: false, collapsible: false, content: 'Tab 3 content' },
        ],
    },
}

export const Tabs = {}

export const Accordion = {
	args: {
		accordion: true,
        tabs: [
            { title: 'Tab 1', open: true, collapsible: true, content: 'Tab 1 content' },
            { title: 'Tab 2', open: false, collapsible: true, content: 'Tab 2 content' },
            { title: 'Tab 3', open: false, collapsible: true, content: 'Tab 3 content' },
        ],
    },
}