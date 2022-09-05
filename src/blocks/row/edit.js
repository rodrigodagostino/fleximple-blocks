/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import apiFetch from '@wordpress/api-fetch'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  ColorPalette,
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
  withColors,
} from '@wordpress/block-editor'
import {
  BaseControl,
  Button,
  FocalPointPicker,
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { useEffect, useState } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import BlockAlignmentVerticalToolbar from 'fleximple-components/components/block-alignment-vertical-toolbar'
import InputGroupControl from 'fleximple-components/components/field-group-control'
import SpacingPanel from 'fleximple-components/components/spacing-panel'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_MEDIA_TYPES = ['image', 'video']
const INNER_BLOCKS_TEMPLATE = [
  [
    'core/heading',
    {
      level: 2,
      textAlign: 'center',
      /* translators: content placeholder */
      placeholder: __('Write heading…', 'fleximpleblocks'),
    },
  ],
  [
    'core/paragraph',
    {
      align: 'center',
      /* translators: content placeholder */
      placeholder: __('Write content…', 'fleximpleblocks'),
    },
  ],
]

function RowEdit({
  attributes,
  attributes: {
    rowId,
    rowTag,
    blockId,
    alignmentHorizontal,
    alignmentVertical,
    mediaId,
    mediaUrl,
    mediaSize,
    focalPoint,
    backgroundSize,
    backgroundRepeat,
    backgroundFixed,
    overlayOpacity,
  },
  overlayColor,
  setOverlayColor,
  setAttributes,
  clientId,
  instanceId,
}) {
  const [mediaData, setMediaData] = useState()

  useEffect(() => {
    setAttributes({ blockId: clientId })
  }, [clientId])

  useEffect(() => {
    if (
      mediaId.small !== null ||
      mediaId.medium !== null ||
      mediaId.large !== null
    ) {
      fetchMediaData()
    }
  }, [])

  const fetchMediaData = async () => {
    const mediaIds = Object.entries(mediaId)
    await Promise.all(
      mediaIds.map((id) => {
        const [key, value] = id
        if (!value) return { [key]: null }
        return apiFetch({
          path: `/wp/v2/media/${value}`,
        }).then((response) => {
          return {
            [key]: {
              id: response.id,
              sizes: response.media_details.sizes,
              type: response.media_type,
              alt: response.alt_text,
            },
          }
        })
      })
    ).then((responses) => {
      setMediaData({
        ...responses['0'],
        ...responses['1'],
        ...responses['2'],
      })
    })
  }

  const RowTag = rowTag

  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps({
    id: rowId,
    className: defaultClassName,
  })

  const overlayClasses = classNames(`${defaultClassName}__overlay`, {
    'has-background': overlayColor.color && overlayOpacity,
    [overlayColor.class]: overlayColor.class && overlayOpacity,
    [`opacity-${overlayOpacity}`]: overlayOpacity,
  })

  const overlayStyles = {
    backgroundColor:
      overlayOpacity !== 0 &&
      overlayColor.color &&
      overlayColor.class === undefined
        ? overlayColor.color
        : undefined,
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <InputGroupControl
            label={__('Row ID', 'fleximpleblocks')}
            value={rowId}
            placeholder={__('Type the row ID…', 'fleximpleblocks')}
            prepend={true}
            prependText="#"
            onChange={(value) => setAttributes({ rowId: value })}
          />

          <SelectControl
            label={__('HTML Tag', 'fleximpleblocks')}
            labelPosition="top"
            value={rowTag}
            options={[
              { label: '<div>', value: 'div' },
              { label: '<section>', value: 'section' },
              { label: '<aside>', value: 'aside' },
              { label: '<header>', value: 'header' },
              { label: '<main>', value: 'main' },
              { label: '<footer>', value: 'footer' },
            ]}
            onChange={(value) => setAttributes({ rowTag: value })}
          />

          <ResponsiveSettingsTabPanel initialTabName="small">
            {(tab) => (
              <>
                <BaseControl
                  label={__('Horizontal alignment', 'fleximpleblocks')}
                  id={`fleximple-blocks-row-horizontal-block-align-toolbar-${instanceId}`}
                >
                  <BlockAlignmentHorizontalToolbar
                    id={`fleximple-blocks-row-horizontal-block-align-toolbar-${instanceId}`}
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
                  />
                </BaseControl>

                <BaseControl
                  label={__('Vertical alignment', 'fleximpleblocks')}
                  id={`fleximple-blocks-row-vertical-block-align-toolbar-${instanceId}`}
                >
                  <BlockAlignmentVerticalToolbar
                    id={`fleximple-blocks-row-vertical-block-align-toolbar-${instanceId}`}
                    value={alignmentVertical[tab.name]}
                    onChange={(value) => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'alignmentVertical',
                        tab.name,
                        value
                      )
                    }}
                    spaceControlsEnabled
                  />
                </BaseControl>
              </>
            )}
          </ResponsiveSettingsTabPanel>
        </PanelBody>

        <SpacingPanel
          title={__('Spacing', 'fleximpleblocks')}
          controls={[
            'min-height',
            'content-width',
            'content-gap',
            'margin-top',
            'margin-bottom',
            'padding-top',
            'padding-left',
            'padding-right',
            'padding-bottom',
          ]}
          initialOpen={false}
          {...{ attributes, setAttributes }}
        />

        <PanelBody
          title={__('Background', 'fleximpleblocks')}
          initialOpen={false}
        >
          <ResponsiveSettingsTabPanel initialTabName="small">
            {(tab) => (
              <>
                <BaseControl
                  label={__('Image', 'fleximpleblocks')}
                  id={`fleximple-blocks-container-media-control-${instanceId}`}
                >
                  <MediaUploadCheck>
                    <MediaUpload
                      id={`fleximple-blocks-container-media-control-${instanceId}`}
                      onSelect={(media) => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaId',
                          tab.name,
                          media.id
                        )
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaUrl',
                          tab.name,
                          media.sizes[mediaSize[tab.name]].url
                        )
                        setMediaData({
                          ...mediaData,
                          [tab.name]: media,
                        })
                      }}
                      allowedTypes={ALLOWED_MEDIA_TYPES}
                      value={mediaId[tab.name]}
                      render={({ open }) => (
                        <>
                          {!!mediaId[tab.name] && (
                            <Button
                              className="button fleximple-components-button-image width-full"
                              onClick={open}
                            >
                              <img
                                src={mediaUrl[tab.name]}
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
                            {!mediaId[tab.name]
                              ? __('Choose image', 'fleximpleblocks')
                              : __('Replace image', 'fleximpleblocks')}
                          </Button>

                          {!!mediaId[tab.name] && (
                            <Button
                              className="button button-link-delete width-full is-button is-large"
                              style={{ marginTop: '10px' }}
                              isDestructive
                              onClick={() => {
                                setResponsiveAttribute(
                                  attributes,
                                  setAttributes,
                                  'mediaId',
                                  tab.name,
                                  null
                                )
                                setResponsiveAttribute(
                                  attributes,
                                  setAttributes,
                                  'mediaUrl',
                                  tab.name,
                                  null
                                )
                                setMediaData({
                                  ...mediaData,
                                  [tab.name]: null,
                                })
                              }}
                            >
                              {__('Remove image', 'fleximpleblocks')}
                            </Button>
                          )}
                        </>
                      )}
                    />
                  </MediaUploadCheck>
                </BaseControl>

                {!!mediaData && !!mediaData[tab.name] && (
                  <>
                    <SelectControl
                      label={__('Media Size', 'fleximpleblocks')}
                      value={mediaSize[tab.name]}
                      options={Object.keys(mediaData[tab.name].sizes).map(
                        (size) => {
                          const label = size
                            .replace(/_/g, ' ')
                            .replace(/(?:^|\s)\S/g, function (a) {
                              return a.toUpperCase()
                            })
                          return {
                            label,
                            value: size,
                          }
                        }
                      )}
                      onChange={(value) => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaSize',
                          tab.name,
                          value
                        )
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaUrl',
                          tab.name,
                          mediaData[tab.name].sizes[value].source_url ||
                            mediaData[tab.name].sizes[value].url
                        )
                      }}
                    />

                    <FocalPointPicker
                      label={__('Background Image Position')}
                      url={mediaUrl[tab.name]}
                      value={focalPoint[tab.name]}
                      onChange={(value) => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'focalPoint',
                          tab.name,
                          value
                        )
                      }}
                    />

                    <SelectControl
                      label={__('Size', 'fleximpleblocks')}
                      value={backgroundSize[tab.name]}
                      options={[
                        {
                          label: __('Auto', 'fleximpleblocks'),
                          value: 'auto',
                        },
                        {
                          label: __('Cover', 'fleximpleblocks'),
                          value: 'cover',
                        },
                        {
                          label: __('Contain', 'fleximpleblocks'),
                          value: 'contain',
                        },
                      ]}
                      onChange={(value) => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'backgroundSize',
                          tab.name,
                          value
                        )
                      }}
                    />

                    <SelectControl
                      label={__('Repeat', 'fleximpleblocks')}
                      value={backgroundRepeat[tab.name]}
                      options={[
                        {
                          label: __('Repeat', 'fleximpleblocks'),
                          value: 'repeat',
                        },
                        {
                          label: __('Repeat X', 'fleximpleblocks'),
                          value: 'repeat-x',
                        },
                        {
                          label: __('Repeat Y', 'fleximpleblocks'),
                          value: 'repeat-y',
                        },
                        {
                          label: __('No repeat', 'fleximpleblocks'),
                          value: 'no-repeat',
                        },
                      ]}
                      onChange={(value) => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'backgroundRepeat',
                          tab.name,
                          value
                        )
                      }}
                    />
                  </>
                )}
              </>
            )}
          </ResponsiveSettingsTabPanel>

          {!!mediaId && (
            <ToggleControl
              label={__('Fixed background', 'fleximpleblocks')}
              checked={backgroundFixed}
              onChange={() =>
                setAttributes({ backgroundFixed: !backgroundFixed })
              }
            />
          )}

          <BaseControl
            label={__('Overlay', 'fleximpleblocks')}
            id={`fleximple-blocks-row-tag-control-${instanceId}`}
          >
            <ColorPalette
              value={overlayColor.color}
              onChange={setOverlayColor}
            />
          </BaseControl>

          <RangeControl
            label={__('Overlay opacity', 'fleximpleblocks')}
            initialPosition={30}
            min={0}
            max={100}
            step={5}
            value={overlayOpacity}
            onChange={(value) => setAttributes({ overlayOpacity: value })}
          />
        </PanelBody>
      </InspectorControls>

      <RowTag {...blockProps} data-block-id={blockId}>
        <div className={`${defaultClassName}__inner`}>
          {!!overlayColor && (
            <div className={overlayClasses} style={overlayStyles} />
          )}

          <div className={`${defaultClassName}__content`}>
            <InnerBlocks
              template={INNER_BLOCKS_TEMPLATE}
              templateLock={false}
              templateInsertUpdatesSelection={false}
            />
          </div>
        </div>

        <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
      </RowTag>
    </>
  )
}

export default compose([
  withColors({ overlayColor: 'background-color' }),
  withInstanceId,
])(RowEdit)
