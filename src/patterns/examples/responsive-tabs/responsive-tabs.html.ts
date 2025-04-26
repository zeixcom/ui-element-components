import { html } from 'lit'

import MediaContext from '../../contexts/media-context/media-context.html'
import MediaInspect from '../../../components/atoms/media-inspect/media-inspect.html'

export default ({}) => html`
${MediaContext({
	sm: '32em',
    md: '48em',
    lg: '72em',
    xl: '108em',
    content: MediaInspect({
		motion: 'User prefers reduced motion',
        theme: 'User prefers color scheme',
        viewport: 'User screen viewport is',
        orientation: 'User screen orientation is',
	}),
})}`