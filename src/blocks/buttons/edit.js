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

const ALLOWED_BLOCKS = ['fleximple-blocks/button']
const TEMPLATE = [['fleximple-blocks/button'], ['fleximple-blocks/button']]

function ButtonsEdit({
  attributes,
  attributes: { blockId, direction, alignmentHorizontal, gap },
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
          allowedBlocks={ALLOWED_BLOCKS}
        />

        <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
      </div>
    </>
  )
}

export default withInstanceId(ButtonsEdit)
