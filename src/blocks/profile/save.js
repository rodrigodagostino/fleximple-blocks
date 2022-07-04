/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function ProfileSave({
  attributes: {
    contentAlignment,
    textAlignment,
    mediaGap,
    contentGap,
    direction,
    isReversed,
    mediaId,
    mediaUrl,
    mediaAlt,
    mediaWidth,
    mediaHeight,
    mediaBorderRadius,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classnames({
    [`block-align-${contentAlignment.small}--sm`]: contentAlignment.small,
    [`block-align-${contentAlignment.medium}--md`]: contentAlignment.medium,
    [`block-align-${contentAlignment.large}--lg`]: contentAlignment.large,
    [`text-align-${textAlignment.small}--sm`]: textAlignment.small,
    [`text-align-${textAlignment.medium}--md`]: textAlignment.medium,
    [`text-align-${textAlignment.large}--lg`]: textAlignment.large,
    [`media-gap-${
      mediaGap.small.value +
      (mediaGap.small.unit === '%' ? 'pct' : mediaGap.small.unit)
    }--sm`]: mediaGap.small.value,
    [`media-gap-${
      mediaGap.medium.value +
      (mediaGap.medium.unit === '%' ? 'pct' : mediaGap.medium.unit)
    }--md`]: mediaGap.medium.value,
    [`media-gap-${
      mediaGap.large.value +
      (mediaGap.large.unit === '%' ? 'pct' : mediaGap.large.unit)
    }--lg`]: mediaGap.large.value,
    [`content-gap-${
      contentGap.small.value +
      (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)
    }--sm`]: contentGap.small.value,
    [`content-gap-${
      contentGap.medium.value +
      (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)
    }--md`]: contentGap.medium.value,
    [`content-gap-${
      contentGap.large.value +
      (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)
    }--lg`]: contentGap.large.value,
    [`direction-${direction.small === 'row' ? 'h' : 'v'}--sm`]: direction.small,
    [`direction-${direction.medium === 'row' ? 'h' : 'v'}--md`]:
      direction.medium,
    [`direction-${direction.large === 'row' ? 'h' : 'v'}--lg`]: direction.large,
    'is-reversed--sm': isReversed.small,
    'is-reversed--md': isReversed.medium,
    'is-reversed--lg': isReversed.large,
    [`media-width-${
      mediaWidth.small.value +
      (mediaWidth.small.unit === '%' ? 'pct' : mediaWidth.small.unit)
    }--sm`]: mediaWidth.small.value,
    [`media-width-${
      mediaWidth.medium.value +
      (mediaWidth.medium.unit === '%' ? 'pct' : mediaWidth.medium.unit)
    }--md`]: mediaWidth.medium.value,
    [`media-width-${
      mediaWidth.large.value +
      (mediaWidth.large.unit === '%' ? 'pct' : mediaWidth.large.unit)
    }--lg`]: mediaWidth.large.value,
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

  const blockProps = useBlockProps.save({
    className: classes,
  })

  const mediaStyles = {
    backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
  }

  return (
    <div {...blockProps}>
      <style>
        {`.${defaultClassName}.text-align-${
          textAlignment.small
        }--sm .${defaultClassName}__media {
            ${
              'margin-left: ' +
              (textAlignment.small === 'left' ? '0' : 'auto') +
              ';'
            }
            ${
              'margin-right: ' +
              (textAlignment.small === 'right' ? '0' : 'auto') +
              ';'
            }
          }`}
        {`.${defaultClassName}.media-gap-${
          mediaGap.small.value +
          (mediaGap.small.unit === '%' ? 'pct' : mediaGap.small.unit)
        }--sm.direction-${direction.small === 'row' ? 'h' : 'v'}--sm${
          isReversed.small ? '.is-reversed--sm' : ''
        } .${defaultClassName}__media {
            ${
              direction.small === 'row' && isReversed.small !== true
                ? 'margin-right: ' +
                  mediaGap.small.value +
                  mediaGap.small.unit +
                  ';'
                : ''
            }
            ${
              direction.small === 'row' && isReversed.small === true
                ? 'margin-left: ' +
                  mediaGap.small.value +
                  mediaGap.small.unit +
                  ';'
                : ''
            }
            ${
              direction.small === 'column' && isReversed.small !== true
                ? 'margin-bottom: ' +
                  mediaGap.small.value +
                  mediaGap.small.unit +
                  ';'
                : ''
            }
            ${
              direction.small === 'column' && isReversed.small === true
                ? 'margin-top: ' +
                  mediaGap.small.value +
                  mediaGap.small.unit +
                  ';'
                : ''
            }
          }`}
        {`.${defaultClassName}.content-gap-${
          contentGap.small.value +
          (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)
        }--sm .${defaultClassName}__content > * {
            ${
              'margin-top: ' +
              contentGap.small.value / 2 +
              contentGap.small.unit +
              ';'
            }
            ${
              'margin-bottom: ' +
              contentGap.small.value / 2 +
              contentGap.small.unit +
              ';'
            }
          }`}
        {`.${defaultClassName}.media-width-${
          mediaWidth.small.value +
          (mediaWidth.small.unit === '%' ? 'pct' : mediaWidth.small.unit)
        }--sm .${defaultClassName}__media {
            width: ${mediaWidth.small.value + mediaWidth.small.unit};
          }`}
        {`.${defaultClassName}.media-height-${
          mediaHeight.small.value +
          (mediaHeight.small.unit === '%' ? 'pct' : mediaHeight.small.unit)
        }--sm .${defaultClassName}__media {
            height: ${mediaHeight.small.value + mediaHeight.small.unit};
          }`}
        {`.${defaultClassName} .${defaultClassName}__media {
            border-radius: ${
              mediaBorderRadius.small.value + mediaBorderRadius.small.unit
            };
          }`}

        {(!!textAlignment.medium ||
          !!mediaGap.medium.value ||
          !!contentGap.medium.value ||
          !!mediaWidth.medium.value ||
          !!mediaHeight.medium.value ||
          !!mediaBorderRadius.medium.value) &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.mediumBreakpointValue
          }px) {
          ${
            !!textAlignment.medium &&
            `.${defaultClassName}.text-align-${
              textAlignment.medium
            }--md .${defaultClassName}__media {
              ${
                'margin-left: ' +
                (textAlignment.medium === 'left' ? '0' : 'auto') +
                ';'
              }
              ${
                'margin-right: ' +
                (textAlignment.medium === 'right' ? '0' : 'auto') +
                ';'
              }
            }`
          }
          ${
            !!mediaGap.medium.value &&
            `.${defaultClassName}.media-gap-${
              mediaGap.medium.value +
              (mediaGap.medium.unit === '%' ? 'pct' : mediaGap.medium.unit)
            }--md.direction-${direction.medium === 'row' ? 'h' : 'v'}--md${
              isReversed.medium ? '.is-reversed--md' : ''
            } .${defaultClassName}__media {
              ${
                direction.medium === 'row' && isReversed.medium !== true
                  ? 'margin-right: ' +
                    mediaGap.medium.value +
                    mediaGap.medium.unit +
                    ';'
                  : ''
              }
              ${
                direction.medium === 'row' && isReversed.medium === true
                  ? 'margin-left: ' +
                    mediaGap.medium.value +
                    mediaGap.medium.unit +
                    ';'
                  : ''
              }
              ${
                direction.medium === 'column' && isReversed.medium !== true
                  ? 'margin-bottom: ' +
                    mediaGap.medium.value +
                    mediaGap.medium.unit +
                    ';'
                  : ''
              }
              ${
                direction.medium === 'column' && isReversed.medium === true
                  ? 'margin-top: ' +
                    mediaGap.medium.value +
                    mediaGap.medium.unit +
                    ';'
                  : ''
              }
            }`
          }
          ${
            contentGap.medium.value
              ? `.${defaultClassName}.content-gap-${
                  contentGap.medium.value +
                  (contentGap.medium.unit === '%'
                    ? 'pct'
                    : contentGap.medium.unit)
                }--md .${defaultClassName}__content > * {
              ${
                'margin-top: ' +
                contentGap.medium.value / 2 +
                contentGap.medium.unit +
                ';'
              }
              ${
                'margin-bottom: ' +
                contentGap.medium.value / 2 +
                contentGap.medium.unit +
                ';'
              }
            }`
              : ''
          }
          ${
            mediaWidth.medium.value
              ? `.${defaultClassName}.media-width-${
                  mediaWidth.medium.value +
                  (mediaWidth.medium.unit === '%'
                    ? 'pct'
                    : mediaWidth.medium.unit)
                }--md .${defaultClassName}__media {
              width: ${mediaWidth.medium.value + mediaWidth.medium.unit};
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
                }--md .${defaultClassName}__media {
              height: ${mediaHeight.medium.value + mediaHeight.medium.unit};
            }`
              : ''
          }
          ${
            mediaBorderRadius.medium.value
              ? `.${defaultClassName} .${defaultClassName}__media {
              border-radius: ${
                mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit
              };
            }`
              : ''
          }
          }`}

        {(!!textAlignment.large ||
          !!mediaGap.large.value ||
          !!contentGap.large.value ||
          !!mediaWidth.large.value ||
          !!mediaHeight.large.value ||
          !!mediaBorderRadius.large.value) &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.largeBreakpointValue
          }px) {
          ${
            !!textAlignment.large &&
            `.${defaultClassName}.text-align-${
              textAlignment.large
            }--lg .${defaultClassName}__media {
              ${
                'margin-left: ' +
                (textAlignment.large === 'left' ? '0' : 'auto') +
                ';'
              }
              ${
                'margin-right: ' +
                (textAlignment.large === 'right' ? '0' : 'auto') +
                ';'
              }
            }`
          }
          ${
            mediaGap.large.value
              ? `.${defaultClassName}.media-gap-${
                  mediaGap.large.value +
                  (mediaGap.large.unit === '%' ? 'pct' : mediaGap.large.unit)
                }--lg.direction-${direction.large === 'row' ? 'h' : 'v'}--lg${
                  isReversed.large ? '.is-reversed--lg' : ''
                } .${defaultClassName}__media {
              ${
                direction.large === 'row' && isReversed.large !== true
                  ? 'margin-right: ' +
                    mediaGap.large.value +
                    mediaGap.large.unit +
                    ';'
                  : ''
              }
              ${
                direction.large === 'row' && isReversed.large === true
                  ? 'margin-left: ' +
                    mediaGap.large.value +
                    mediaGap.large.unit +
                    ';'
                  : ''
              }
              ${
                direction.large === 'column' && isReversed.large !== true
                  ? 'margin-bottom: ' +
                    mediaGap.large.value +
                    mediaGap.large.unit +
                    ';'
                  : ''
              }
              ${
                direction.large === 'column' && isReversed.large === true
                  ? 'margin-top: ' +
                    mediaGap.large.value +
                    mediaGap.large.unit +
                    ';'
                  : ''
              }
            }`
              : ''
          }
          ${
            contentGap.large.value
              ? `.${defaultClassName}.content-gap-${
                  contentGap.large.value +
                  (contentGap.large.unit === '%'
                    ? 'pct'
                    : contentGap.large.unit)
                }--lg .${defaultClassName}__content > * {
              ${
                'margin-top: ' +
                contentGap.large.value / 2 +
                contentGap.large.unit +
                ';'
              }
              ${
                'margin-bottom: ' +
                contentGap.large.value / 2 +
                contentGap.large.unit +
                ';'
              }
            }`
              : ''
          }
          ${
            mediaWidth.large.value
              ? `.${defaultClassName}.media-width-${
                  mediaWidth.large.value +
                  (mediaWidth.large.unit === '%'
                    ? 'pct'
                    : mediaWidth.large.unit)
                }--lg .${defaultClassName}__media {
              width: ${mediaWidth.large.value + mediaWidth.large.unit};
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
                }--lg .${defaultClassName}__media {
              height: ${mediaHeight.large.value + mediaHeight.large.unit};
            }`
              : ''
          }
          ${
            mediaBorderRadius.large.value
              ? `.${defaultClassName} .${defaultClassName}__media {
              border-radius: ${
                mediaBorderRadius.large.value + mediaBorderRadius.large.unit
              };
            }`
              : ''
          }
          }`}
      </style>

      <div className={`${defaultClassName}__inner`}>
        {!!mediaId && (
          <figure className={`${defaultClassName}__media`} style={mediaStyles}>
            <img
              className={`${defaultClassName}__image`}
              src={mediaUrl}
              alt={mediaAlt}
            />
          </figure>
        )}
        <div className={`${defaultClassName}__content`}>
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  )
}

export default ProfileSave
