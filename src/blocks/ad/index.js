/**
 * BLOCK: Ad
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
  title: __( 'Ad', 'fleximpleblocks' ),
  description: __(
    'Display an ad that can switch to different versions depending on the screen size.',
    'fleximpleblocks',
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __( 'Ad', 'fleximpleblocks' ),
    /* translators: block keyword */
    __( 'advertisement', 'fleximpleblocks' ),
    /* translators: block keyword */
    __( 'fleximple block', 'fleximpleblocks' ),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
  return blockName === name ? 'fleximple-block-ad' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-ad',
  setBlockCustomClassName,
)
