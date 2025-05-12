import TabGroup from './tab-group.html'

export default {
	title: 'blocks/tab-group',
    render: TabGroup,
	argTypes: {
        tabs: { type: 'array' },
    },
    args: {
        tabs: [
            { id: '1', title: 'Tab 1', selected: true, content: 'Tab 1 content' },
            { id: '2', title: 'Tab 2', selected: false, content: 'Tab 2 content' },
            { id: '3', title: 'Tab 3', selected: false, content: 'Tab 3 content' },
        ],
    },
}

export const Tabs = {}