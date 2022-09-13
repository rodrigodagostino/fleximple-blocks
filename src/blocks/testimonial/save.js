/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { getColorClassName, RichText } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { Component } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

class TestimonialSave extends Component {
  constructor() {
    super(...arguments)

    this.state = {}
  }

  render() {
    const {
      className,
      attributes: {
        iconId,
        iconSize,
        iconColor,
        customIconColor,
        quote,
        mediaId,
        mediaUrl,
        mediaAlt,
        mediaHeight,
        mediaBorderRadius,
        reference,
        textAlignment,
        gap,
        order,
        displayIcon,
        displayQuote,
        displayMedia,
        displayReference,
      },
    } = this.props

    const defaultClassName = getBlockDefaultClassName(name)

    const classes = classNames(className, {
      [`text-align-${textAlignment.small}--sm`]: textAlignment.small,
      [`text-align-${textAlignment.medium}--md`]: textAlignment.medium,
      [`text-align-${textAlignment.large}--lg`]: textAlignment.large,
      [`gap-${
        gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)
      }--sm`]: gap.small.value,
      [`gap-${
        gap.medium.value + (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
      }--md`]: gap.medium.value,
      [`gap-${
        gap.large.value + (gap.large.unit === '%' ? 'pct' : gap.large.unit)
      }--lg`]: gap.large.value,
      [`media-height-${
        mediaHeight.small.value +
        (mediaHeight.small.unit === '%' ? 'pct' : mediaHeight.small.unit)
      }--sm`]: mediaHeight.small.value,
      [`media-height-${
        mediaHeight.medium.value +
        (mediaHeight.medium.unit === '%' ? 'pct' : mediaHeight.medium.unit)
      }--md`]: mediaHeight.medium.value,
      [`media-height-${
        mediaHeight.large.value +
        (mediaHeight.large.unit === '%' ? 'pct' : mediaHeight.large.unit)
      }--lg`]: mediaHeight.large.value,
    })

    const iconColorClass = getColorClassName('color', iconColor)

    const iconClasses = classNames(`${defaultClassName}__icon`, iconId, {
      'has-text-color': iconColor || customIconColor,
      [iconColorClass]: iconColorClass,
    })

    const iconStyles = {
      fontSize: iconSize,
      width: iconSize,
      color: iconColorClass ? undefined : customIconColor,
    }

    return (
      <div className={classes}>
        <style>
          {textAlignment.small
            ? `.${defaultClassName}.text-align-${textAlignment.small}--sm {
              text-align: ${textAlignment.small};
            }`
            : ''}
          {gap.small.value
            ? `.${defaultClassName}.gap-${
                gap.small.value +
                (gap.small.unit === '%' ? 'pct' : gap.small.unit)
              }--sm > * {
              margin-bottom: ${gap.small.value + gap.small.unit};
            }`
            : ''}
          {mediaHeight.small.value
            ? `.${defaultClassName}.media-height-${
                mediaHeight.small.value +
                (mediaHeight.small.unit === '%'
                  ? 'pct'
                  : mediaHeight.small.unit)
              }--sm .${defaultClassName}__media .${defaultClassName}__image {
              height: ${mediaHeight.small.value + mediaHeight.small.unit};
            }`
            : ''}
          {mediaBorderRadius.small.value
            ? `.${defaultClassName} .${defaultClassName}__image {
              border-radius: ${
                mediaBorderRadius.small.value + mediaBorderRadius.small.unit
              };
            }`
            : ''}

          {(!!textAlignment.medium ||
            !!gap.medium.value ||
            !!mediaHeight.medium.value ||
            !!mediaBorderRadius.medium.value) &&
            `@media only screen and (min-width: ${
              fleximpleblocksPluginData.settings.mediumBreakpointValue
            }px) {
            ${
              textAlignment.medium
                ? `.${defaultClassName}.text-align-${textAlignment.medium}--md {
                text-align: ${textAlignment.medium};
              }`
                : ''
            }
            ${
              gap.medium.value
                ? `.${defaultClassName}.gap-${
                    gap.medium.value +
                    (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
                  }--md > * {
                margin-bottom: ${gap.medium.value + gap.medium.unit};
              }`
                : ''
            }
            ${
              mediaHeight.medium.value
                ? `.${defaultClassName}.media-height-${
                    mediaHeight.medium.value +
                    (mediaHeight.medium.unit === '%'
                      ? 'pct'
                      : mediaHeight.medium.unit)
                  }--md .${defaultClassName}__media .${defaultClassName}__image {
                height: ${mediaHeight.medium.value + mediaHeight.medium.unit};
              }`
                : ''
            }
            ${
              mediaBorderRadius.medium.value
                ? `.${defaultClassName} .${defaultClassName}__image {
                border-radius: ${
                  mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit
                };
              }`
                : ''
            }
            }`}

          {(!!textAlignment.large ||
            !!gap.large.value ||
            !!mediaHeight.large.value ||
            !!mediaBorderRadius.large.value) &&
            `@media only screen and (min-width: ${
              fleximpleblocksPluginData.settings.largeBreakpointValue
            }px) {
            ${
              textAlignment.large.value
                ? `.${defaultClassName}.text-align-${textAlignment.large}--lg {
                text-align: ${textAlignment.large};
              }`
                : ''
            }
            ${
              gap.large.value
                ? `.${defaultClassName}.gap-${
                    gap.large.value +
                    (gap.large.unit === '%' ? 'pct' : gap.large.unit)
                  }--lg > * {
                margin-bottom: ${gap.large.value + gap.large.unit};
              }`
                : ''
            }
            ${
              mediaHeight.large.value
                ? `.${defaultClassName}.media-height-${
                    mediaHeight.large.value +
                    (mediaHeight.large.unit === '%'
                      ? 'pct'
                      : mediaHeight.large.unit)
                  }--lg .${defaultClassName}__media .${defaultClassName}__image {
                height: ${mediaHeight.large.value + mediaHeight.large.unit};
              }`
                : ''
            }
            ${
              mediaBorderRadius.large.value
                ? `.${defaultClassName} .${defaultClassName}__image {
                border-radius: ${
                  mediaBorderRadius.large.value + mediaBorderRadius.large.unit
                };
              }`
                : ''
            }
            }`}
        </style>

        {
          // eslint-disable-next-line array-callback-return
          order.map((fragment) => {
            if ('icon' === fragment) {
              if (displayIcon) {
                return <i className={iconClasses} style={iconStyles} />
              }
            }

            if ('quote' === fragment) {
              if (displayQuote && !RichText.isEmpty(quote)) {
                return (
                  <RichText.Content
                    tagName="blockquote"
                    className={`${defaultClassName}__quote`}
                    value={quote}
                  />
                )
              }
            }

            if ('media' === fragment) {
              if (displayMedia && !!mediaId) {
                return (
                  <figure className={`${defaultClassName}__media`}>
                    <img
                      className={`${defaultClassName}__image`}
                      src={mediaUrl}
                      alt={mediaAlt}
                    />
                  </figure>
                )
              }
            }

            if ('reference' === fragment) {
              if (displayReference && !RichText.isEmpty(reference)) {
                return (
                  <RichText.Content
                    tagName="p"
                    className={`${defaultClassName}__reference`}
                    value={reference}
                  />
                )
              }
            }
          })
        }
      </div>
    )
  }
}

export default TestimonialSave
