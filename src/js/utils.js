export const setResponsiveAttribute = (
  attributes,
  setAttributes,
  attribute,
  targets,
  values,
) => {
  const newAttribute = { ...attributes[ attribute ] }
  if ( typeof targets === 'string' ) {
    newAttribute[ targets ] = values
  } else {
    targets.forEach( ( target, i ) => {
      newAttribute[ target ] = values[ i ]
    })
  }
  setAttributes({ [ attribute ]: newAttribute })
}

export const hexToRGB = ( hex ) => {
  if ( hex.length <= 4 ) {
    const hexArray = hex.match( /[\w\d]{1}/g )
    const rgbArray = []
    for ( const unit of hexArray ) {
      rgbArray.push( parseInt( unit + unit, 16 ) )
    }
    return `rgba(${ rgbArray.join( ',' ) })`
  }

  const hexArray = hex.match( /[\w\d]{2}/g )
  const rgbArray = []
  for ( const pair of hexArray ) {
    rgbArray.push( parseInt( pair, 16 ) )
  }
  return `rgba(${ rgbArray.join( ',' ) })`
}
