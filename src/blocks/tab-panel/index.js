/**
 * BLOCK: Tab
 *
 * Allows the user to display multiple testimonials inside a slider.
 */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import icon from './icon'
import metadata from './block.json'

const { name } = metadata

export { metadata, name }

export const settings = {
  title: __( 'Tab Panel' ),
  description: __(
    'The single unit that works as the main structural component for the tabs block.',
    'fleximpleblocks',
  ),
  parent: [ 'fleximple-blocks/tabs' ],
  icon,
  supports: {
    inserter: false,
    reusable: false,
    html: false,
  },

  edit: ( props ) => {
    const { className } = props

    const TEMPLATE = [
      [
        'core/paragraph',
        { placeholder: __( 'Add content…', 'fleximpleblocks' ) },
      ],
    ]

    return (
      <div className={ className } role="tabpanel">
        <InnerBlocks
          template={ TEMPLATE }
          templateInsertUpdatesSelection={ false }
          templateLock={ false }
        />
      </div>
    )
  },

  save: () => {
    const defaultClassName = getBlockDefaultClassName( name )

    const classes = classnames( defaultClassName )

    return (
      <div className={ classes } role="tabpanel">
        <InnerBlocks.Content />
      </div>
    )
  },
}

// Provide a custom block class
function setBlockCustomClassName( className, blockName ) {
  return blockName === name ? 'fleximple-block-tab-panel' : className
}

wp.hooks.addFilter(
  'blocks.getBlockDefaultClassName',
  'fleximple-blocks/fleximple-block-tab-panel',
  setBlockCustomClassName,
)
