/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'
import L from 'leaflet'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

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
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, RangeControl, SelectControl, TextareaControl, ToggleControl } from '@wordpress/components'
import { Component, createRef } from '@wordpress/element'

const { name } = metadata

class MapEdit extends Component {
	constructor() {
		super( ...arguments )

		this.mapRef = createRef()
		this.markerRef = createRef()
		this.popupRef = createRef()

		this.state = {}
	}

	componentDidMount() {
		const mapRef = this.mapRef.current.leafletElement
		if ( mapRef !== null ) {
			mapRef.on( 'zoomend', () => {
				const zoom = mapRef.getZoom()
				this.props.setAttributes( {
					zoom,
				} )
			} )
			mapRef.on( 'baselayerchange', ( e ) => {
				this.props.setAttributes( {
					layer: {
						name: e.name,
						url: e.layer.options.url,
						attribution: e.layer.options.attribution,
					},
				} )
			} )
		}
	}

	updatePosition = () => {
		const markerRef = this.markerRef.current
		if ( markerRef !== null ) {
			const latLng = markerRef.leafletElement.getLatLng()
			this.props.setAttributes( {
				position: { lat: latLng.lat, lng: latLng.lng },
			} )
		}
	}

	render() {
		const {
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
		} = this.props

		const defaultClassName = getBlockDefaultClassName( name )

		const classes = classnames( className, {
			'is-selected': isSelected,
		} )

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
				attribution:
					'&#169; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles courtesy of <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>.',
			},
			watercolor: {
				url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
			},
		}

		const markerIconSvg =
			'<svg class="map-marker" height="42" width="26"><ellipse cx="13" cy="39" rx="7.5" ry="3" class="map-marker__shadow" opacity=".3" fill="#15151a"/><path class="map-marker__fill" d="M13 .5C6 .5.5 6 .5 13 .5 25 13 38.5 13 38.5S25.5 25 25.5 13C25.5 6 19.9.5 13 .5z" fill="#3e404f"/><path class="map-marker__glow" d="M13 1A12 12 0 0 0 1.021 13.45 12 12 0 0 1 13 2a12 12 0 0 1 12 11.574A12 12 0 0 0 13 1z" fill="#686a84"/><path class="map-marker__stroke" d="M13 .5C6 .5.5 6 .5 13 .5 25 13 38.5 13 38.5S25.5 25 25.5 13C25.5 6 19.9.5 13 .5z" fill="none" stroke="#15151a"/><circle cx="13" cy="13.098" r="5" class="map-marker__hole" fill="#15151a"/></svg>'

		const markerIcon = L.divIcon( {
			html: markerIconSvg,
			iconSize: [ 26, 42 ],
			iconAnchor: [ 13, 39 ],
			popupAnchor: [ 0, -42 ],
		} )

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
							onChange={ ( value ) => setAttributes( { zoom: value } ) }
						/>

						<ResponsiveSettingsTabPanel initialTabName="small">
							{ ( tab ) => (
								<SpacingControls
									valueLabel={ __( 'Height', 'fleximpleblocks' ) }
									unitLabel={ __( 'Height unit', 'fleximpleblocks' ) }
									initialPosition={ 0 }
									min={ 40 }
									max={ 1200 }
									attribute={ height }
									target={ tab.name }
									onChange={ ( value ) => setAttributes( { height: value } ) }
								/>
							) }
						</ResponsiveSettingsTabPanel>

						<SelectControl
							label={ __( 'Layer', 'fleximpleblocks' ) }
							value={ layer }
							options={ [
								{ label: __( 'Standard', 'fleximpleblocks' ), value: 'standard' },
								{ label: __( 'Black and white', 'fleximpleblocks' ), value: 'black-and-white' },
								{ label: __( 'Humanitarian', 'fleximpleblocks' ), value: 'humanitarian' },
								{ label: __( 'Watercolor', 'fleximpleblocks' ), value: 'watercolor' },
							] }
							onChange={ ( value ) => setAttributes( { layer: value } ) }
						/>

						<ToggleControl
							label={ __( 'Display popup', 'fleximpleblocks' ) }
							checked={ displayPopup }
							onChange={ () => setAttributes( { displayPopup: ! displayPopup } ) }
						/>

						{ !! displayPopup && (
							<TextareaControl
								label={ __( 'Popup content' ) }
								value={ popup }
								onChange={ ( value ) => setAttributes( { popup: value } ) }
								help={ __( 'Click on the marker to display the popup.', 'fleximpleblocks' ) }
							/>
						) }

						<ToggleControl
							label={ __( 'Display zoom control', 'fleximpleblocks' ) }
							checked={ displayZoomControl }
							onChange={ () => setAttributes( { displayZoomControl: ! displayZoomControl } ) }
						/>

						<ToggleControl
							label={ __( 'Display attribution control', 'fleximpleblocks' ) }
							checked={ displayAttributionControl }
							onChange={ () => setAttributes( { displayAttributionControl: ! displayAttributionControl } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<Map
					center={ position }
					zoom={ zoom }
					className={ classes }
					ref={ this.mapRef }
					zoomControl={ displayZoomControl }
					attributionControl={ displayAttributionControl }
				>
					<style>
						{ !! height.small.value &&
							`.${ defaultClassName } {
								${ height.small.value ? 'min-height:' + height.small.value + height.small.unit + ';' : '' }
							}` }

						{ !! height.medium.value &&
							`@media only screen and (min-width: ${
								fleximpleblocksPluginData.settings.mediumBreakpointValue
							}px) {
								.${ defaultClassName } {
									${ height.medium.value ? 'min-height:' + height.medium.value + height.medium.unit + ';' : '' }
								}
							}` }

						{ !! height.large.value &&
							`@media only screen and (min-width: ${
								fleximpleblocksPluginData.settings.largeBreakpointValue
							}px) {
								.${ defaultClassName } {
									${ height.large.value ? 'min-height:' + height.large.value + height.large.unit + ';' : '' }
								}
							}` }
					</style>

					<TileLayer attribution={ baseLayers[layer].attribution } url={ baseLayers[layer].url } />

					<Marker
						icon={ markerIcon }
						position={ position }
						draggable={ true }
						ondragend={ this.updatePosition }
						ref={ this.markerRef }
					>
						{ !! displayPopup && <Popup ref={ this.popupRef }>{ popup }</Popup> }
					</Marker>
				</Map>
			</>
		)
	}
}

export default MapEdit
