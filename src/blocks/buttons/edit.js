/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { BaseControl, PanelBody, RadioControl } from '@wordpress/components'
import { withInstanceId } from '@wordpress/compose'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

const ALLOWED_BLOCKS = ['fleximple-blocks/button']
const TEMPLATE = [['fleximple-blocks/button'], ['fleximple-blocks/button']]

function ButtonsEdit({
  attributes,
  attributes: { direction, alignmentHorizontal, gap },
  setAttributes,
  instanceId,
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classnames({
    [`direction-${direction.small === 'row' ? 'h' : 'v'}--sm`]: direction.small,
    [`direction-${direction.medium === 'row' ? 'h' : 'v'}--md`]:
      direction.medium,
    [`direction-${direction.large === 'row' ? 'h' : 'v'}--lg`]: direction.large,
    [`block-align-h-${alignmentHorizontal.small}--sm`]:
      alignmentHorizontal.small && direction.small === 'row',
    [`block-align-h-${alignmentHorizontal.medium}--md`]:
      alignmentHorizontal.medium && direction.medium === 'row',
    [`block-align-h-${alignmentHorizontal.large}--lg`]:
      alignmentHorizontal.large && direction.large === 'row',
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

                {direction[tab.name] === 'row' && (
                  <BaseControl
                    label={__('Horizontal alignment', 'fleximpleblocks')}
                    id={`fleximple-blocks-buttons-horizontal-block-align-toolbar-${instanceId}`}
                  >
                    <BlockAlignmentHorizontalToolbar
                      id={`fleximple-blocks-buttons-horizontal-block-align-toolbar-${instanceId}`}
                      value={alignmentHorizontal[tab.name]}
                      onChange={(value) => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'alignmentHorizontal',
                          tab.name,
                          value
                        )
                      }}
                      spaceControlsEnabled
                    />
                  </BaseControl>
                )}

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
          {direction.small === 'row' &&
            `.${defaultClassName}.gap-h-${
              gap.small.value +
              (gap.small.unit === '%' ? 'pct' : gap.small.unit)
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout > .fleximple-block-button + .fleximple-block-button {
							${'margin-left: ' + gap.small.value + gap.small.unit + ';'}
						}
						.${defaultClassName}.block-align-h-${
              alignmentHorizontal.small
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
							justify-content: ${alignmentHorizontal.small};
						}`}
          {direction.small === 'column' &&
            `.${defaultClassName}.gap-v-${
              gap.small.value +
              (gap.small.unit === '%' ? 'pct' : gap.small.unit)
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout > .fleximple-block-button + .fleximple-block-button {
							${'margin-top: ' + gap.small.value + gap.small.unit + ';'}
						}
						.${defaultClassName}.block-align-h-${
              alignmentHorizontal.small
            }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
							align-items: ${alignmentHorizontal.small};
						}`}

          {!!direction.medium &&
            `@media only screen and (min-width: ${
              fleximpleblocksPluginData.settings.mediumBreakpointValue
            }px) {
							${
                direction.medium === 'row'
                  ? `
								.${defaultClassName}.gap-h-${
                      gap.medium.value +
                      (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > .fleximple-block-button + .fleximple-block-button {
									${'margin-left: ' + gap.medium.value + gap.medium.unit + ';'}
								}
								.${defaultClassName}.block-align-h-${
                      alignmentHorizontal.medium
                    }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
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
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > .fleximple-block-button + .fleximple-block-button {
									${'margin-top: ' + gap.medium.value + gap.medium.unit + ';'}
								}
								.${defaultClassName}.block-align-h-${
                      alignmentHorizontal.medium
                    }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
									align-items: ${alignmentHorizontal.medium};
								}`
                  : ''
              }
						}`}

          {!!direction.large &&
            `@media only screen and (min-width: ${
              fleximpleblocksPluginData.settings.largeBreakpointValue
            }px) {
							${
                direction.large === 'row'
                  ? `
								.${defaultClassName}.gap-h-${
                      gap.large.value +
                      (gap.large.unit === '%' ? 'pct' : gap.large.unit)
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > .fleximple-block-button + .fleximple-block-button {
									${'margin-left: ' + gap.large.value + gap.large.unit + ';'}
									}
									.${defaultClassName}.block-align-h-${
                      alignmentHorizontal.large
                    }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
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
                    }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > .fleximple-block-button + .fleximple-block-button {
									${'margin-top: ' + gap.large.value + gap.large.unit + ';'}
								}
								.${defaultClassName}.block-align-h-${
                      alignmentHorizontal.large
                    }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
									align-items: ${alignmentHorizontal.large};
								}`
                  : ''
              }
						}`}
        </style>

        <InnerBlocks
          template={TEMPLATE}
          templateLock={false}
          allowedBlocks={ALLOWED_BLOCKS}
        />
      </div>
    </>
  )
}

export default withInstanceId(ButtonsEdit)
