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
import InlineStyles from './inline-styles'

const { name } = metadata

function ButtonSave({
  attributes,
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
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
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

  // prettier-ignore
  const buttonClasses = classNames(`${defaultClassName}__link`, {
    [`width-${width}`]: width,
    [`padding-top-${paddingTop.small.value + (paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit)}--sm`]: paddingTop.small.value,
    [`padding-top-${paddingTop.medium.value + (paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit)}--md`]: paddingTop.medium.value,
    [`padding-top-${paddingTop.large.value + (paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit)}--lg`]: paddingTop.large.value,
    [`padding-right-${paddingRight.small.value + (paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit)}--sm`]: paddingRight.small.value,
    [`padding-right-${paddingRight.medium.value + (paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit)}--md`]: paddingRight.medium.value,
    [`padding-right-${paddingRight.large.value + (paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit)}--lg`]: paddingRight.large.value,
    [`padding-bottom-${paddingBottom.small.value + (paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit)}--sm`]: paddingBottom.small.value,
    [`padding-bottom-${paddingBottom.medium.value + (paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit)}--md`]: paddingBottom.medium.value,
    [`padding-bottom-${paddingBottom.large.value + (paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit)}--lg`]: paddingBottom.large.value,
    [`padding-left-${paddingLeft.small.value + (paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit)}--sm`]: paddingLeft.small.value,
    [`padding-left-${paddingLeft.medium.value + (paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit)}--md`]: paddingLeft.medium.value,
    [`padding-left-${paddingLeft.large.value + (paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit)}--lg`]: paddingLeft.large.value,
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

      <InlineStyles {...{ attributes }} />
    </div>
  )
}

export default ButtonSave
