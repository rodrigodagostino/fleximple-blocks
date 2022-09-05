/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  getColorClassName,
  InnerBlocks,
  useBlockProps,
} from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

function RowSave({
  attributes,
  attributes: {
    rowId,
    rowTag,
    blockId,
    overlayColor,
    customOverlayColor,
    overlayOpacity,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const overlayColorClass = getColorClassName('background-color', overlayColor)

  const overlayClasses = classNames(`${defaultClassName}__overlay`, {
    'has-background': (overlayColor || customOverlayColor) && overlayOpacity,
    [overlayColorClass]: overlayColorClass && overlayOpacity,
    [`opacity-${overlayOpacity}`]: overlayOpacity,
  })

  const overlayStyles = {
    backgroundColor:
      !overlayOpacity && overlayColorClass ? undefined : customOverlayColor,
  }

  const RowTag = rowTag

  return (
    <RowTag
      {...useBlockProps.save({ id: rowId, className: defaultClassName })}
      data-block-id={blockId}
    >
      <div className={`${defaultClassName}__inner`}>
        {(!!overlayColor || !!customOverlayColor) && (
          <div className={overlayClasses} style={overlayStyles} />
        )}

        <div className={`${defaultClassName}__content`}>
          <InnerBlocks.Content />
        </div>
      </div>

      <InlineStyles {...{ defaultClassName, attributes }} />
    </RowTag>
  )
}

export default RowSave
