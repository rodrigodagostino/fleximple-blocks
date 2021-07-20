/**
 * COMPONENT: Location Search Input
 */

/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import AsyncSelect from 'react-select/async'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { BaseControl } from '@wordpress/components'

function LocationSelectControl( { attributes: { units, language }, setAttributes, hideLabelFromVision, help, instanceId } ) {
	const filterResults = searchResults => {
		return searchResults.list.map( searchResult => ( {
			label: searchResult.name + ', ' + searchResult.sys.country,
			value: searchResult.name + ',' + searchResult.sys.country,
		} ) )
	}

	const fetchPromiseOptions = async inputValue => {
		if ( !inputValue || inputValue.length < 3 ) return []
		const searchResults = await fetch(
			`https://api.openweathermap.org/data/2.5/find?q=${ encodeURIComponent( inputValue ) }&appid=${
				fleximpleblocksPluginData.settings.openWeatherApiKey
			}&units=${ units }&lang=${ language }`,
		).then( results => {
			return results.json()
		} )
		const filteredResults = await filterResults( searchResults )
		return filteredResults
	}

	const id = `fleximple-components-location-select-control-${ instanceId }`

	return (
		<>
			<BaseControl
				label={ __( 'Location', 'fleximpleblocks' ) }
				className="fleximple-components-select-control"
				hideLabelFromVision={ hideLabelFromVision }
				id={ id }
				help={ help }
			>
				<AsyncSelect
					className="react-select-container"
					classNamePrefix="react-select"
					// cacheOptions
					// defaultOptions={ defaultOptions }
					loadOptions={ fetchPromiseOptions }
					placeholder={ __( 'Search for a location…', 'fleximpleblocks' ) }
					onChange={ selectedOption => setAttributes( { cityName: selectedOption.value } ) }
					loadingMessage={ () => __( 'Loading…', 'fleximpleblocks' ) }
					noOptionsMessage={ () => __( 'No results found.', 'fleximpleblocks' ) }
				/>
			</BaseControl>
		</>
	)
}

export default LocationSelectControl
