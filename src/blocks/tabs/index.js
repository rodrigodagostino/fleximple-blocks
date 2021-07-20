/**
 * BLOCK: Feature
 *
 * Allows the user to display an icon along with some information.
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
	title: __( 'Tabs', 'fleximpleblocks' ),
	description: __( 'Divide and organize your content through tabs.', 'fleximpleblocks' ),
	icon,
	keywords: [
		/* translators: block keyword */
		__( 'Tabs', 'fleximpleblocks' ),
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
			name: 'underlined',
			/* translators: block style */
			label: __( 'Underlined', 'fleximpleblocks' ),
		},
		{
			name: 'pills',
			/* translators: block style */
			label: __( 'Pills', 'fleximpleblocks' ),
		},
	],

	edit,
	save,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
	return blockName === name ?
		'fleximple-block-tabs' :
		className
}

wp.hooks.addFilter(
	'blocks.getBlockDefaultClassName',
	'fleximple-blocks/fleximple-block-tabs',
	setBlockCustomClassName,
)
