/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  AlignmentToolbar,
  InnerBlocks,
  InspectorControls,
  withColors,
} from '@wordpress/block-editor'
import { BaseControl, PanelBody } from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControl from 'fleximple-components/components/spacing-control'
import { setResponsiveAttribute } from './../../js/utils'
import InlineStyles from './inline-styles'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = []
const TEMPLATE = [
  ['fleximple-blocks/icon'],
  ['core/heading', { level: 3 }],
  ['core/paragraph', { placeholder: 'Write the description of your feature…' }],
  ['fleximple-blocks/button'],
]

const FeatureEdit = ({
  attributes,
  attributes: { textAlignment, contentGap },
  instanceId,
  setAttributes,
}) => {
  const defaultClassName = getBlockDefaultClassName(name)

  // prettier-ignore
  const classes = classNames(defaultClassName, {
    [`text-align-${textAlignment.small}--sm`]: textAlignment.small,
    [`text-align-${textAlignment.medium}--md`]: textAlignment.medium,
    [`text-align-${textAlignment.large}--lg`]: textAlignment.large,
    [`content-gap-${contentGap.small.value + (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)}--sm`]: contentGap.small.value,
    [`content-gap-${contentGap.medium.value + (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)}--md`]: contentGap.medium.value,
    [`content-gap-${contentGap.large.value + (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)}--lg`]: contentGap.large.value,
  })

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <ResponsiveSettingsTabPanel initialTabName="small">
            {(tab) => (
              <>
                <BaseControl
                  label={__('Text alignment', 'fleximpleblocks')}
                  id={`fleximple-blocks-profile-text-alignment-control-${instanceId}`}
                >
                  <AlignmentToolbar
                    id={`fleximple-blocks-profile-text-alignment-control-${instanceId}`}
                    value={textAlignment[tab.name]}
                    onChange={(value) => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'textAlignment',
                        tab.name,
                        value
                      )
                    }}
                    isCollapsed={false}
                  />
                </BaseControl>

                <SpacingControl
                  valueLabel={__('Content gap size', 'fleximpleblocks')}
                  unitLabel={__('Content gap size unit', 'fleximpleblocks')}
                  initialPosition={0}
                  min={0}
                  max={200}
                  attribute={contentGap}
                  target={tab.name}
                  onChange={(value) => setAttributes({ contentGap: value })}
                />
              </>
            )}
          </ResponsiveSettingsTabPanel>
        </PanelBody>
      </InspectorControls>

      <div className={classes}>
        <div className={`${defaultClassName}__inner`}>
          <InnerBlocks
            template={TEMPLATE}
            templateLock={false}
            allowedBlocks={ALLOWED_BLOCKS}
          />
        </div>

        <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
      </div>
    </>
  )
}

export default compose([
  withColors({ iconColor: 'color' }),
  withSelect((select, ownProps) => {
    const { clientId } = ownProps
    const { getBlock } = select('core/block-editor')
    return {
      block: getBlock(clientId),
    }
  }),
  withInstanceId,
])(FeatureEdit)
