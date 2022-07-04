/**
 * BLOCK: Iframe
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
import edit from './edit'
import save from './save'
import icon from './icon'
import metadata from './block.json'

const { name } = metadata

export { metadata, name }

export const settings = {
  title: __('Iframe'),
  description: __(
    'An inline frame used to embed another document within the current document.',
    'fleximpleblocks'
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __('Iframe', 'fleximpleblocks'),
    /* translators: block keyword */
    __('fleximple block', 'fleximpleblocks'),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName(className, blockName) {
  return blockName === name ? 'fleximple-block-iframe' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-iframe',
  setBlockCustomClassName
)
