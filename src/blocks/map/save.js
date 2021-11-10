/* global fleximpleblocksPluginData */

/**
 * Internal dependencies
 */
import metadata from './block.json'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { useBlockProps } from '@wordpress/block-editor'

const { name } = metadata

function MapSave({
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
}) {
  const defaultClassName = getBlockDefaultClassName( name )

  const baseLayers = {
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
    },
    'black-and-white': {
      url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
    },
    humanitarian: {
      url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles courtesy of Humanitarian OpenStreetMap Team.',
    },
    watercolor: {
      url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    },
  }

  return (
    <div { ...useBlockProps.save() }>
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

      <div
        className="leaflet-container"
        data-latitude={ position.lat }
        data-longitude={ position.lng }
        data-layer={ baseLayers[ layer ].url }
        data-attribution={ baseLayers[ layer ].attribution }
        data-zoom={ zoom }
        data-popup={ displayPopup ? popup : undefined }
        data-zoom-control={ displayZoomControl ? true : '' }
        data-attribution-control={ displayAttributionControl ? true : '' }
      />
    </div>
  )
}

export default MapSave
