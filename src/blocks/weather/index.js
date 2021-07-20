/**
 * BLOCK: Weather
 *
 * Allows the user to display the current weather conditions for a chosen location.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

/**
 * Internal dependencies
 */
import edit from './edit'
import icon from './icon'
import metadata from './block.json'


const { name } = metadata

export { metadata, name }

export const settings = {
	title: __( 'Weather', 'fleximpleblocks' ),
	description: __( 'Display the weather conditions for a chosen location.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Weather', 'fleximpleblocks' ),
		/* translators: block keyword */
		__( 'fleximple block', 'fleximpleblocks' ),
	],

	edit,
}


// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ?
		'fleximple-block-weather' :
		className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-weather',
	setBlockCustomClassName,
)
