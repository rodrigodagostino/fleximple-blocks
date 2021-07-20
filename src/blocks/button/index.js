/**
 * BLOCK: Button
 *
 * Allows the user to display a button with extended functionalities.
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
	title: __( 'Button', 'fleximpleblocks' ),
	description: __( 'Prompt visitors to take action with a button-style link.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Button', 'fleximpleblocks' ),
		/* translators: block keyword */
		__( 'fleximple block', 'fleximpleblocks' ),
	],
	styles: [
		{
			name: 'fill',
			/* translators: block style */
			label: __( 'Fill', 'fleximpleblocks' ),
			isDefault: true,
		},
		{
			name: 'outline',
			/* translators: block style */
			label: __( 'Outline', 'fleximpleblocks' ),
		},
		{
			name: 'clear',
			/* translators: block style */
			label: __( 'Clear', 'fleximpleblocks' ),
		},
	],
	supports: {
		reusable: false,
	},
	example: {
		attributes: {
			className: 'is-style-fill',
			text: __( 'Call to action' ),
		},
	},

	edit,
	save,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ? 'fleximple-block-button' : className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-button',
	setBlockCustomClassName,
)
