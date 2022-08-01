/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
  withColors,
} from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { PanelBody, RadioControl } from '@wordpress/components'
import { compose } from '@wordpress/compose'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import { setResponsiveAttribute } from '../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const TEMPLATE = [
  ['fleximple-blocks/icon', { iconSize: 24 }],
  ['core/paragraph', { placeholder: 'Write your contact info…' }],
]

function ContactInfoEdit({
  attributes,
  attributes: { direction, gap },
  setAttributes,
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classNames({
    [`direction-${direction.small === 'row' ? 'h' : 'v'}--sm`]: direction.small,
    [`direction-${direction.medium === 'row' ? 'h' : 'v'}--md`]:
      direction.medium && direction.medium !== direction.small,
    [`direction-${direction.large === 'row' ? 'h' : 'v'}--lg`]:
      direction.large && direction.large !== direction.medium,
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

  const blockProps = useBlockProps({
    className: classes,
  })

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <ResponsiveSettingsTabPanel initialTabName="small">
            {(tab) => (
              <>
                <RadioControl
                  label={__('Direction', 'fleximpleblocks')}
                  selected={direction[tab.name]}
                  options={[
                    {
                      label: __('Horizontal', 'fleximpleblocks'),
                      value: 'row',
                    },
                    {
                      label: __('Vertical', 'fleximpleblocks'),
                      value: 'column',
                    },
                  ]}
                  onChange={(option) => {
                    setResponsiveAttribute(
                      attributes,
                      setAttributes,
                      'direction',
                      tab.name,
                      option
                    )
                  }}
                />

                <SpacingControls
                  valueLabel={__('Gap size', 'fleximpleblocks')}
                  unitLabel={__('Gap size unit', 'fleximpleblocks')}
                  initialPosition={0}
                  min={0}
                  max={200}
                  attribute={gap}
                  target={tab.name}
                  onChange={(value) => setAttributes({ gap: value })}
                />
              </>
            )}
          </ResponsiveSettingsTabPanel>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <style>
          {direction.small &&
            `.${defaultClassName}.direction-${
              direction.small === 'row' ? 'h' : 'v'
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
							flex-direction: ${direction.small};
						}`}
          {direction.small === 'row' &&
            `.${defaultClassName}.gap-h-${
              gap.small.value +
              (gap.small.unit === '%' ? 'pct' : gap.small.unit)
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
							${'margin-left: ' + gap.small.value + gap.small.unit + ';'}
						}`}
          {direction.small === 'column' &&
            `.${defaultClassName}.gap-v-${
              gap.small.value +
              (gap.small.unit === '%' ? 'pct' : gap.small.unit)
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
							${'margin-top: ' + gap.small.value + gap.small.unit + ';'}
						}`}

          {!!direction.medium &&
            direction.medium !== direction.small &&
            `@media only screen and (min-width: ${
              fleximpleblocksPluginData.settings.mediumBreakpointValue
            }px) {
							.${defaultClassName}.direction-${
              direction.medium === 'row' ? 'h' : 'v'
            }--md > .block-editor-inner-blocks > .block-editor-block-list__layout {
								flex-direction: ${direction.medium};
							}
							${
                direction.medium === 'row'
                  ? `
								.${defaultClassName}.gap-h-${
                      gap.medium.value +
                      (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${'margin-left: ' + gap.medium.value + gap.medium.unit + ';'}
								}`
                  : ''
              }
							${
                direction.medium === 'column'
                  ? `
								.${defaultClassName}.gap-v-${
                      gap.medium.value +
                      (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${'margin-top: ' + gap.medium.value + gap.medium.unit + ';'}
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
            }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout {
								flex-direction: ${direction.large};
							}
							${
                direction.large === 'row'
                  ? `
								.${defaultClassName}.gap-h-${
                      gap.large.value +
                      (gap.large.unit === '%' ? 'pct' : gap.large.unit)
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${'margin-left: ' + gap.large.value + gap.large.unit + ';'}
								}`
                  : ''
              }
							${
                direction.large === 'column'
                  ? `
								.${defaultClassName}.gap-v-${
                      gap.large.value +
                      (gap.large.unit === '%' ? 'pct' : gap.large.unit)
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${'margin-top: ' + gap.large.value + gap.large.unit + ';'}
								}`
                  : ''
              }
						}`}
        </style>

        <InnerBlocks
          template={TEMPLATE}
          templateLock={false}
          orientation="horizontal"
        />
      </div>
    </>
  )
}

export default compose([
  withColors({ buttonPrevColor: 'color' }, { buttonNextColor: 'color' }),
])(ContactInfoEdit)
