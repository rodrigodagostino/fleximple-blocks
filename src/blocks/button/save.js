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
  RichText,
  useBlockProps,
} from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function ButtonSave({
  attributes: {
    text,
    url,
    linkTarget,
    borderRadius,
    width,
    title,
    noFollow,
    noReferrer,
    iconId,
    iconSize,
    iconPosition,
    isIconOnly,
    hasCustomIcon,
    customIcon,
    backgroundColor,
    textColor,
    customBackgroundColor,
    customTextColor,
    alignmentHorizontal,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const textColorClass = getColorClassName('color', textColor)
  const backgroundColorClass = getColorClassName(
    'background-color',
    backgroundColor
  )

  const classes = classNames({
    [`block-align-h-${alignmentHorizontal}`]: alignmentHorizontal,
  })

  const blockProps = useBlockProps.save({
    className: classes,
  })

  const buttonClasses = classNames(`${defaultClassName}__link`, {
    [`width-${width}`]: width,
    'has-text-color': textColor || customTextColor,
    [textColorClass]: textColorClass,
    'has-background': backgroundColor || customBackgroundColor,
    [backgroundColorClass]: backgroundColorClass,
  })

  const relAttribute = `${noFollow ? 'nofollow' : ''} ${
    noReferrer ? 'noreferrer' : ''
  }`.trim()

  const buttonStyles = {
    backgroundColor: backgroundColorClass ? undefined : customBackgroundColor,
    color: textColorClass ? undefined : customTextColor,
    borderRadius: borderRadius.value
      ? borderRadius.value + borderRadius.unit
      : undefined,
  }

  const iconClasses = classNames(`${defaultClassName}__icon`, {
    [iconId]: iconId,
    [`position-${iconPosition}`]: iconPosition && !isIconOnly,
  })

  const customIconClasses = classNames(`${defaultClassName}__custom-icon`, {
    [`position-${iconPosition}`]: iconPosition && !isIconOnly,
  })

  return (
    <div {...blockProps}>
      <a
        className={buttonClasses}
        href={url}
        target={linkTarget}
        title={title}
        style={buttonStyles}
        rel={relAttribute ? relAttribute : null}
        tabIndex="0"
      >
        {!!iconId && iconPosition === 'left' && (
          <i className={iconClasses} style={{ fontSize: iconSize }} />
        )}

        {!!hasCustomIcon && iconPosition === 'left' && (
          <div
            className={customIconClasses}
            style={{ height: iconSize }}
            dangerouslySetInnerHTML={{ __html: customIcon }}
          />
        )}

        {!isIconOnly && (
          <RichText.Content
            tagName="span"
            className={`${defaultClassName}__text`}
            value={text}
          />
        )}

        {!!hasCustomIcon &&
          (iconPosition === 'right' || iconPosition === undefined) && (
            <div
              className={customIconClasses}
              style={{ height: iconSize }}
              dangerouslySetInnerHTML={{ __html: customIcon }}
            />
          )}

        {!!iconId &&
          (iconPosition === 'right' || iconPosition === undefined) && (
            <i className={iconClasses} style={{ fontSize: iconSize }} />
          )}
      </a>
    </div>
  )
}

export default ButtonSave
