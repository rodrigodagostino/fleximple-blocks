/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function ContactInfoSave({
  attributes: { direction, alignmentHorizontal, gap },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classNames(defaultClassName, {
    [`direction-${direction.small === 'row' ? 'h' : 'v'}--sm`]: direction.small,
    [`direction-${direction.medium === 'row' ? 'h' : 'v'}--md`]:
      direction.medium && direction.medium !== direction.small,
    [`direction-${direction.large === 'row' ? 'h' : 'v'}--lg`]:
      direction.large && direction.large !== direction.medium,
    [`block-align-h-${alignmentHorizontal.small}--sm`]:
      alignmentHorizontal.small,
    [`block-align-h-${alignmentHorizontal.medium}--md`]:
      alignmentHorizontal.medium &&
      alignmentHorizontal.medium !== alignmentHorizontal.small,
    [`block-align-h-${alignmentHorizontal.large}--lg`]:
      alignmentHorizontal.large &&
      alignmentHorizontal.large !== alignmentHorizontal.medium,
    [`gap-h-${
      gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)
    }--sm`]: direction.small === 'row',
    [`gap-h-${
      gap.medium.value + (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
    }--md`]: direction.medium === 'row',
    [`gap-h-${
      gap.large.value + (gap.large.unit === '%' ? 'pct' : gap.large.unit)
    }--lg`]: direction.large === 'row',
    [`gap-v-${
      gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)
    }--sm`]: direction.small === 'column',
    [`gap-v-${
      gap.medium.value + (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
    }--md`]: direction.medium === 'column',
    [`gap-v-${
      gap.large.value + (gap.large.unit === '%' ? 'pct' : gap.large.unit)
    }--lg`]: direction.large === 'column',
  })

  const blockProps = useBlockProps.save({
    className: classes,
  })

  return (
    <div {...blockProps}>
      <style>
        {direction.small &&
          `.${defaultClassName}.direction-${
            direction.small === 'row' ? 'h' : 'v'
          }--sm {
            flex-direction: ${direction.small};
          }`}
        {direction.small === 'row' &&
          `.${defaultClassName}.gap-h-${
            gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)
          }--sm > *:not(style) + * {
            ${'margin: 0 0 0 ' + gap.small.value + gap.small.unit + ';'}
          }
          .${defaultClassName}.block-align-h-${alignmentHorizontal.small}--sm {
            justify-content: ${alignmentHorizontal.small};
          }`}
        {direction.small === 'column' &&
          `.${defaultClassName}.gap-v-${
            gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)
          }--sm > *:not(style) + * {
            ${'margin: ' + gap.small.value + gap.small.unit + ' 0 0;'}
          }
          .${defaultClassName}.block-align-h-${alignmentHorizontal.small}--sm {
            align-items: ${alignmentHorizontal.small};
          }`}

        {!!direction.medium &&
          direction.medium !== direction.small &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.mediumBreakpointValue
          }px) {
            .${defaultClassName}.direction-${
            direction.medium === 'row' ? 'h' : 'v'
          }--md {
              flex-direction: ${direction.medium};
            }
            ${
              direction.medium === 'row'
                ? `
              .${defaultClassName}.gap-h-${
                    gap.medium.value +
                    (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
                  }--lg > *:not(style) + * {
                ${'margin: 0 0 0 ' + gap.medium.value + gap.medium.unit + ';'}
              }
              .${defaultClassName}.block-align-h-${
                    alignmentHorizontal.medium
                  }--sm {
                justify-content: ${alignmentHorizontal.medium};
              }`
                : ''
            }
            ${
              direction.medium === 'column'
                ? `
              .${defaultClassName}.gap-v-${
                    gap.medium.value +
                    (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
                  }--lg > *:not(style) + * {
                ${'margin: ' + gap.medium.value + gap.medium.unit + ' 0 0;'}
              }
              .${defaultClassName}.block-align-h-${
                    alignmentHorizontal.medium
                  }--md {
                align-items: ${alignmentHorizontal.medium};
              }`
                : ''
            }
          }`}

        {!!direction.large &&
          direction.large !== direction.medium &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.largeBreakpointValue
          }px) {
            .${defaultClassName}.direction-${
            direction.large === 'row' ? 'h' : 'v'
          }--lg {
              flex-direction: ${direction.large};
            }
            ${
              direction.large === 'row'
                ? `
              .${defaultClassName}.gap-h-${
                    gap.large.value +
                    (gap.large.unit === '%' ? 'pct' : gap.large.unit)
                  }--lg > *:not(style) + * {
                ${'margin: 0 0 0 ' + gap.large.value + gap.large.unit + ';'}
                }
                .${defaultClassName}.block-align-h-${
                    alignmentHorizontal.large
                  }--lg {
                  justify-content: ${alignmentHorizontal.large};
                }`
                : ''
            }
            ${
              direction.large === 'column'
                ? `
              .${defaultClassName}.gap-v-${
                    gap.large.value +
                    (gap.large.unit === '%' ? 'pct' : gap.large.unit)
                  }--lg > *:not(style) + * {
                ${'margin: ' + gap.large.value + gap.large.unit + ' 0 0;'}
              }
              .${defaultClassName}.block-align-h-${
                    alignmentHorizontal.large
                  }--lg {
                align-items: ${
                  alignmentHorizontal.large === 'start'
                    ? 'flex-start'
                    : alignmentHorizontal.large === 'end'
                    ? 'flex-end'
                    : alignmentHorizontal.large
                };
              }`
                : ''
            }
          }`}
      </style>

      <InnerBlocks.Content />
    </div>
  )
}

export default ContactInfoSave
