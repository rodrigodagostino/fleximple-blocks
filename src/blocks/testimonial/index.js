/**
 * BLOCK: Testimonial
 *
 * Allows the user to display a testimonial.
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
  title: __( 'Testimonial', 'fleximpleblocks' ),
  description: __(
    'Present your customers thoughts of your products and/or services.',
    'fleximpleblocks',
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __( 'Testimonial', 'fleximpleblocks' ),
    /* translators: block keyword */
    __( 'fleximple block', 'fleximpleblocks' ),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
  return blockName === name ? 'fleximple-block-testimonial' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-testimonial',
  setBlockCustomClassName,
)
