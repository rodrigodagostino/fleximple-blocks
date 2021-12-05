/**
 * COMPONENT: Post Sortable Control
 */

/**
 * External dependencies
 */
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components'

/**
 * Internal dependencies
 */
import {
  DragHandle,
  getHelpText,
  getLabel,
  getState,
  onSortStart,
  onSortEnd,
  toggleAttribute,
} from '../../../js/sortable-control'

const RecentPostsSortableControl = ({
  attributes,
  attributes: { orderArticle, orderContent, orderMedia, orderMeta },
  setAttributes,
}) => {
  const SortableItem = SortableElement( ({ value }) => {
    const label = getLabel( value )
    let icon = 'hidden'
    let text = getHelpText( value, 'hidden' )

    if ( getState( value, attributes ) ) {
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
          onClick={ () => toggleAttribute( value, attributes, setAttributes ) }
        />
      </div>
    )
  })

  const SortableList = SortableContainer( ({ items }) => {
    return (
      <div className="fleximple-components-sortable-control__sortable-list">
        { items.map( ( value, index ) => {
          switch ( value ) {
            case 'media':
              return (
                <>
                  <SortableItem
                    key={ `item-${ index }` }
                    index={ index }
                    value={ value }
                  />
                  <SortableList
                    items={ orderMedia }
                    onSortStart={ onSortStart }
                    onSortEnd={ ( sortEnd, e ) =>
                      onSortEnd( sortEnd, e, 'orderMedia', orderMedia, setAttributes )
                    }
                    useDragHandle
                    helperClass="fleximple-components-sortable-control__helper"
                  />
                </>
              )
            case 'content':
              return (
                <>
                  <SortableItem
                    key={ `item-${ index }` }
                    index={ index }
                    value={ value }
                  />
                  <SortableList
                    items={ orderContent }
                    onSortStart={ onSortStart }
                    onSortEnd={ ( sortEnd, e ) =>
                      onSortEnd( sortEnd, e, 'orderContent', orderContent, setAttributes )
                    }
                    useDragHandle
                    helperClass="fleximple-components-sortable-control__helper"
                  />
                </>
              )
            case 'meta':
              return (
                <>
                  <SortableItem
                    key={ `item-${ index }` }
                    index={ index }
                    value={ value }
                  />
                  <SortableList
                    items={ orderMeta }
                    onSortStart={ onSortStart }
                    onSortEnd={ ( sortEnd, e ) =>
                      onSortEnd( sortEnd, e, 'orderMeta', orderMeta, setAttributes )
                    }
                    useDragHandle
                    helperClass="fleximple-components-sortable-control__helper"
                  />
                </>
              )
            default:
              return (
                <SortableItem
                  key={ `item-${ index }` }
                  index={ index }
                  value={ value }
                />
              )
          }
        }) }
      </div>
    )
  })

  return (
    <div className="fleximple-components-sortable-control">
      <SortableList
        items={ orderArticle }
        onSortStart={ onSortStart }
        onSortEnd={ ( sortEnd, e ) =>
          onSortEnd( sortEnd, e, 'orderArticle', orderArticle, setAttributes )
        }
        useDragHandle
        helperClass="fleximple-components-sortable-control__helper"
      />
    </div>
  )
}

export default RecentPostsSortableControl
