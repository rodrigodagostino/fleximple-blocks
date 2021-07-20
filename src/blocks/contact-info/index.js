/**
 * BLOCK: Contact Info
 *
 * Allows the user to display multiple testimonials inside a contact-info.
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
	title: __( 'Contact Info', 'fleximpleblocks' ),
	description: __( 'Display any blocks of your choosing separated in multiple slides, and sequentially shown in a sliding motion.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Contact Info', 'fleximpleblocks' ),
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
		'fleximple-block-contact-info' :
		className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-contact-info',
	setBlockCustomClassName,
)
