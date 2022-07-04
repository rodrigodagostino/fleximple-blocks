/**
 * BLOCK: Header
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
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
  title: __('Header', 'fleximpleblocks'),
  description: __(
    'Introduce new sections and organize content to help visitors (and search engines) better understand the structure of your site.',
    'fleximpleblocks'
  ),
  icon,
  keywords: [
    /* translators: block keyword */
    __('Header', 'fleximpleblocks'),
    /* translators: block keyword */
    __('heading', 'fleximpleblocks'),
    /* translators: block keyword */
    __('title', 'fleximpleblocks'),
    /* translators: block keyword */
    __('fleximple block', 'fleximpleblocks'),
  ],

  edit,
  save,
}

// Provide a custom block class
function setBlockCustomClassName(className, blockName) {
  return blockName === name ? 'fleximple-block-header' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-header',
  setBlockCustomClassName
)
