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
  title: __( 'Feature', 'fleximpleblocks' ),
  description: __(
    'Display an icon along with complementary text elements.',
    'fleximpleblocks',
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __( 'Feature', 'fleximpleblocks' ),
    /* translators: block keyword */
    __( 'fleximple block', 'fleximpleblocks' ),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
  return blockName === name ? 'fleximple-block-feature' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-feature',
  setBlockCustomClassName,
)
