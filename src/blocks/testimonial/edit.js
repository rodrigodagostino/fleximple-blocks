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
  AlignmentToolbar,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
  RichText,
  withColors,
} from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { BaseControl, Button, PanelBody } from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { Component } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import IconPicker from 'fleximple-components/components/icon-picker'
import SpacingControl from 'fleximple-components/components/spacing-control'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import TestimonialSortableControl from './components/testimonial-sortable-control'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

class TestimonialEdit extends Component {
  constructor() {
    super(...arguments)

    this.state = {}
  }

  render() {
    const {
      className,
      attributes,
      attributes: {
        iconId,
        iconSize,
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
      iconColor,
      setIconColor,
      setAttributes,
      instanceId,
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

    const iconClasses = classNames(`${defaultClassName}__icon`, iconId, {
      'has-text-color': iconColor.color,
      [iconColor.class]: iconColor.class,
    })

    const iconStyles = {
      fontSize: iconSize,
      width: iconSize,
      color: iconColor.color,
    }

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Main', 'fleximpleblocks')}>
            <ResponsiveSettingsTabPanel initialTabName="small">
              {(tab) => (
                <>
                  <BaseControl
                    label={__('Text alignment', 'fleximpleblocks')}
                    id={`fleximple-blocks-testimonialblock-align-toolbar-${instanceId}`}
                  >
                    <AlignmentToolbar
                      id={`fleximple-blocks-testimonialblock-align-toolbar-${instanceId}`}
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

          {!!mediaId && (
            <PanelBody
              title={__('Media', 'fleximpleblocks')}
              initialOpen={false}
            >
              <ResponsiveSettingsTabPanel initialTabName="small">
                {(tab) => (
                  <>
                    <SpacingControl
                      valueLabel={__('Media height', 'fleximpleblocks')}
                      unitLabel={__('Media height unit', 'fleximpleblocks')}
                      initialPosition={200}
                      min={0}
                      max={800}
                      attribute={mediaHeight}
                      target={tab.name}
                      onChange={(value) =>
                        setAttributes({ mediaHeight: value })
                      }
                    />

                    <SpacingControl
                      valueLabel={__('Border radius', 'fleximpleblocks')}
                      unitLabel={__('Border radius unit', 'fleximpleblocks')}
                      initialPosition={100}
                      min={0}
                      max={200}
                      attribute={mediaBorderRadius}
                      target={tab.name}
                      onChange={(value) =>
                        setAttributes({ mediaBorderRadius: value })
                      }
                    />
                  </>
                )}
              </ResponsiveSettingsTabPanel>
            </PanelBody>
          )}

          <PanelBody title={__('Icon', 'fleximpleblocks')} initialOpen={false}>
            <IconPicker
              icons={[
                {
                  label: __('Icon', 'fleximpleblocks'),
                  value: iconId,
                  onChange: (value) => setAttributes({ iconId: value }),
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

          <PanelBody
            title={__('Display', 'fleximpleblocks')}
            initialOpen={false}
          >
            <TestimonialSortableControl {...{ attributes, setAttributes }} />
          </PanelBody>
        </InspectorControls>

        <div className={classes}>
          <style>
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
								border-radius: ${mediaBorderRadius.small.value + mediaBorderRadius.small.unit};
							}`
              : ''}

            {(!!gap.medium.value ||
              !!mediaHeight.medium.value ||
              !!mediaBorderRadius.medium.value) &&
              `@media only screen and (min-width: ${
                fleximpleblocksPluginData.settings.mediumBreakpointValue
              }px) {
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
                    mediaBorderRadius.medium.value +
                    mediaBorderRadius.medium.unit
                  };
								}`
                  : ''
              }
							}`}

            {(!!gap.large.value ||
              !!mediaHeight.large.value ||
              !!mediaBorderRadius.large.value) &&
              `@media only screen and (min-width: ${
                fleximpleblocksPluginData.settings.largeBreakpointValue
              }px) {
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
									border-radius: ${mediaBorderRadius.large.value + mediaBorderRadius.large.unit};
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
                if (displayQuote) {
                  return (
                    <RichText
                      identifier={quote}
                      tagName={'blockquote'}
                      className={`${defaultClassName}__quote`}
                      value={quote}
                      onChange={(value) => setAttributes({ quote: value })}
                      placeholder={__('Write quote…', 'fleximpleblocks')}
                      keepPlaceholderOnFocus
                    />
                  )
                }
              }

              if ('media' === fragment) {
                if (displayMedia) {
                  return (
                    <figure
                      className={
                        !mediaId
                          ? `${defaultClassName}__media fleximple-components__media-placeholder`
                          : `${defaultClassName}__media fleximple-components__media-placeholder is-active`
                      }
                    >
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(media) =>
                            setAttributes({
                              mediaId: media.id,
                              mediaUrl: media.url,
                              mediaAlt: media.alt,
                            })
                          }
                          allowedTypes={['image']}
                          value={mediaId}
                          render={({ open }) => (
                            <Button
                              isDefault
                              className={!mediaId ? 'button button-hero' : ''}
                              onClick={open}
                            >
                              {!mediaId ? (
                                __(
                                  'Choose testimonial image',
                                  'fleximpleblocks'
                                )
                              ) : (
                                <img
                                  className={`${defaultClassName}__image`}
                                  src={mediaUrl}
                                  alt={mediaAlt}
                                />
                              )}
                            </Button>
                          )}
                        />
                      </MediaUploadCheck>
                    </figure>
                  )
                }
              }

              if ('reference' === fragment) {
                if (displayReference) {
                  return (
                    <RichText
                      tagName={'p'}
                      className={`${defaultClassName}__reference`}
                      value={reference}
                      onChange={(value) => setAttributes({ reference: value })}
                      placeholder={__('Write reference…', 'fleximpleblocks')}
                      keepPlaceholderOnFocus
                    />
                  )
                }
              }
            })
          }
        </div>
      </>
    )
  }
}

export default compose([withColors({ iconColor: 'color' }), withInstanceId])(
  TestimonialEdit
)
