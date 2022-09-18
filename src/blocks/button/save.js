/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  getColorClassName,
  InnerBlocks,
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
    blockId,
    text,
    url,
    linkTarget,
    borderRadius,
    title,
    noFollow,
    noReferrer,
    hasIcon,
    iconPosition,
    isIconOnly,
    backgroundColor,
    textColor,
    customBackgroundColor,
    customTextColor,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const textColorClass = getColorClassName('color', textColor)
  const backgroundColorClass = getColorClassName(
    'background-color',
    backgroundColor
  )

  const blockProps = useBlockProps.save({
    className: defaultClassName,
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

  return (
    <div {...blockProps} data-block-id={blockId}>
      <a
        className={`${defaultClassName}__link`}
        href={url}
        target={linkTarget}
        title={title}
        style={buttonStyles}
        rel={relAttribute ? relAttribute : null}
        tabIndex="0"
      >
        {hasIcon && iconPosition === 'left' && <InnerBlocks.Content />}

        {!isIconOnly && (
          <RichText.Content
            tagName="span"
            className={`${defaultClassName}__text`}
            value={text}
          />
        )}

        {hasIcon && iconPosition === 'right' && <InnerBlocks.Content />}
      </a>

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default ButtonSave
