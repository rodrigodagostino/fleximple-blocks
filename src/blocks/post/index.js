/**
 * BLOCK: Post
 *
 * Allows the user to select and display a specific post, while customizing the output component.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import edit from './edit'
import icon from './icon'
import metadata from './block.json'

const { name } = metadata

export { metadata, name }

export const settings = {
	title: __( 'Post', 'fleximpleblocks' ),
	description: __( 'Display a specific post or page.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Post', 'fleximpleblocks' ),
		/* translators: block keyword */
		__( 'fleximple block', 'fleximpleblocks' ),
	],
	styles: [
		{
			name: 'standard',
			/* translators: block style */
			label: __( 'Standard', 'fleximpleblocks' ),
			isDefault: true,
		},
		{
			name: 'stacked',
			/* translators: block style */
			label: __( 'Stacked', 'fleximpleblocks' ),
		},
	],

	edit,
	save: () => {
		return (
			<InnerBlocks.Content />
		)
	},
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ? 'fleximple-block-post' : className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-post',
	setBlockCustomClassName,
)
