/**
 * BLOCK: Profile
 *
 * Allows the user to display a profile picture and information.
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
  title: __( 'Profile', 'fleximpleblocks' ),
  description: __(
    'Introduce your staff members to your visitors.',
    'fleximpleblocks',
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __( 'Profile', 'fleximpleblocks' ),
    /* translators: block keyword */
    __( 'fleximple block', 'fleximpleblocks' ),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
  return blockName === name ? 'fleximple-block-profile' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-profile',
  setBlockCustomClassName,
)
