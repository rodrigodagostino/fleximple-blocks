/**
 * Leaflet dependencies
 */
// import L from 'leaflet'

/**
 * Leaflet Front-end Scripts
 */
const maps = document.querySelectorAll( '.leaflet-container' )

for ( let i = 0; i < maps.length; i++ ) {
  let id
  if ( maps.length === 1 ) {
    id = 'leaflet-map'
    maps[ i ].id = id
  } else {
    id = `leaflet-map-${ i }`
    maps[ i ].id = id
  }

  const latitude = maps[ i ].getAttribute( 'data-latitude' )
  const longitude = maps[ i ].getAttribute( 'data-longitude' )
  const layer = maps[ i ].getAttribute( 'data-layer' )
  const attribution = maps[ i ].getAttribute( 'data-attribution' )
  const zoom = maps[ i ].getAttribute( 'data-zoom' )
  const popup = maps[ i ].getAttribute( 'data-popup' )
  const zoomControl = maps[ i ].getAttribute( 'data-zoom-control' )
  const attributionControl = maps[ i ].getAttribute( 'data-attribution-control' )

  const map = L.map( id, { zoomControl, attributionControl }).setView( [ latitude, longitude ], zoom )

  L.tileLayer( layer, { attribution }).addTo( map )

  const markerIconSvg =
		'<svg class="map-marker" height="42" width="26"><ellipse cx="13" cy="39" rx="7.5" ry="3" class="map-marker__shadow" opacity=".3" fill="#15151a"/><path class="map-marker__fill" d="M13 .5C6 .5.5 6 .5 13 .5 25 13 38.5 13 38.5S25.5 25 25.5 13C25.5 6 19.9.5 13 .5z" fill="#3e404f"/><path class="map-marker__glow" d="M13 1A12 12 0 0 0 1.021 13.45 12 12 0 0 1 13 2a12 12 0 0 1 12 11.574A12 12 0 0 0 13 1z" fill="#686a84"/><path class="map-marker__stroke" d="M13 .5C6 .5.5 6 .5 13 .5 25 13 38.5 13 38.5S25.5 25 25.5 13C25.5 6 19.9.5 13 .5z" fill="none" stroke="#15151a"/><circle cx="13" cy="13.098" r="5" class="map-marker__hole" fill="#15151a"/></svg>'

  const markerIcon = L.divIcon({
    html: markerIconSvg,
    iconSize: [ 26, 42 ],
    iconAnchor: [ 13, 39 ],
    popupAnchor: [ 0, -42 ],
  })

  if ( popup ) {
    L.marker( [ latitude, longitude ], { icon: markerIcon }).addTo( map ).bindPopup( popup ).openPopup()
  } else {
    L.marker( [ latitude, longitude ], { icon: markerIcon }).addTo( map )
  }
}
