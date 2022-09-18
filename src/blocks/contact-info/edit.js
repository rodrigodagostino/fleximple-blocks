/**
 * External dependencies
 */
import memoize from 'memize'
import times from 'lodash/times'

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
import {
  BaseControl,
  PanelBody,
  RangeControl,
  RadioControl,
} from '@wordpress/components'
import { compose } from '@wordpress/compose'
import { useEffect } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControl from 'fleximple-components/components/spacing-control'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = ['fleximple-blocks/contact-info-item']
const getContactInfoTemplate = memoize((items) => {
  return times(items, () => ['fleximple-blocks/contact-info-item'])
})

function ContactInfoEdit({
  attributes,
  attributes: { blockId, items, direction, alignmentHorizontal, gap },
  setAttributes,
  clientId,
  instanceId,
}) {
  useEffect(() => {
    setAttributes({ blockId: clientId })
  }, [clientId])

  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps({
    className: defaultClassName,
  })

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <RangeControl
            label={__('Items', 'fleximpleblocks')}
            min={1}
            max={10}
            value={items}
            onChange={(value) => setAttributes({ items: value })}
          />

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

                <BaseControl
                  label={__('Horizontal alignment', 'fleximpleblocks')}
                  id={`fleximple-blocks-row-horizontal-block-align-toolbar-${instanceId}`}
                >
                  <BlockAlignmentHorizontalToolbar
                    id={`fleximple-blocks-row-horizontal-block-align-toolbar-${instanceId}`}
                    value={alignmentHorizontal[tab.name]}
                    spaceControlsEnabled={
                      direction[tab.name] === '' ? true : false
                    }
                    onChange={(value) => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'alignmentHorizontal',
                        tab.name,
                        value
                      )
                    }}
                  />
                </BaseControl>

                <SpacingControl
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

      <div {...blockProps} data-block-id={blockId}>
        <InnerBlocks
          template={getContactInfoTemplate(items)}
          templateLock="insert"
          allowedBlocks={ALLOWED_BLOCKS}
          orientation="horizontal"
        />

        <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
      </div>
    </>
  )
}

export default compose([
  withColors({ buttonPrevColor: 'color' }, { buttonNextColor: 'color' }),
])(ContactInfoEdit)
