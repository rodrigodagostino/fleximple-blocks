/**
 * BLOCK: Date & Time
 *
 * Allows the user to display the current date and time.
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
  title: __( 'Date & Time', 'fleximpleblocks' ),
  description: __(
    'Displays the current date and/or time based on your chosen settings.',
    'fleximpleblocks',
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __( 'Date & Time', 'fleximpleblocks' ),
    /* translators: block keyword */
    __( 'fleximple block', 'fleximpleblocks' ),
  ],

  edit,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
  return blockName === name ? 'fleximple-block-date-and-time' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-date-and-time',
  setBlockCustomClassName,
)
