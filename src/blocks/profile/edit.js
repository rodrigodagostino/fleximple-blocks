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
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  BaseControl,
  Button,
  PanelBody,
  RadioControl,
  ToggleControl,
} from '@wordpress/components'
import { withInstanceId } from '@wordpress/compose'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_MEDIA_TYPES = ['image', 'video']
const ALLOWED_BLOCKS = []
const TEMPLATE = [
  [
    'core/heading',
    {
      level: 3,
      placeholder: __('Write name…', 'fleximpleblocks'),
    },
  ],
  [
    'core/paragraph',
    {
      fontSize: 'medium',
      placeholder: __('Write title…', 'fleximpleblocks'),
    },
  ],
  [
    'core/paragraph',
    {
      placeholder: __('Write description…', 'fleximpleblocks'),
    },
  ],
  [
    'fleximple-blocks/buttons',
    {},
    [
      ['fleximple-blocks/button'],
      ['fleximple-blocks/button'],
      ['fleximple-blocks/button'],
    ],
  ],
]

function ProfileEdit({
  attributes,
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
  setAttributes,
  instanceId,
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classNames({
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
    }--sm`]: contentGap.small.value >= 0,
    [`content-gap-${
      contentGap.medium.value +
      (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)
    }--md`]: contentGap.medium.value >= 0,
    [`content-gap-${
      contentGap.large.value +
      (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)
    }--lg`]: contentGap.large.value >= 0,
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

  const blockProps = useBlockProps({
    className: classes,
  })

  const mediaClasses = classNames('fleximple-components__media-placeholder', {
    [`${defaultClassName}__media`]: mediaId,
    'is-active': mediaId,
  })

  const mediaStyles = {
    backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <ResponsiveSettingsTabPanel initialTabName="small">
            {(tab) => (
              <>
                <BaseControl
                  label={__('Horizontal alignment', 'fleximpleblocks')}
                  id={`fleximple-blocks-profile-horizontal-block-align-control-${instanceId}`}
                >
                  <BlockAlignmentHorizontalToolbar
                    id={`fleximple-blocks-profile-horizontal-block-align-control-${instanceId}`}
                    value={contentAlignment[tab.name]}
                    onChange={(value) => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'contentAlignment',
                        tab.name,
                        value
                      )
                    }}
                    controls={['left', 'center', 'right']}
                  />
                </BaseControl>

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

                <SpacingControls
                  valueLabel={__('Media gap size', 'fleximpleblocks')}
                  unitLabel={__('Media gap size unit', 'fleximpleblocks')}
                  initialPosition={0}
                  min={0}
                  max={200}
                  attribute={mediaGap}
                  target={tab.name}
                  onChange={(value) => setAttributes({ mediaGap: value })}
                />

                <SpacingControls
                  valueLabel={__('Content gap size', 'fleximpleblocks')}
                  unitLabel={__('Content gap size unit', 'fleximpleblocks')}
                  initialPosition={0}
                  min={0}
                  max={200}
                  attribute={contentGap}
                  target={tab.name}
                  onChange={(value) => setAttributes({ contentGap: value })}
                />

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

                <ToggleControl
                  label={__('Reverse order', 'fleximpleblocks')}
                  checked={isReversed[tab.name]}
                  onChange={() => {
                    setResponsiveAttribute(
                      attributes,
                      setAttributes,
                      'isReversed',
                      tab.name,
                      !isReversed[tab.name]
                    )
                    if (
                      direction[tab.name] === 'row' &&
                      !!isReversed[tab.name]
                    ) {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'textAlignment',
                        tab.name,
                        'left'
                      )
                    } else if (
                      direction[tab.name] === 'row' &&
                      !isReversed[tab.name]
                    ) {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'textAlignment',
                        tab.name,
                        'right'
                      )
                    } else {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'textAlignment',
                        tab.name,
                        'center'
                      )
                    }
                  }}
                />
              </>
            )}
          </ResponsiveSettingsTabPanel>
        </PanelBody>

        <PanelBody title={__('Media', 'fleximpleblocks')} initialOpen={false}>
          <BaseControl
            label={__('Image', 'fleximpleblocks')}
            id={`fleximple-blocks-container-media-control-${instanceId}`}
          >
            <MediaUploadCheck>
              <MediaUpload
                id={`fleximple-blocks-container-media-control-${instanceId}`}
                onSelect={(media) =>
                  setAttributes({ mediaId: media.id, mediaUrl: media.url })
                }
                allowedTypes={ALLOWED_MEDIA_TYPES}
                value={mediaId}
                render={({ open }) => (
                  <>
                    {!!mediaId && (
                      <Button
                        className="button fleximple-components-button-image width-full"
                        onClick={open}
                      >
                        <img
                          src={mediaUrl}
                          style={{ verticalAlign: 'middle' }}
                          alt={__('Replace image', 'fleximpleblocks')}
                        />
                      </Button>
                    )}

                    <Button
                      className="button button-large is-button is-default is-large width-full"
                      style={{ marginTop: '10px' }}
                      onClick={open}
                    >
                      {!mediaId
                        ? __('Choose profile image', 'fleximpleblocks')
                        : __('Replace image', 'fleximpleblocks')}
                    </Button>

                    {!!mediaId && (
                      <Button
                        className="button button-link-delete width-full is-button is-large"
                        style={{ marginTop: '10px' }}
                        isDestructive
                        onClick={() =>
                          setAttributes({ mediaId: null, mediaUrl: null })
                        }
                      >
                        {__('Remove image', 'fleximpleblocks')}
                      </Button>
                    )}
                  </>
                )}
              />
            </MediaUploadCheck>
          </BaseControl>

          {!!mediaId && (
            <ResponsiveSettingsTabPanel initialTabName="small">
              {(tab) => (
                <>
                  <SpacingControls
                    valueLabel={__('Media width', 'fleximpleblocks')}
                    unitLabel={__('Media width unit', 'fleximpleblocks')}
                    className="gap-v-small"
                    initialPosition={200}
                    min={0}
                    max={800}
                    attribute={mediaWidth}
                    target={tab.name}
                    onChange={(value) => setAttributes({ mediaWidth: value })}
                  />

                  <SpacingControls
                    valueLabel={__('Media height', 'fleximpleblocks')}
                    unitLabel={__('Media height unit', 'fleximpleblocks')}
                    initialPosition={200}
                    min={0}
                    max={800}
                    attribute={mediaHeight}
                    target={tab.name}
                    onChange={(value) => setAttributes({ mediaHeight: value })}
                  />

                  <SpacingControls
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
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <style>
          {`.${defaultClassName}.text-align-${
            textAlignment.small
          }--sm .fleximple-components__media-placeholder {
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
            }
            .${defaultClassName}.media-gap-${
            mediaGap.small.value +
            (mediaGap.small.unit === '%' ? 'pct' : mediaGap.small.unit)
          }--sm.direction-${direction.small === 'row' ? 'h' : 'v'}--sm${
            isReversed.small ? '.is-reversed--sm' : ''
          } .${defaultClassName}__media,
            .${defaultClassName}.media-gap-${
            mediaGap.small.value +
            (mediaGap.small.unit === '%' ? 'pct' : mediaGap.small.unit)
          }--sm.direction-${direction.small === 'row' ? 'h' : 'v'}--sm${
            isReversed.small ? '.is-reversed--sm' : ''
          } .fleximple-components__media-placeholder {
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
            }
            .${defaultClassName}.content-gap-${
            contentGap.small.value +
            (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)
          }--sm .${defaultClassName}__content > .block-editor-inner-blocks > .block-editor-block-list__layout > * {
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
            }
            .${defaultClassName}.media-width-${
            mediaWidth.small.value +
            (mediaWidth.small.unit === '%' ? 'pct' : mediaWidth.small.unit)
          }--sm .${defaultClassName}__media {
              width: ${mediaWidth.small.value + mediaWidth.small.unit};
            }
            .${defaultClassName}.media-height-${
            mediaHeight.small.value +
            (mediaHeight.small.unit === '%' ? 'pct' : mediaHeight.small.unit)
          }--sm .${defaultClassName}__media {
              height: ${mediaHeight.small.value + mediaHeight.small.unit};
            }
            .${defaultClassName} .${defaultClassName}__media {
              border-radius: ${
                mediaBorderRadius.small.value + mediaBorderRadius.small.unit
              };
            }
            .${defaultClassName} .${defaultClassName}__media.is-active .components-button {
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
              textAlignment.medium
                ? `
              .${defaultClassName}.text-align-${
                    textAlignment.medium
                  }--md .fleximple-components__media-placeholder {
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
                : ''
            }
            ${
              mediaGap.medium.value
                ? `
              .${defaultClassName}.media-gap-${
                    mediaGap.medium.value +
                    (mediaGap.medium.unit === '%'
                      ? 'pct'
                      : mediaGap.medium.unit)
                  }--md.direction-${
                    direction.medium === 'row' ? 'h' : 'v'
                  }--md${
                    isReversed.medium ? '.is-reversed--md' : ''
                  } .${defaultClassName}__media,
              .${defaultClassName}.media-gap-${
                    mediaGap.medium.value +
                    (mediaGap.medium.unit === '%'
                      ? 'pct'
                      : mediaGap.medium.unit)
                  }--md.direction-${
                    direction.medium === 'row' ? 'h' : 'v'
                  }--md${
                    isReversed.medium ? '.is-reversed--md' : ''
                  } .fleximple-components__media-placeholder {
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
                : ''
            }
            ${
              contentGap.medium.value
                ? `
              .${defaultClassName}.content-gap-${
                    contentGap.medium.value +
                    (contentGap.medium.unit === '%'
                      ? 'pct'
                      : contentGap.medium.unit)
                  }--md .${defaultClassName}__content > .block-editor-inner-blocks > .block-editor-block-list__layout > * {
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
                ? `
              .${defaultClassName}.media-width-${
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
                ? `
              .${defaultClassName}.media-height-${
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
                ? `
              .${defaultClassName} .${defaultClassName}__media {
                border-radius: ${
                  mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit
                };
              }
              .${defaultClassName} .${defaultClassName}__media.is-active .components-button {
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
              textAlignment.large
                ? `
              .${defaultClassName}.text-align-${
                    textAlignment.large
                  }--lg .fleximple-components__media-placeholder {
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
                : ''
            }
            ${
              mediaGap.large.value
                ? `
              .${defaultClassName}.media-gap-${
                    mediaGap.large.value +
                    (mediaGap.large.unit === '%' ? 'pct' : mediaGap.large.unit)
                  }--lg.direction-${direction.large === 'row' ? 'h' : 'v'}--lg${
                    isReversed.large ? '.is-reversed--lg' : ''
                  } .${defaultClassName}__media,
              .${defaultClassName}.media-gap-${
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
                ? `
              .${defaultClassName}.content-gap-${
                    contentGap.large.value +
                    (contentGap.large.unit === '%'
                      ? 'pct'
                      : contentGap.large.unit)
                  }--lg .${defaultClassName}__content > .block-editor-inner-blocks > .block-editor-block-list__layout > * {
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
                ? `
              .${defaultClassName}.media-width-${
                    mediaWidth.large.value +
                    (mediaWidth.large.unit === '%'
                      ? 'pct'
                      : mediaWidth.large.unit)
                  }--md .${defaultClassName}__media {
                width: ${mediaWidth.large.value + mediaWidth.large.unit};
              }`
                : ''
            }
            ${
              mediaHeight.large.value
                ? `
              .${defaultClassName}.media-height-${
                    mediaHeight.large.value +
                    (mediaHeight.large.unit === '%'
                      ? 'pct'
                      : mediaHeight.large.unit)
                  }--md .${defaultClassName}__media {
                height: ${mediaHeight.large.value + mediaHeight.large.unit};
              }`
                : ''
            }
            ${
              mediaBorderRadius.large.value
                ? `
              .${defaultClassName} .${defaultClassName}__media {
                border-radius: ${
                  mediaBorderRadius.large.value + mediaBorderRadius.large.unit
                };
              }
              .${defaultClassName} .${defaultClassName}__media.is-active .components-button {
                border-radius: ${
                  mediaBorderRadius.large.value + mediaBorderRadius.large.unit
                };
              }`
                : ''
            }
            }`}
        </style>

        <div className={`${defaultClassName}__inner`}>
          <figure className={mediaClasses} style={mediaStyles}>
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
                    className={!mediaId ? 'button button-hero' : ''}
                    onClick={open}
                  >
                    {!mediaId ? (
                      __('Choose profile image', 'fleximpleblocks')
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

          <div className={`${defaultClassName}__content`}>
            <InnerBlocks
              template={TEMPLATE}
              templateLock={false}
              templateInsertUpdatesSelection={false}
              allowedBlocks={ALLOWED_BLOCKS}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default withInstanceId(ProfileEdit)
