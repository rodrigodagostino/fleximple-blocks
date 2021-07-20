/**
 * BLOCK: Button Group
 *
 * Allows the user to display a group of buttons with extended functionalities.
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
	title: __( 'Buttons', 'fleximpleblocks' ),
	description: __( 'Prompt visitors to take action with a group of button-style links.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Buttons', 'fleximpleblocks' ),
		/* translators: block keyword */
		__( 'fleximple block', 'fleximpleblocks' ),
	],

	edit,
	save,
}


// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ?
		'fleximple-block-buttons' :
		className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-buttons',
	setBlockCustomClassName,
)
