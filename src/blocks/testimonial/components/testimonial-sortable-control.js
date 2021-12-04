/**
 * COMPONENT: Post Order
 */

/**
 * External dependencies
 */
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Button, Icon } from '@wordpress/components'

/**
 * Internal dependencies
 */
import { interactionIcons } from 'fleximple-components/components/icons'

const TestimonialSortableControl = ({
  attributes,
  attributes: { order },
  setAttributes,
}) => {
  const onSortStart = () => {
    document.body.setAttribute( 'style', 'cursor:grabbing' )
  }

  const onContentSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const order = arrayMoveImmutable( order, oldIndex, newIndex )
    setAttributes({ order })
  }

  const getLabel = attribute => {
    switch ( attribute ) {
      case 'icon':
        return __( 'Icon', 'fleximpleblocks' )
      case 'quote':
        return __( 'Quote', 'fleximpleblocks' )
      case 'media':
        return __( 'Media', 'fleximpleblocks' )
      case 'reference':
        return __( 'Reference', 'fleximpleblocks' )
    }
  }

  const getHelpText = ( attribute, state ) => {
    switch ( attribute ) {
      case 'icon':
        return state === 'hidden'
          ? __( 'Display icon', 'fleximpleblocks' )
          : __( 'Hide icon', 'fleximpleblocks' )
      case 'quote':
        return state === 'hidden'
          ? __( 'Display quote', 'fleximpleblocks' )
          : __( 'Hide quote', 'fleximpleblocks' )
      case 'media':
        return state === 'hidden'
          ? __( 'Display media', 'fleximpleblocks' )
          : __( 'Hide media', 'fleximpleblocks' )
      case 'reference':
        return state === 'hidden'
          ? __( 'Display reference', 'fleximpleblocks' )
          : __( 'Hide reference', 'fleximpleblocks' )
    }
  }

  const getState = attribute => {
    const displayAttribute = `display${ attribute
      .charAt( 0 )
      .toUpperCase() }${ attribute.slice( 1 ) }`
    return attributes[ displayAttribute ]
  }

  const toggleAttribute = attribute => {
    const displayAttribute = `display${ attribute
      .charAt( 0 )
      .toUpperCase() }${ attribute.slice( 1 ) }`
    setAttributes({ [ displayAttribute ]: !attributes[ displayAttribute ] })
  }

  const DragHandle = SortableHandle( () => {
    return (
      <div className="fleximple-components-sortable-control__drag-handle">
        <Icon icon={ interactionIcons.dragHandle } />
      </div>
    )
  })

  const SortableItem = SortableElement( ({ value }) => {
    const label = getLabel( value )
    let icon = 'hidden'
    let text = getHelpText( value, 'hidden' )

    if ( getState( value ) ) {
      icon = 'visibility'
      text = getHelpText( value, 'visible' )
    }

    return (
      <div className="fleximple-components-sortable-control__item">
        <DragHandle />
        <div className="fleximple-components-sortable-control__label">
          { label }
        </div>
        <Button
          icon={ icon }
          label={ text }
          className="fleximple-components-sortable-control__button"
          onClick={ () => toggleAttribute( value ) }
        />
      </div>
    )
  })

  const SortableList = SortableContainer( ({ items }) => {
    return (
      <div className="fleximple-components-sortable-control__sortable-list">
        { items.map( ( value, index ) => {
          return (
            <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
          )
        }) }
      </div>
    )
  })

  return (
    <div className="fleximple-components-sortable-control">
      <SortableList
        items={ order }
        onSortStart={ onSortStart }
        onSortEnd={ onContentSortEnd }
        useDragHandle
        helperClass="fleximple-components-sortable-control__helper"
      />
    </div>
  )
}

export default TestimonialSortableControl
