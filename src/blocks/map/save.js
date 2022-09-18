/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { useBlockProps } from '@wordpress/block-editor'

const { name } = metadata

function MapSave({
  attributes,
  attributes: {
    blockId,
    position,
    zoom,
    layer,
    popup,
    displayPopup,
    displayZoomControl,
    displayAttributionControl,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const baseLayers = {
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
    },
    'black-and-white': {
      url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      attribution:
        '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors.',
    },
    humanitarian: {
      url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution:
        '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles courtesy of Humanitarian OpenStreetMap Team.',
    },
    watercolor: {
      url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
    },
  }

  return (
    <div {...useBlockProps.save()} data-block-id={blockId}>
      <div
        className="leaflet-container"
        data-latitude={position.lat}
        data-longitude={position.lng}
        data-layer={baseLayers[layer].url}
        data-attribution={baseLayers[layer].attribution}
        data-zoom={zoom}
        data-popup={displayPopup ? popup : undefined}
        data-zoom-control={displayZoomControl ? true : ''}
        data-attribution-control={displayAttributionControl ? true : ''}
      />

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default MapSave
