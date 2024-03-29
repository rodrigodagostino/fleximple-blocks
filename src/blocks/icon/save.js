/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { getColorClassName, useBlockProps } from '@wordpress/block-editor'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function IconSave({
  attributes: {
    iconData,
    iconSize,
    iconColor,
    customIconColor,
    hasCustomIcon,
    customIcon,
    alignmentHorizontal,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classNames(defaultClassName, {
    [`${defaultClassName}--custom`]: hasCustomIcon,
    'has-text-color': iconColor || customIconColor,
    [`block-align-h-${alignmentHorizontal}`]: alignmentHorizontal,
  })

  const blockProps = useBlockProps.save({
    className: classes,
  })

  const iconColorClass = getColorClassName('color', iconColor)

  const iconClasses = classNames(iconData.value, {
    [iconColorClass]: iconColorClass,
  })

  const iconStyles = {
    fontSize: `${iconSize}px`,
    color: iconColorClass ? undefined : customIconColor,
    height: hasCustomIcon ? iconSize : undefined,
  }

  return (
    <>
      {!!iconData?.value && !hasCustomIcon && (
        <div {...blockProps}>
          <i className={iconClasses} style={iconStyles} />
        </div>
      )}

      {!!hasCustomIcon && <RawHTML {...blockProps}>{customIcon}</RawHTML>}
    </>
  )
}

export default IconSave
