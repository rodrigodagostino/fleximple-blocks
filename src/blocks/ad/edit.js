/* global fleximpleblocksPluginData */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import apiFetch from '@wordpress/api-fetch'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from '@wordpress/block-editor'
import {
  BaseControl,
  Button,
  PanelBody,
  Placeholder,
  SelectControl,
  TextControl,
} from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import icon from './icon'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ]

function AdEdit({
  attributes,
  attributes: { id, url, size, alt, linkUrl, linkTarget },
  setAttributes,
  instanceId,
}) {
  const [ mediaData, setMediaData ] = useState()

  useEffect( () => {
    if ( id.small !== null || id.medium !== null || id.large !== null ) {
      fetchMediaData()
    }
  }, [] )

  const fetchMediaData = async () => {
    const mediaIds = Object.entries( id )
    await Promise.all(
      mediaIds.map( ( mediaId ) => {
        const [ key, value ] = mediaId
        if ( !value ) return { [ key ]: null }
        return apiFetch({
          path: `/wp/v2/media/${ value }`,
        }).then( ( response ) => {
          return {
            [ key ]: {
              id: response.id,
              sizes: response.media_details.sizes,
              type: response.media_type,
              alt: response.alt_text,
            },
          }
        })
      }),
    ).then( ( responses ) => {
      setMediaData({
        ...responses[ '0' ],
        ...responses[ '1' ],
        ...responses[ '2' ],
      })
    })
  }

  const defaultClassName = getBlockDefaultClassName( name )

  const blockProps = useBlockProps()

  const pictureSources = []
  if ( mediaData ) {
    // The generated array needs to be reversed
    // in order for <source> to work properly (from largest to smallest).
    Object.entries( id )
      .reverse()
      .forEach( ( [ key, value ], index, array ) => {
        if ( value ) {
          pictureSources.push(
            <source
              className={ `${ defaultClassName }__image` }
              // Assign the closest lower breakpoint
              // (“small” shouldn’t have a media attribute).
              media={
                key !== 'small'
                  ? `(min-width: ${
                    fleximpleblocksPluginData.settings[
                      array[ index + 1 ][ 0 ] + 'BreakpointValue'
                    ]
                  }px)`
                  : null
              }
              srcSet={ url[ key ] }
            />,
          )
        }
      })
  }

  const imageSource = url.small ? url.small : null

  return (
    <>
      <InspectorControls>
        <PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
          <>
            <ResponsiveSettingsTabPanel initialTabName="small">
              { ( tab ) =>
                <>
                  <BaseControl
                    label={ __( 'Image', 'fleximpleblocks' ) }
                    id={ `fleximple-blocks-container-media-control-${ instanceId }` }
                  >
                    <MediaUploadCheck>
                      <MediaUpload
                        id={ `fleximple-blocks-container-media-control-${ instanceId }` }
                        onSelect={ ( media ) => {
                          setResponsiveAttribute(
                            attributes,
                            setAttributes,
                            'id',
                            tab.name,
                            media.id,
                          )
                          setResponsiveAttribute(
                            attributes,
                            setAttributes,
                            'url',
                            tab.name,
                            media.sizes[ size[ tab.name ] ].url,
                          )
                          setAttributes({ alt: media.alt })
                          setMediaData({
                            ...mediaData,
                            [ tab.name ]: media,
                          })
                        } }
                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                        value={ id[ tab.name ] }
                        render={ ({ open }) =>
                          <>
                            { !!id[ tab.name ] &&
                            <Button
                              className="button fleximple-components-button-image width-full"
                              onClick={ open }
                            >
                              <img
                                src={ url[ tab.name ] }
                                style={{ verticalAlign: 'middle' }}
                                alt={ __( 'Replace image', 'fleximpleblocks' ) }
                              />
                            </Button>
                            }

                            <Button
                              className="button button-large is-button is-default is-large width-full"
                              style={{ marginTop: '10px' }}
                              onClick={ open }
                            >
                              { !id[ tab.name ]
                                ? __( 'Choose image', 'fleximpleblocks' )
                                : __( 'Replace image', 'fleximpleblocks' ) }
                            </Button>

                            { !!id[ tab.name ] &&
                            <Button
                              className="button button-link-delete width-full is-button is-large"
                              style={{ marginTop: '10px' }}
                              isDestructive
                              onClick={ () => {
                                setResponsiveAttribute(
                                  attributes,
                                  setAttributes,
                                  'id',
                                  tab.name,
                                  null,
                                )
                                setResponsiveAttribute(
                                  attributes,
                                  setAttributes,
                                  'url',
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

                  { !!id[ tab.name ] && mediaData &&
                  <SelectControl
                    label={ __( 'Size', 'fleximpleblocks' ) }
                    value={ size[ tab.name ] }
                    options={ [
                      { label: __( 'None', 'fleximpleblocks' ), value: 'none' },
                      ...Object.keys( mediaData[ tab.name ].sizes ).map(
                        ( mediaSize ) => {
                          const label = mediaSize
                            .replace( /_/g, ' ' )
                            .replace( /(?:^|\s)\S/g, function ( a ) {
                              return a.toUpperCase()
                            })
                          return {
                            label,
                            value: mediaSize,
                          }
                        },
                      ),
                    ] }
                    onChange={ ( value ) => {
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'size',
                        tab.name,
                        value,
                      )
                      setResponsiveAttribute(
                        attributes,
                        setAttributes,
                        'url',
                        tab.name,
                        mediaData[ tab.name ].sizes[ value ].source_url ||
                          mediaData[ tab.name ].sizes[ value ].url,
                      )
                    } }
                  />
                  }
                </>
              }
            </ResponsiveSettingsTabPanel>

            <TextControl
              label={ __( 'Link URL', 'fleximpleblocks' ) }
              value={ linkUrl }
              placeholder={ __( 'Type the link URL…', 'fleximpleblocks' ) }
              onChange={ ( value ) => setAttributes({ linkUrl: value }) }
            />

            <SelectControl
              label={ __( 'Link target', 'fleximpleblocks' ) }
              value={ linkTarget }
              options={ [
                {
                  label: __( 'Open in current tab', 'fleximpleblocks' ),
                  value: '_self',
                },
                {
                  label: __( 'Open in new tab', 'fleximpleblocks' ),
                  value: '_blank',
                },
              ] }
              onChange={ ( value ) => setAttributes({ linkTarget: value }) }
              disabled={ !linkUrl }
            />
          </>
        </PanelBody>
      </InspectorControls>

      <picture { ...blockProps }>
        { !id.small && !id.medium && !id.large &&
        <Placeholder
          icon={ icon }
          label={ __( 'Ad', 'fleximpleblocks' ) }
          className="fleximple-components-placeholder"
          instructions={ __(
            'Select an image to start with.',
            'fleximpleblocks',
          ) }
        >
          <MediaUpload
            id={ `fleximple-blocks-container-media-control-${ instanceId }` }
            onSelect={ ( media ) => {
              setResponsiveAttribute(
                attributes,
                setAttributes,
                'id',
                'small',
                media.id,
              )
              setResponsiveAttribute(
                attributes,
                setAttributes,
                'url',
                'small',
                media.sizes[ size.small ].url,
              )
              setAttributes({ alt: media.alt })
            } }
            allowedTypes={ ALLOWED_MEDIA_TYPES }
            value={ id }
            render={ ({ open }) =>
              <>
                <Button
                  className="button button-large is-button is-primary width-full"
                  style={{ marginTop: '10px' }}
                  onClick={ open }
                >
                  { !id.small
                    ? __( 'Choose image', 'fleximpleblocks' )
                    : __( 'Replace image', 'fleximpleblocks' ) }
                </Button>
              </>
            }
          />
        </Placeholder>
        }

        { ( !!id.small || !!id.medium || !!id.large ) &&
        <>
          { pictureSources }
          <img
            className={ `${ defaultClassName }__image` }
            src={ imageSource }
            alt={ alt }
          />
        </>
        }
      </picture>
    </>
  )
}

export default AdEdit
