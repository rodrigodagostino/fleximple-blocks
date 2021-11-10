/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

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
const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ]
const INNER_BLOCKS_TEMPLATE = [
  [ 'core/heading', {
    level: 2,
    textAlign: 'center',
    /* translators: content placeholder */
    placeholder: __( 'Write heading…', 'fleximpleblocks' ),
  } ],
  [ 'core/paragraph', {
    align: 'center',
    /* translators: content placeholder */
    placeholder: __( 'Write content…', 'fleximpleblocks' ),
  } ],
]

function RowEdit({
  attributes,
  attributes: {
    rowId,
    rowTag,
    alignmentHorizontal,
    alignmentVertical,
    minHeight,
    contentWidth,
    marginTop,
    marginBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
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
  instanceId,
}) {
  const [ mediaData, setMediaData ] = useState()

  useEffect( () => {
    if ( mediaId.small !== null || mediaId.medium !== null || mediaId.large !== null ) {
      fetchMediaData()
    }
  }, [] )

  const fetchMediaData = async () => {
    const mediaIds = Object.entries( mediaId )
    await Promise.all( mediaIds.map( id => {
      const [ key, value ] = id
      if ( !value ) return { [ key ]: null }
      return apiFetch({
        path: `/wp/v2/media/${ value }`,
      }).then( response => {
        return {
          [ key ]: {
            id: response.id,
            sizes: response.media_details.sizes,
            type: response.media_type,
            alt: response.alt_text,
          },
        }
      })
    }) ).then( responses => {
      setMediaData({
        ...responses[ '0' ],
        ...responses[ '1' ],
        ...responses[ '2' ],
      })
    })
  }

  const RowTag = rowTag

  const defaultClassName = getBlockDefaultClassName( name )

  const classes = classnames({
    [ `block-align-h-${ alignmentHorizontal.small }--sm` ]: alignmentHorizontal.small,
    [ `block-align-h-${ alignmentHorizontal.medium }--md` ]: alignmentHorizontal.medium,
    [ `block-align-h-${ alignmentHorizontal.large }--lg` ]: alignmentHorizontal.large,
    [ `block-align-v-${ alignmentVertical.small }--sm` ]: alignmentVertical.small,
    [ `block-align-v-${ alignmentVertical.medium }--md` ]: alignmentVertical.medium,
    [ `block-align-v-${ alignmentVertical.large }--lg` ]: alignmentVertical.large,
    [ `min-height-${ minHeight.small.value + ( minHeight.small.unit === '%' ? 'pct' : minHeight.small.unit ) }--sm` ]: minHeight.small.value,
    [ `min-height-${ minHeight.medium.value + ( minHeight.medium.unit === '%' ? 'pct' : minHeight.medium.unit ) }--md` ]: minHeight.medium.value,
    [ `min-height-${ minHeight.large.value + ( minHeight.large.unit === '%' ? 'pct' : minHeight.large.unit ) }--lg` ]: minHeight.large.value,
    [ `content-width-${ contentWidth.small.value + ( contentWidth.small.unit === '%' ? 'pct' : contentWidth.small.unit ) }--sm` ]: contentWidth.small.value,
    [ `content-width-${ contentWidth.medium.value + ( contentWidth.medium.unit === '%' ? 'pct' : contentWidth.medium.unit ) }--md` ]: contentWidth.medium.value,
    [ `content-width-${ contentWidth.large.value + ( contentWidth.large.unit === '%' ? 'pct' : contentWidth.large.unit ) }--lg` ]: contentWidth.large.value,
    [ `margin-top-${ marginTop.small.value + ( marginTop.small.unit === '%' ? 'pct' : marginTop.small.unit ) }--sm` ]: marginTop.small.value,
    [ `margin-top-${ marginTop.medium.value + ( marginTop.medium.unit === '%' ? 'pct' : marginTop.medium.unit ) }--md` ]: marginTop.medium.value,
    [ `margin-top-${ marginTop.large.value + ( marginTop.large.unit === '%' ? 'pct' : marginTop.large.unit ) }--lg` ]: marginTop.large.value,
    [ `margin-bottom-${ marginBottom.small.value + ( marginBottom.small.unit === '%' ? 'pct' : marginBottom.small.unit ) }--sm` ]: marginBottom.small.value,
    [ `margin-bottom-${ marginBottom.medium.value + ( marginBottom.medium.unit === '%' ? 'pct' : marginBottom.medium.unit ) }--md` ]: marginBottom.medium.value,
    [ `margin-bottom-${ marginBottom.large.value + ( marginBottom.large.unit === '%' ? 'pct' : marginBottom.large.unit ) }--lg` ]: marginBottom.large.value,
    [ `padding-top-${ paddingTop.small.value + ( paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit ) }--sm` ]: paddingTop.small.value,
    [ `padding-top-${ paddingTop.medium.value + ( paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit ) }--md` ]: paddingTop.medium.value,
    [ `padding-top-${ paddingTop.large.value + ( paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit ) }--lg` ]: paddingTop.large.value,
    [ `padding-left-${ paddingLeft.small.value + ( paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit ) }--sm` ]: paddingLeft.small.value,
    [ `padding-left-${ paddingLeft.medium.value + ( paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit ) }--md` ]: paddingLeft.medium.value,
    [ `padding-left-${ paddingLeft.large.value + ( paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit ) }--lg` ]: paddingLeft.large.value,
    [ `padding-right-${ paddingRight.small.value + ( paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit ) }--sm` ]: paddingRight.small.value,
    [ `padding-right-${ paddingRight.medium.value + ( paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit ) }--md` ]: paddingRight.medium.value,
    [ `padding-right-${ paddingRight.large.value + ( paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit ) }--lg` ]: paddingRight.large.value,
    [ `padding-bottom-${ paddingBottom.small.value + ( paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit ) }--sm` ]: paddingBottom.small.value,
    [ `padding-bottom-${ paddingBottom.medium.value + ( paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit ) }--md` ]: paddingBottom.medium.value,
    [ `padding-bottom-${ paddingBottom.large.value + ( paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit ) }--lg` ]: paddingBottom.large.value,
    [ `background-image-id-${ mediaId.small }--sm` ]: mediaId.small && mediaUrl.small,
    [ `background-image-id-${ mediaId.medium }--md` ]: mediaId.medium && mediaUrl.medium,
    [ `background-image-id-${ mediaId.large }--lg` ]: mediaId.large && mediaUrl.large,
    [ `background-position-${ focalPoint.small.x * 100 }-${ focalPoint.small.y * 100 }--sm` ]: mediaId.small && ( focalPoint.small.x || focalPoint.small.y ),
    [ `background-position-${ focalPoint.medium.x * 100 }-${ focalPoint.medium.y * 100 }--md` ]: mediaId.medium && ( focalPoint.medium.x || focalPoint.medium.y ) && ( focalPoint.medium.x !== focalPoint.small.x || focalPoint.medium.y !== focalPoint.small.y ),
    [ `background-position-${ focalPoint.large.x * 100 }-${ focalPoint.large.y * 100 }--lg` ]: mediaId.large && ( focalPoint.large.x || focalPoint.large.y ) && ( focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y ),
    [ `background-size-${ backgroundSize.small }--sm` ]: mediaId.small && backgroundSize.small,
    [ `background-size-${ backgroundSize.medium }--md` ]: mediaId.medium && backgroundSize.medium && backgroundSize.medium !== backgroundSize.small,
    [ `background-size-${ backgroundSize.large }--lg` ]: mediaId.large && backgroundSize.large && backgroundSize.large !== backgroundSize.medium,
    [ `background-repeat-${ backgroundRepeat.small }--sm` ]: mediaId.small && backgroundRepeat.small,
    [ `background-repeat-${ backgroundRepeat.medium }--md` ]: mediaId.medium && backgroundRepeat.medium && backgroundRepeat.medium !== backgroundRepeat.small,
    [ `background-repeat-${ backgroundRepeat.large }--lg` ]: mediaId.large && backgroundRepeat.large && backgroundRepeat.large !== backgroundRepeat.medium,
    'background-attachment-fixed': ( mediaId.small || mediaId.medium || mediaId.large ) && backgroundFixed,
  })

  const blockProps = useBlockProps({
    id: rowId,
    className: classes,
  })

  const overlayClasses = classnames(
    `${ defaultClassName }__overlay`, {
      'has-background': overlayColor.color && overlayOpacity,
      [ overlayColor.class ]: overlayColor.class && overlayOpacity,
      [ `opacity-${ overlayOpacity }` ]: overlayOpacity,
    },
  )

  const overlayStyles = {
    backgroundColor: overlayOpacity !== 0 && overlayColor.color && overlayColor.class === undefined ? overlayColor.color : undefined,
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
          <InputGroupControl
            label={ __( 'Row ID', 'fleximpleblocks' ) }
            value={ rowId }
            placeholder={ __( 'Type the row ID…', 'fleximpleblocks' ) }
            prepend={ true }
            prependText="#"
            onChange={ value => setAttributes({ rowId: value }) }
          />

          <SelectControl
            label={ __( 'HTML Tag', 'fleximpleblocks' ) }
            labelPosition="top"
            value={ rowTag }
            options={ [
              { label: '<div>', value: 'div' },
              { label: '<section>', value: 'section' },
              { label: '<aside>', value: 'aside' },
              { label: '<header>', value: 'header' },
              { label: '<main>', value: 'main' },
              { label: '<footer>', value: 'footer' },
            ] }
            onChange={ value => setAttributes({ rowTag: value }) }
          />

          <ResponsiveSettingsTabPanel initialTabName="small">
            { tab =>
              <>
                <BaseControl
                  label={ __( 'Horizontal alignment', 'fleximpleblocks' ) }
                  id={ `fleximple-blocks-row-horizontal-block-align-toolbar-${ instanceId }` }
                >
                  <BlockAlignmentHorizontalToolbar
                    id={ `fleximple-blocks-row-horizontal-block-align-toolbar-${ instanceId }` }
                    value={ alignmentHorizontal[ tab.name ] }
                    onChange={ value => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'alignmentHorizontal',
                        tab.name,
                        value,
                      )
                    } }
                  />
                </BaseControl>

                <BaseControl
                  label={ __( 'Vertical alignment', 'fleximpleblocks' ) }
                  id={ `fleximple-blocks-row-vertical-block-align-toolbar-${ instanceId }` }
                >
                  <BlockAlignmentVerticalToolbar
                    id={ `fleximple-blocks-row-vertical-block-align-toolbar-${ instanceId }` }
                    value={ alignmentVertical[ tab.name ] }
                    onChange={ value => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'alignmentVertical',
                        tab.name,
                        value,
                      )
                    } }
                    spaceControlsEnabled
                  />
                </BaseControl>
              </>
            }
          </ResponsiveSettingsTabPanel>
        </PanelBody>

        <SpacingPanel
          title={ __( 'Spacing', 'fleximpleblocks' ) }
          controls={ [
            'min-height',
            'content-width',
            'margin-top',
            'margin-bottom',
            'padding-top',
            'padding-left',
            'padding-right',
            'padding-bottom',
          ] }
          initialOpen={ false }
          { ...{ attributes, setAttributes } }
        />

        <PanelBody
          title={ __( 'Background', 'fleximpleblocks' ) }
          initialOpen={ false }
        >
          <ResponsiveSettingsTabPanel initialTabName="small">
            { tab =>
              <>
                <BaseControl
                  label={ __( 'Image', 'fleximpleblocks' ) }
                  id={ `fleximple-blocks-container-media-control-${ instanceId }` }
                >
                  <MediaUploadCheck>
                    <MediaUpload
                      id={ `fleximple-blocks-container-media-control-${ instanceId }` }
                      onSelect={ media => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaId',
                          tab.name,
                          media.id,
                        )
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaUrl',
                          tab.name,
                          media.sizes[ mediaSize[ tab.name ] ].url,
                        )
                        setMediaData({
                          ...mediaData,
                          [ tab.name ]: media,
                        })
                      } }
                      allowedTypes={ ALLOWED_MEDIA_TYPES }
                      value={ mediaId[ tab.name ] }
                      render={ ({ open }) =>
                        <>
                          { !!mediaId[ tab.name ] &&
                            <Button
                              className="button fleximple-components-button-image width-full"
                              onClick={ open }
                            >
                              <img
                                src={ mediaUrl[ tab.name ] }
                                style={ { verticalAlign: 'middle' } }
                                alt={ __( 'Replace image', 'fleximpleblocks' ) }
                              />
                            </Button>
                          }

                          <Button
                            className="button button-large is-button is-default is-large width-full"
                            style={ { marginTop: '10px' } }
                            onClick={ open }
                          >
                            { !mediaId[ tab.name ]
                              ? __( 'Choose image', 'fleximpleblocks' )
                              : __( 'Replace image', 'fleximpleblocks' ) }
                          </Button>

                          { !!mediaId[ tab.name ] &&
                            <Button
                              className="button button-link-delete width-full is-button is-large"
                              style={ { marginTop: '10px' } }
                              isDestructive
                              onClick={ () => {
                                setResponsiveAttribute(
                                  attributes,
                                  setAttributes,
                                  'mediaId',
                                  tab.name,
                                  null,
                                )
                                setResponsiveAttribute(
                                  attributes,
                                  setAttributes,
                                  'mediaUrl',
                                  tab.name,
                                  null,
                                )
                                setMediaData({
                                  ...mediaData,
                                  [ tab.name ]: null,
                                })
                              } }
                            >
                              { __( 'Remove image', 'fleximpleblocks' ) }
                            </Button>
                          }
                        </>
                      }
                    />
                  </MediaUploadCheck>
                </BaseControl>

                { !!mediaData && !!mediaData[ tab.name ] &&
                  <>
                    <SelectControl
                      label={ __( 'Media Size', 'fleximpleblocks' ) }
                      value={ mediaSize[ tab.name ] }
                      options={ Object.keys( mediaData[ tab.name ].sizes ).map(
                        size => {
                          const label = size
                            .replace( /_/g, ' ' )
                            .replace( /(?:^|\s)\S/g, function ( a ) {
                              return a.toUpperCase()
                            })
                          return {
                            label,
                            value: size,
                          }
                        },
                      ) }
                      onChange={ value => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaSize',
                          tab.name,
                          value,
                        )
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'mediaUrl',
                          tab.name,
                          mediaData[ tab.name ].sizes[ value ].source_url || mediaData[ tab.name ].sizes[ value ].url,
                        )
                      } }
                    />

                    <FocalPointPicker
                      label={ __( 'Background Image Position' ) }
                      url={ mediaUrl[ tab.name ] }
                      value={ focalPoint[ tab.name ] }
                      onChange={ value => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'focalPoint',
                          tab.name,
                          value,
                        )
                      } }
                    />

                    <SelectControl
                      label={ __( 'Size', 'fleximpleblocks' ) }
                      value={ backgroundSize[ tab.name ] }
                      options={ [
                        {
                          label: __( 'Auto', 'fleximpleblocks' ),
                          value: 'auto',
                        },
                        {
                          label: __( 'Cover', 'fleximpleblocks' ),
                          value: 'cover',
                        },
                        {
                          label: __( 'Contain', 'fleximpleblocks' ),
                          value: 'contain',
                        },
                      ] }
                      onChange={ value => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'backgroundSize',
                          tab.name,
                          value,
                        )
                      } }
                    />

                    <SelectControl
                      label={ __( 'Repeat', 'fleximpleblocks' ) }
                      value={ backgroundRepeat[ tab.name ] }
                      options={ [
                        {
                          label: __( 'Repeat', 'fleximpleblocks' ),
                          value: 'repeat',
                        },
                        {
                          label: __( 'Repeat X', 'fleximpleblocks' ),
                          value: 'repeat-x',
                        },
                        {
                          label: __( 'Repeat Y', 'fleximpleblocks' ),
                          value: 'repeat-y',
                        },
                        {
                          label: __( 'No repeat', 'fleximpleblocks' ),
                          value: 'no-repeat',
                        },
                      ] }
                      onChange={ value => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'backgroundRepeat',
                          tab.name,
                          value,
                        )
                      } }
                    />
                  </>
                }
              </>
            }
          </ResponsiveSettingsTabPanel>

          { !!mediaId &&
          <ToggleControl
            label={ __( 'Fixed background', 'fleximpleblocks' ) }
            checked={ backgroundFixed }
            onChange={ () => setAttributes({ backgroundFixed: !backgroundFixed }) }
          />
          }

          <BaseControl
            label={ __( 'Overlay', 'fleximpleblocks' ) }
            id={ `fleximple-blocks-row-tag-control-${ instanceId }` }
          >
            <ColorPalette
              value={ overlayColor.color }
              onChange={ setOverlayColor }
            />
          </BaseControl>

          <RangeControl
            label={ __( 'Overlay opacity', 'fleximpleblocks' ) }
            initialPosition={ 30 }
            min={ 0 }
            max={ 100 }
            step={ 5 }
            value={ overlayOpacity }
            onChange={ value => setAttributes({ overlayOpacity: value }) }
          />
        </PanelBody>
      </InspectorControls>

      <RowTag { ...blockProps }>
        <style>
          { !!alignmentHorizontal.small &&
            `.${ defaultClassName }.block-align-h-${ alignmentHorizontal.small }--sm > .${ defaultClassName }__inner {
              justify-content: ${ alignmentHorizontal.small };
            }` }
          { !!alignmentVertical.small &&
            `.${ defaultClassName }.block-align-v-${ alignmentVertical.small }--sm > .${ defaultClassName }__inner > .${ defaultClassName }__content > .block-editor-inner-blocks > .block-editor-block-list__layout {
              justify-content: ${ alignmentVertical.small };
            }` }
          { !!minHeight.small.value &&
            `.${ defaultClassName }.min-height-${ minHeight.small.value + ( minHeight.small.unit === '%' ? 'pct' : minHeight.small.unit ) }--sm > .${ defaultClassName }__inner > .${ defaultClassName }__content > .block-editor-inner-blocks > .block-editor-block-list__layout {
              min-height: ${ minHeight.small.value + minHeight.small.unit };
            }` }
          { !!contentWidth.small.value &&
            `.${ defaultClassName }.content-width-${ contentWidth.small.value + ( contentWidth.small.unit === '%' ? 'pct' : contentWidth.small.unit ) }--sm .${ defaultClassName }__content {
              width: ${ contentWidth.small.value + contentWidth.small.unit };
            }` }
          { !!marginTop.small.value &&
            `.${ defaultClassName }.margin-top-${ marginTop.small.value + ( marginTop.small.unit === '%' ? 'pct' : marginTop.small.unit ) }--sm {
              margin-top: ${ marginTop.small.value + marginTop.small.unit };
            }` }
          { !!marginBottom.small.value &&
            `.${ defaultClassName }.margin-bottom-${ marginBottom.small.value + ( marginBottom.small.unit === '%' ? 'pct' : marginBottom.small.unit ) }--sm {
              margin-bottom: ${ marginBottom.small.value + marginBottom.small.unit };
            }` }
          { !!paddingTop.small.value &&
            `.${ defaultClassName }.padding-top-${ paddingTop.small.value + ( paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit ) }--sm {
              padding-top: ${ paddingTop.small.value + paddingTop.small.unit };
            }` }
          { !!paddingLeft.small.value &&
            `.${ defaultClassName }.padding-left-${ paddingLeft.small.value + ( paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit ) }--sm {
              padding-left: ${ paddingLeft.small.value + paddingLeft.small.unit };
            }` }
          { !!paddingRight.small.value &&
            `.${ defaultClassName }.padding-right-${ paddingRight.small.value + ( paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit ) }--sm {
              padding-right: ${ paddingRight.small.value + paddingRight.small.unit };
            }` }
          { !!paddingBottom.small.value &&
            `.${ defaultClassName }.padding-bottom-${ paddingBottom.small.value + ( paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit ) }--sm {
              padding-bottom: ${ paddingBottom.small.value + paddingBottom.small.unit };
            }` }
          { !!mediaId.small && mediaUrl.small &&
            `${ mediaUrl.small ? `
              .${ defaultClassName }.background-image-id-${ mediaId.small }--sm {
                background-image: url('${ mediaUrl.small }');
              }` : '' }
              ${ !!focalPoint.small.x || !!focalPoint.small.y ? `
                .${ defaultClassName }.background-position-${ focalPoint.small.x * 100 }-${ focalPoint.small.y * 100 }--sm {
                  background-position: ${ focalPoint.small.x * 100 }% ${ focalPoint.small.y * 100 }%;
                }` : '' }
              ${ backgroundSize.small ? `
                .${ defaultClassName }.background-size-${ backgroundSize.small }--sm {
                  background-size: ${ backgroundSize.small };
                }` : '' }
              ${ backgroundRepeat.small ? `
                .${ defaultClassName }.background-repeat-${ backgroundRepeat.small }--sm {
                  background-repeat: ${ backgroundRepeat.small };
                }` : '' }`
          }

          { ( !!alignmentHorizontal.medium || !!alignmentVertical.medium || !!minHeight.medium.value || !!contentWidth.medium.value || !!marginTop.medium.value || !!marginBottom.medium.value || !!paddingTop.medium.value || !!paddingLeft.medium.value || !!paddingRight.medium.value || !!paddingBottom.medium.value || !!mediaId.medium ) &&
            `@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
              ${ alignmentHorizontal.medium ? `
                .${ defaultClassName }.block-align-h-${ alignmentHorizontal.medium }--md > .${ defaultClassName }__inner {
                  justify-content: ${ alignmentHorizontal.medium };
                }` : '' }
              ${ alignmentVertical.medium ? `
                .${ defaultClassName }.block-align-v-${ alignmentVertical.medium }--md > .${ defaultClassName }__inner > .${ defaultClassName }__content > .block-editor-inner-blocks > .block-editor-block-list__layout {
                  justify-content: ${ alignmentVertical.medium };
                }` : '' }
              ${ minHeight.medium.value ? `
                .${ defaultClassName }.min-height-${ minHeight.medium.value + ( minHeight.medium.unit === '%' ? 'pct' : minHeight.medium.unit ) }--md > .${ defaultClassName }__inner > .${ defaultClassName }__content > .block-editor-inner-blocks > .block-editor-block-list__layout {
                  min-height: ${ minHeight.medium.value + minHeight.medium.unit };
                }` : '' }
              ${ contentWidth.medium.value ? `
                .${ defaultClassName }.content-width-${ contentWidth.medium.value + ( contentWidth.medium.unit === '%' ? 'pct' : contentWidth.medium.unit ) }--md .${ defaultClassName }__content {
                  width: ${ contentWidth.medium.value + contentWidth.medium.unit };
                }` : '' }
              ${ marginTop.medium.value ? `
                .${ defaultClassName }.margin-top-${ marginTop.medium.value + ( marginTop.medium.unit === '%' ? 'pct' : marginTop.medium.unit ) }--md {
                  margin-top: ${ marginTop.medium.value + marginTop.medium.unit };
                }` : '' }
              ${ marginBottom.medium.value ? `
                .${ defaultClassName }.margin-bottom-${ marginBottom.medium.value + ( marginBottom.medium.unit === '%' ? 'pct' : marginBottom.medium.unit ) }--md {
                  margin-bottom: ${ marginBottom.medium.value + marginBottom.medium.unit };
                }` : '' }
              ${ paddingTop.medium.value ? `
                .${ defaultClassName }.padding-top-${ paddingTop.medium.value + ( paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit ) }--md {
                  padding-top: ${ paddingTop.medium.value + paddingTop.medium.unit };
                }` : '' }
              ${ paddingLeft.medium.value ? `
                .${ defaultClassName }.padding-left-${ paddingLeft.medium.value + ( paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit ) }--md {
                  padding-left: ${ paddingLeft.medium.value + paddingLeft.medium.unit };
                }` : '' }
              ${ paddingRight.medium.value ? `
                .${ defaultClassName }.padding-right-${ paddingRight.medium.value + ( paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit ) }--md {
                  padding-right: ${ paddingRight.medium.value + paddingRight.medium.unit };
                }` : '' }
              ${ paddingBottom.medium.value ? `
                .${ defaultClassName }.padding-bottom-${ paddingBottom.medium.value + ( paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit ) }--md {
                  padding-bottom: ${ paddingBottom.medium.value + paddingBottom.medium.unit };
                }` : '' }
              ${ !!mediaId.medium && !!mediaUrl.medium ? `
                ${ mediaUrl.medium ? `
                  .${ defaultClassName }.background-image-id-${ mediaId.medium }--md {
                    background-image: url('${ mediaUrl.medium }');
                  }` : '' }
              ${ ( !!focalPoint.medium.x || !!focalPoint.medium.y ) && ( focalPoint.medium.x !== focalPoint.medium.x || focalPoint.medium.y !== focalPoint.medium.y ) ? `
                .${ defaultClassName }.background-position-${ focalPoint.medium.x * 100 }-${ focalPoint.medium.y * 100 }--md {
                  background-position: ${ focalPoint.medium.x * 100 }% ${ focalPoint.medium.y * 100 }%;
                }` : '' }
              ${ !!backgroundSize.medium && backgroundSize.medium !== backgroundSize.medium ? `
                .${ defaultClassName }.background-size-${ backgroundSize.medium }--md {
                  background-size: ${ backgroundSize.medium };
                }` : '' }
              ${ !!backgroundRepeat.medium && backgroundRepeat.medium !== backgroundRepeat.medium ? `
                .${ defaultClassName }.background-repeat-${ backgroundRepeat.medium }--md {
                  background-repeat: ${ backgroundRepeat.medium };
                }` : '' }
              }` : '' }`
          }

          { ( !!alignmentHorizontal.large || !!alignmentVertical.large || !!minHeight.large.value || !!contentWidth.large.value || !!marginTop.large.value || !!marginBottom.large.value || !!paddingTop.large.value || !!paddingLeft.large.value || !!paddingRight.large.value || !!paddingBottom.large.value || !!mediaId.large ) &&
            `@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
              ${ alignmentHorizontal.large ? `
                .${ defaultClassName }.block-align-h-${ alignmentHorizontal.large }--lg > .${ defaultClassName }__inner {
                  justify-content: ${ alignmentHorizontal.large };
                }` : '' }
              ${ alignmentVertical.large ? `
                .${ defaultClassName }.block-align-v-${ alignmentVertical.large }--lg > .${ defaultClassName }__inner > .${ defaultClassName }__content > .block-editor-inner-blocks > .block-editor-block-list__layout {
                  justify-content: ${ alignmentVertical.large };
                }` : '' }
              ${ minHeight.large.value ? `
                .${ defaultClassName }.min-height-${ minHeight.large.value + ( minHeight.large.unit === '%' ? 'pct' : minHeight.large.unit ) }--lg > .${ defaultClassName }__inner > .${ defaultClassName }__content > .block-editor-inner-blocks > .block-editor-block-list__layout {
                  min-height: ${ minHeight.large.value + minHeight.large.unit };
                }` : '' }
              ${ contentWidth.large.value ? `
                .${ defaultClassName }.content-width-${ contentWidth.large.value + ( contentWidth.large.unit === '%' ? 'pct' : contentWidth.large.unit ) }--lg .${ defaultClassName }__content {
                  width: ${ contentWidth.large.value + contentWidth.large.unit };
                }` : '' }
              ${ marginTop.large.value ? `
                .${ defaultClassName }.margin-top-${ marginTop.large.value + ( marginTop.large.unit === '%' ? 'pct' : marginTop.large.unit ) }--lg {
                  margin-top: ${ marginTop.large.value + marginTop.large.unit };
                }` : '' }
              ${ marginBottom.large.value ? `
                .${ defaultClassName }.margin-bottom-${ marginBottom.large.value + ( marginBottom.large.unit === '%' ? 'pct' : marginBottom.large.unit ) }--lg {
                  margin-bottom: ${ marginBottom.large.value + marginBottom.large.unit };
                }` : '' }
              ${ paddingTop.large.value ? `
                .${ defaultClassName }.padding-top-${ paddingTop.large.value + ( paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit ) }--lg {
                  padding-top: ${ paddingTop.large.value + paddingTop.large.unit };
                }` : '' }
              ${ paddingLeft.large.value ? `
                .${ defaultClassName }.padding-left-${ paddingLeft.large.value + ( paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit ) }--lg {
                  padding-left: ${ paddingLeft.large.value + paddingLeft.large.unit };
                }` : '' }
              ${ paddingRight.large.value ? `
                .${ defaultClassName }.padding-right-${ paddingRight.large.value + ( paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit ) }--lg {
                  padding-right: ${ paddingRight.large.value + paddingRight.large.unit };
                  }` : '' }
              ${ paddingBottom.large.value ? `
                .${ defaultClassName }.padding-bottom-${ paddingBottom.large.value + ( paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit ) }--lg {
                  padding-bottom: ${ paddingBottom.large.value + paddingBottom.large.unit };
                }` : '' }
              ${ !!mediaId.large && !!mediaUrl.large ? `
                ${ mediaUrl.large ? `
                .${ defaultClassName }.background-image-id-${ mediaId.large }--lg {
                  background-image: url('${ mediaUrl.large }');
                }` : '' }
              ${ ( !!focalPoint.large.x || !!focalPoint.large.y ) && ( focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y ) ? `
                .${ defaultClassName }.background-position-${ focalPoint.large.x * 100 }-${ focalPoint.large.y * 100 }--lg {
                  background-position: ${ focalPoint.large.x * 100 }% ${ focalPoint.large.y * 100 }%;
                }` : '' }
              ${ !!backgroundSize.large && backgroundSize.large !== backgroundSize.medium ? `
                .${ defaultClassName }.background-size-${ backgroundSize.large }--lg {
                  background-size: ${ backgroundSize.large };
                }` : '' }
              ${ !!backgroundRepeat.large && backgroundRepeat.large !== backgroundRepeat.medium ? `
                .${ defaultClassName }.background-repeat-${ backgroundRepeat.large }--lg {
                  background-repeat: ${ backgroundRepeat.large };
                }` : '' }
              }` : '' }`
          }
        </style>

        <div className={ `${ defaultClassName }__inner` }>
          { !!overlayColor &&
            <div className={ overlayClasses } style={ overlayStyles } />
          }

          <div className={ `${ defaultClassName }__content` }>
            <InnerBlocks
              template={ INNER_BLOCKS_TEMPLATE }
              templateLock={ false }
              templateInsertUpdatesSelection={ false }
            />
          </div>
        </div>
      </RowTag>
    </>
  )
}

export default compose( [
  withColors({ overlayColor: 'background-color' }),
  withInstanceId,
] )( RowEdit )
