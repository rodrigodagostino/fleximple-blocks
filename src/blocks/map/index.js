/**
 * BLOCK: Map
 *
 * Allows the user to select and display a specific post, while customizing the output component.
 */

/**
 * Internal dependencies
 */
import edit from './edit'
import save from './save'
import icon from './icon'
import metadata from './block.json'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'

const { name } = metadata

export { metadata, name }

export const settings = {
  title: __('Map', 'fleximpleblocks'),
  description: __(
    'Embed a simple map with a location of your choosing.',
    'fleximpleblocks'
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __('Map', 'fleximpleblocks'),
    /* translators: block keyword */
    __('fleximple block', 'fleximpleblocks'),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName(className, blockName) {
  return blockName === name ? 'fleximple-block-map' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-map',
  setBlockCustomClassName
)
