/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

const FeatureSave = ({ className, attributes, attributes: { blockId } }) => {
  const defaultClassName = getBlockDefaultClassName(name)

  // prettier-ignore
  const classes = classNames(defaultClassName, className)

  return (
    <div className={classes} data-block-id={blockId}>
      <div className={`${defaultClassName}__inner`}>
        <InnerBlocks.Content />
      </div>

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default FeatureSave
