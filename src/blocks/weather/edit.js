/* global fleximpleblocksPluginData */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, Placeholder, SelectControl, TextControl, ToggleControl } from '@wordpress/components'
import { useEffect, useRef, useState } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import { languages } from './components/definitions'
import LocationSelectControl from './components/location-select-control'
import Spinner from 'fleximple-components/components/spinner'

const { name } = metadata

function WeatherEdit( {
	className,
	attributes,
	attributes: { cityName, shortName, displayUnits, units, language },
	setAttributes,
} ) {
	const [ weatherData, setWeatherData ] = useState( null )
	const [ isFetching, setIsFetching ] = useState( true )
	const [ apiKey, setApiKey ] = useState( null )

	const prevCityName = useRef( 'Río Grande,AR' )
	const prevUnits = useRef( 'metric' )

	useEffect( () => {
		if ( !language ) {
			const lang = fleximpleblocksPluginData.locale.substr( 0, 2 )
			setAttributes( { language: lang } )
		}

		if ( !fleximpleblocksPluginData.settings.openWeatherApiKey ) return
		setApiKey( fleximpleblocksPluginData.settings.openWeatherApiKey )
	}, [] )
	
	useEffect( () => {
		if ( apiKey ) {
			fetchWeatherData()
		}
	}, [ apiKey ] )

	useEffect( () => {
		if ( prevCityName.current !== cityName || prevUnits.current !== units ) {
			fetchWeatherData()
		}
	}, [ cityName, units ] )

	const fetchWeatherData = () => {
		setIsFetching( true )

		const url = `https://api.openweathermap.org/data/2.5/weather?q=${ cityName }&appid=${ apiKey }&units=${ units }&lang=${ language }`
		fetch( url )
			.then( results => {
				return results.json()
			} )
			.then( data => {
				setWeatherData( data )
				setIsFetching( false )
			} )
			.catch( error => console.error( error ) )
	}

	const defaultClassName = getBlockDefaultClassName( name )

	const blockProps = useBlockProps( { className } )

	let timeOfDay = ''
	if ( weatherData && weatherData.cod === 200 ) {
		const timeStamp = weatherData.dt
		const sunrise = weatherData.sys.sunrise
		const sunset = weatherData.sys.sunset
		if ( timeStamp > sunrise && timeStamp < sunset ) {
			timeOfDay = 'day'
		} else {
			timeOfDay = 'night'
		}
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
					<LocationSelectControl { ...{ attributes, setAttributes } } />

					<TextControl
						label={ __( 'Short name', 'fleximpleblocks' ) }
						help={ __( 'The short name will be used in replacement of the name in small devices.', 'fleximpleblocks' ) }
						value={ shortName }
						onChange={ value => setAttributes( { shortName: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display units', 'fleximpleblocks' ) }
						checked={ displayUnits }
						onChange={ () => setAttributes( { displayUnits: !displayUnits } ) }
					/>

					<SelectControl
						label={ __( 'Units', 'fleximpleblocks' ) }
						labelPosition="top"
						value={ units }
						options={ [
							{
								label: __( 'Metric', 'fleximpleblocks' ),
								value: 'metric',
							},
							{
								label: __( 'Imperial', 'fleximpleblocks' ),
								value: 'imperial',
							},
							{
								label: __( 'Kelvin', 'fleximpleblocks' ),
								value: 'kelvin',
							},
						] }
						onChange={ value => setAttributes( { units: value } ) }
					/>

					<SelectControl
						label={ __( 'Language', 'fleximpleblocks' ) }
						labelPosition="top"
						value={ language }
						options={ languages }
						onChange={ value => setAttributes( { language: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ !apiKey &&
					<Placeholder className="fleximple-components-placeholder">
						<p>{ __( 'To make use of this block, you first need to set an OpenWeatherMap API key in the Fleximple Blocks settings page.', 'fleximpleblocks' ) }</p>
						<a href={ `${ fleximpleblocksPluginData.homeUrl }/wp-admin/admin.php?page=fleximpleblocks-settings` }>
							{ __( 'Take me there.' ) }
						</a>
					</Placeholder>
				}

				{ !!apiKey && !!isFetching &&
					<Placeholder className="fleximple-components-placeholder">
						<Spinner />
						<p>{ __( 'Loading…', 'fleximpleblocks' ) }</p>
					</Placeholder>
				}

				{ !!apiKey && !isFetching && !!weatherData &&
					<>
						{ !!shortName && 
							<style>
								{ `.${ defaultClassName }__city-name { display: none }
							@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.xlargeBreakpointValue }px) {
								.${ defaultClassName }__short-name { display: none }
								.${ defaultClassName }__city-name { display: inline-block }
							}` }
							</style>
						}

						<i
							className={ `${ defaultClassName }__icon wi wi-owm-${ timeOfDay }-${ weatherData.weather[ 0 ].id }` }
							alt={ weatherData.description }
						></i>
						<div className={ `${ defaultClassName }__temperature` }>
							<span className={ `${ defaultClassName }__temperature-number` }>
								{ Math.round( weatherData.main.temp ) }
							</span>
							{ ( units === 'metric' || units === 'imperial' ) &&
								<span className={ `${ defaultClassName }__temperature-degree-symbol` }>&deg;</span>
							}
							{ displayUnits && units === 'metric' &&
								<span className={ `${ defaultClassName }__temperature-units` }>C</span>
							}
							{ displayUnits && units === 'imperial' &&
								<span className={ `${ defaultClassName }__temperature-units` }>F</span>
							}
							{ displayUnits && units === 'kelvin' &&
								<span className={ `${ defaultClassName }__temperature-units` }>K</span>
							}
						</div>
						<span className={ `${ defaultClassName }__short-name` }>{ shortName }</span>
						<span className={ `${ defaultClassName }__city-name` }>{ weatherData.name }</span>
					</>
				}
			</div>
		</>
	)
}

export default WeatherEdit
