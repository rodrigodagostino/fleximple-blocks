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
import InlineStyles from './inline-styles'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import SpacingControl from 'fleximple-components/components/spacing-control'
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

  // prettier-ignore
  const classes = classNames(defaultClassName, {
    [`block-align-${contentAlignment.small}--sm`]: contentAlignment.small,
    [`block-align-${contentAlignment.medium}--md`]: contentAlignment.medium,
    [`block-align-${contentAlignment.large}--lg`]: contentAlignment.large,
    [`text-align-${textAlignment.small}--sm`]: textAlignment.small,
    [`text-align-${textAlignment.medium}--md`]: textAlignment.medium,
    [`text-align-${textAlignment.large}--lg`]: textAlignment.large,
    [`media-gap-${mediaGap.small.value + (mediaGap.small.unit === '%' ? 'pct' : mediaGap.small.unit)}--sm`]: mediaGap.small.value,
    [`media-gap-${mediaGap.medium.value + (mediaGap.medium.unit === '%' ? 'pct' : mediaGap.medium.unit)}--md`]: mediaGap.medium.value,
    [`media-gap-${mediaGap.large.value + (mediaGap.large.unit === '%' ? 'pct' : mediaGap.large.unit)}--lg`]: mediaGap.large.value,
    [`content-gap-${contentGap.small.value + (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)}--sm`]: contentGap.small.value >= 0,
    [`content-gap-${contentGap.medium.value + (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)}--md`]: contentGap.medium.value >= 0,
    [`content-gap-${contentGap.large.value + (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)}--lg`]: contentGap.large.value >= 0,
    [`direction-${direction.small}--sm`]: direction.small,
    [`direction-${direction.medium}--md`]: direction.medium,
    [`direction-${direction.large}--lg`]: direction.large,
    'direction-is-reversed--sm': isReversed.small,
    'direction-is-reversed--md': isReversed.medium,
    'direction-is-reversed--lg': isReversed.large,
    [`media-width-${mediaWidth.small.value + (mediaWidth.small.unit === '%' ? 'pct' : mediaWidth.small.unit)}--sm`]: mediaWidth.small.value,
    [`media-width-${mediaWidth.medium.value + (mediaWidth.medium.unit === '%' ? 'pct' : mediaWidth.medium.unit)}--md`]: mediaWidth.medium.value,
    [`media-width-${mediaWidth.large.value + (mediaWidth.large.unit === '%' ? 'pct' : mediaWidth.large.unit)}--lg`]: mediaWidth.large.value,
    [`media-height-${mediaHeight.small.value + (mediaHeight.small.unit === '%' ? 'pct' : mediaHeight.small.unit)}--sm`]: mediaHeight.small.value,
    [`media-height-${mediaHeight.medium.value + (mediaHeight.medium.unit === '%' ? 'pct' : mediaHeight.medium.unit)}--md`]: mediaHeight.medium.value,
    [`media-height-${mediaHeight.large.value + (mediaHeight.large.unit === '%' ? 'pct' : mediaHeight.large.unit)}--lg`]: mediaHeight.large.value,
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
                    controls={['start', 'center', 'end']}
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

                <SpacingControl
                  valueLabel={__('Media gap size', 'fleximpleblocks')}
                  unitLabel={__('Media gap size unit', 'fleximpleblocks')}
                  initialPosition={0}
                  min={0}
                  max={200}
                  attribute={mediaGap}
                  target={tab.name}
                  onChange={(value) => setAttributes({ mediaGap: value })}
                />

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
                  <SpacingControl
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

                  <SpacingControl
                    valueLabel={__('Media height', 'fleximpleblocks')}
                    unitLabel={__('Media height unit', 'fleximpleblocks')}
                    initialPosition={200}
                    min={0}
                    max={800}
                    attribute={mediaHeight}
                    target={tab.name}
                    onChange={(value) => setAttributes({ mediaHeight: value })}
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
          )}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
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

        <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
      </div>
    </>
  )
}

export default withInstanceId(ProfileEdit)
