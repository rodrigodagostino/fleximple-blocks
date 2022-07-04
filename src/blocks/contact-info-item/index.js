/**
 * BLOCK: Contact Item
 *
 * Allows the user to display multiple testimonials inside a slider.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

/**
 * Internal dependencies
 */
import icon from './icon'
import metadata from './block.json'
import edit from './edit'
import save from './save'

const { name } = metadata

export { metadata, name }

export const settings = {
  title: __('Contact Item'),
  description: __(
    'The single unit that works as the main structural component for the contact information block.',
    'fleximpleblocks'
  ),
  parent: ['fleximple-blocks/contact-info'],
  icon,
  supports: {
    inserter: false,
    reusable: false,
    html: false,
  },

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName(className, blockName) {
  return blockName === name ? 'fleximple-block-contact-info-item' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-contact-info-item',
  setBlockCustomClassName
)
