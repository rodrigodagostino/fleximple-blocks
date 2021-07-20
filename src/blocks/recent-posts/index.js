/**
 * BLOCK: Recent Posts
 *
 * Allows the user to select and display a list of the most recent posts, while customizing the output component with extended functionalities.
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
	title: __( 'Recent Posts', 'fleximpleblocks' ),
	description: __( 'Display a list of your most recent posts.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Recent Posts', 'fleximpleblocks' ),
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
}


// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ?
		'fleximple-block-recent-posts' :
		className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-recent-posts',
	setBlockCustomClassName,
)
