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
  BlockControls,
  InspectorControls,
  PanelColorSettings,
  useBlockProps,
  withColors,
} from '@wordpress/block-editor'
import {
  PanelBody,
  TextareaControl,
  ToggleControl,
} from '@wordpress/components'
import { compose } from '@wordpress/compose'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import IconPicker from 'fleximple-components/components/icon-picker'

const { name } = metadata

function IconEdit({
  attributes: {
    iconData,
    iconSize,
    hasCustomIcon,
    customIcon,
    alignmentHorizontal,
  },
  setAttributes,
  iconColor,
  setIconColor,
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classNames(defaultClassName, {
    [`${defaultClassName}--custom`]: hasCustomIcon,
    'has-text-color': iconColor.color,
    [`text-align-${alignmentHorizontal}`]: alignmentHorizontal,
  })

  const blockProps = useBlockProps({
    className: classes,
  })

  const iconClasses = classNames(iconData.value, {
    [iconColor.class]: iconColor.class,
  })

  const iconStyles = {
    fontSize: `${iconSize}px`,
    color: iconColor.color,
    height: hasCustomIcon ? iconSize : undefined,
  }

  return (
    <>
      <BlockControls>
        <BlockAlignmentHorizontalToolbar
          value={alignmentHorizontal}
          onChange={(value) => setAttributes({ alignmentHorizontal: value })}
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <IconPicker
            icons={[
              {
                label: __('Icon', 'fleximpleblocks'),
                value: iconData,
                onChange: (option) => setAttributes({ iconData: option }),
              },
            ]}
            sizes={[
              {
                label: __('Icon size', 'fleximpleblocks'),
                value: iconSize,
                initialPosition: 60,
                min: 10,
                max: 120,
                onChange: (value) => setAttributes({ iconSize: value }),
              },
            ]}
          />

          <ToggleControl
            label={__('Use custom icon', 'fleximpleblocks')}
            checked={hasCustomIcon}
            onChange={() => setAttributes({ hasCustomIcon: !hasCustomIcon })}
          />

          {!!hasCustomIcon && (
            <TextareaControl
              label={__('Custom Icon', 'fleximpleblocks')}
              style={{ fontFamily: 'monospace' }}
              placeholder={__(
                'Paste the code for your custom icon in here…',
                'fleximpleblocks'
              )}
              value={customIcon}
              onChange={(value) => setAttributes({ customIcon: value })}
            />
          )}
        </PanelBody>

        <PanelColorSettings
          title={__('Color', 'fleximpleblocks')}
          colorSettings={[
            {
              label: __('Icon'),
              value: iconColor.color,
              onChange: setIconColor,
            },
          ]}
          initialOpen={false}
        ></PanelColorSettings>
      </InspectorControls>

      {!!iconData?.value && !hasCustomIcon && (
        <div {...blockProps}>
          <i className={iconClasses} style={iconStyles} />
        </div>
      )}

      {!!hasCustomIcon && <RawHTML {...blockProps}>{customIcon}</RawHTML>}
    </>
  )
}

export default compose([withColors({ iconColor: 'color' })])(IconEdit)
