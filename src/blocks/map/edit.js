/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'
// import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import LocationSelectControl from './components/location-select-control'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TextareaControl,
  ToggleControl,
} from '@wordpress/components'
import { useEffect, useRef } from '@wordpress/element'

const { name } = metadata

function MapEdit({
  className,
  attributes,
  attributes: {
    position,
    zoom,
    height,
    layer,
    popup,
    displayPopup,
    displayZoomControl,
    displayAttributionControl,
  },
  setAttributes,
  isSelected,
}) {
  const mapRef = useRef()
  const markerRef = useRef()
  const popupRef = useRef()

  // componentWillMount equivalent
  // useEffect( () => {
  // 	const currentMap = mapRef.current.leafletElement
  // 	if ( currentMap !== null ) {
  // 		currentMap.on( 'zoomend', () => {
  // 			const currentZoom = currentMap.getZoom()
  // 			setAttributes( { zoom: currentZoom } )
  // 		} )
  // 		currentMap.on( 'baselayerchange', ( e ) => {
  // 			setAttributes( {
  // 				layer: {
  // 					name: e.name,
  // 					url: e.layer.options.url,
  // 					attribution: e.layer.options.attribution,
  // 				},
  // 			} )
  // 		} )
  // 	}
  // }, [] )

  const updatePosition = () => {
    const currentMap = markerRef.current
    if ( currentMap !== null ) {
      const latLng = currentMap.leafletElement.getLatLng()
      setAttributes({
        position: { lat: latLng.lat, lng: latLng.lng },
      })
    }
  }

  const defaultClassName = getBlockDefaultClassName( name )

  const classes = classnames( className, {
    'is-selected': isSelected,
  })

  const blockProps = useBlockProps({
    className: classes,
  })

  const baseLayers = {
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&#169; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
    },
    'black-and-white': {
      url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      attribution: '&#169; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
    },
    humanitarian: {
      url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution: '&#169; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles courtesy of <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>.',
    },
    watercolor: {
      url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    },
  }

  const markerIconSvg = '<svg class="map-marker" height="42" width="26"><ellipse cx="13" cy="39" rx="7.5" ry="3" class="map-marker__shadow" opacity=".3" fill="#15151a"/><path class="map-marker__fill" d="M13 .5C6 .5.5 6 .5 13 .5 25 13 38.5 13 38.5S25.5 25 25.5 13C25.5 6 19.9.5 13 .5z" fill="#3e404f"/><path class="map-marker__glow" d="M13 1A12 12 0 0 0 1.021 13.45 12 12 0 0 1 13 2a12 12 0 0 1 12 11.574A12 12 0 0 0 13 1z" fill="#686a84"/><path class="map-marker__stroke" d="M13 .5C6 .5.5 6 .5 13 .5 25 13 38.5 13 38.5S25.5 25 25.5 13C25.5 6 19.9.5 13 .5z" fill="none" stroke="#15151a"/><circle cx="13" cy="13.098" r="5" class="map-marker__hole" fill="#15151a"/></svg>'

  const markerIcon = L.divIcon({
    html: markerIconSvg,
    iconSize: [ 26, 42 ],
    iconAnchor: [ 13, 39 ],
    popupAnchor: [ 0, -42 ],
  })

  return (
    <>
      <InspectorControls>
        <PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
          <LocationSelectControl { ...{ attributes, setAttributes } } />

          <RangeControl
            label={ __( 'Zoom', 'fleximpleblocks' ) }
            initialPosition={ 14 }
            min={ 1 }
            max={ 19 }
            value={ zoom }
            onChange={ value => setAttributes({ zoom: value }) }
          />

          <ResponsiveSettingsTabPanel initialTabName="small">
            { tab => 
              <SpacingControls
                valueLabel={ __( 'Height', 'fleximpleblocks' ) }
                unitLabel={ __( 'Height unit', 'fleximpleblocks' ) }
                initialPosition={ 0 }
                min={ 40 }
                max={ 1200 }
                attribute={ height }
                target={ tab.name }
                onChange={ value => setAttributes({ height: value }) }
              />
            }
          </ResponsiveSettingsTabPanel>

          <SelectControl
            label={ __( 'Layer', 'fleximpleblocks' ) }
            value={ layer }
            options={ [
              {
                label: __( 'Standard', 'fleximpleblocks' ),
                value: 'standard',
              },
              {
                label: __( 'Black and white', 'fleximpleblocks' ),
                value: 'black-and-white',
              },
              {
                label: __( 'Humanitarian', 'fleximpleblocks' ),
                value: 'humanitarian',
              },
              {
                label: __( 'Watercolor', 'fleximpleblocks' ),
                value: 'watercolor',
              },
            ] }
            onChange={ value => setAttributes({ layer: value }) }
          />

          <ToggleControl
            label={ __( 'Display popup', 'fleximpleblocks' ) }
            checked={ displayPopup }
            onChange={ () => setAttributes({ displayPopup: !displayPopup }) }
          />

          { !!displayPopup && 
          <TextareaControl
            label={ __( 'Popup content' ) }
            value={ popup }
            onChange={ value => setAttributes({ popup: value }) }
            help={ __( 'Click on the marker to display the popup.', 'fleximpleblocks' ) }
          />
          }

          <ToggleControl
            label={ __( 'Display zoom control', 'fleximpleblocks' ) }
            checked={ displayZoomControl }
            onChange={ () => setAttributes({ displayZoomControl: !displayZoomControl }) }
          />

          <ToggleControl
            label={ __( 'Display attribution control', 'fleximpleblocks' ) }
            checked={ displayAttributionControl }
            onChange={ () => setAttributes({ displayAttributionControl: !displayAttributionControl }) }
          />
        </PanelBody>
      </InspectorControls>

      <div { ...blockProps }>
        <style>
          { !!height.small.value &&
						`.${ defaultClassName } {
							${ height.small.value ? 'height:' + height.small.value + height.small.unit + ';' : '' }
						}` }

          { !!height.medium.value &&
						`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
							.${ defaultClassName } {
								${ height.medium.value ? 'height:' + height.medium.value + height.medium.unit + ';' : '' }
							}
						}` }

          { !!height.large.value &&
						`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
							.${ defaultClassName } {
								${ height.large.value ? 'height:' + height.large.value + height.large.unit + ';' : '' }
							}
						}` }
        </style>

        <MapContainer
          center={ position }
          zoom={ zoom }
          className={ classes }
          ref={ mapRef }
          zoomControl={ displayZoomControl }
          attributionControl={ displayAttributionControl }
        >
          <TileLayer
            attribution={ baseLayers[ layer ].attribution }
            url={ baseLayers[ layer ].url }
          />

          <Marker
            icon={ markerIcon }
            position={ position }
            draggable={ true }
            ondragend={ updatePosition }
            ref={ markerRef }
          >
            { !!displayPopup && <Popup ref={ popupRef }>{ popup }</Popup> }
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default MapEdit
