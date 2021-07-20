/**
 * BLOCK: Row
 *
 * Allow the user to create a container which can hold other blocks inside.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import icon from './icon'
import metadata from './block.json'


const { name } = metadata

export { metadata, name }

export const settings = {
	title: __( 'Row', 'fleximpleblocks' ),
	description: __( 'Organize and structure your content within this feature-rich block.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Row', 'fleximpleblocks' ),
		/* translators: block keyword */
		__( 'fleximple block', 'fleximpleblocks' ),
	],

	getEditWrapperProps( attributes ) {
		const { alignment } = attributes
		if ( 'left' === alignment || 'center' === alignment || 'right' === alignment || 'wide' === alignment || 'full' === alignment ) {
			return { 'data-align': alignment }
		}
	},

	edit,
	save,
}


// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ?
		'fleximple-block-row' :
		className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-row',
	setBlockCustomClassName,
)
