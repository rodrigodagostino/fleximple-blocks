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
import { useEffect } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControl from 'fleximple-components/components/spacing-control'
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
  attributes: { blockId, direction, gap },
  setAttributes,
  clientId,
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
          template={TEMPLATE}
          templateLock={false}
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
