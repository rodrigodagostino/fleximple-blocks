/**
 * COMPONENT: Location Search Input
 */

/**
 * External dependencies
 */
import AsyncSelect from 'react-select/async'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { BaseControl } from '@wordpress/components'

function LocationSelectControl({
  setAttributes,
  hideLabelFromVision,
  help,
  instanceId,
}) {
  const filterResults = (searchResults) => {
    return searchResults.map((searchResult) => ({
      label: searchResult.display_name,
      value: {
        lat: searchResult.lat,
        lng: searchResult.lon,
      },
    }))
  }

  const fetchPromiseOptions = async (inputValue) => {
    if (!inputValue) {
      return []
    }
    const url = `https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${encodeURIComponent(
      inputValue
    )}&format=json`
    const searchResults = await fetch(url).then((results) => {
      return results.json()
    })
    const filteredResults = await filterResults(searchResults)
    return filteredResults
  }

  const id = `fleximple-components-location-select-control-${instanceId}`

  return (
    <>
      <BaseControl
        label={__('Location', 'fleximpleblocks')}
        className="fleximple-components-select-control"
        hideLabelFromVision={hideLabelFromVision}
        id={id}
        help={help}
      >
        <AsyncSelect
          className="react-select-container"
          classNamePrefix="react-select"
          // cacheOptions
          // defaultOptions={ defaultOptions }
          loadOptions={fetchPromiseOptions}
          placeholder={__('Search for a location…', 'fleximpleblocks')}
          onChange={(selectedOption) =>
            setAttributes({ position: selectedOption.value })
          }
          loadingMessage={() => __('Loading…', 'fleximpleblocks')}
          noOptionsMessage={() => __('No results found.', 'fleximpleblocks')}
        />
      </BaseControl>
    </>
  )
}

export default LocationSelectControl
