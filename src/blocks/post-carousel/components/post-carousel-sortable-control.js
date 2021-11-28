/**
 * COMPONENT: Post Sortable Control
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

const PostCarouselSortableControl = ({
  attributes,
  attributes: {
    orderArticle,
    orderContent,
    orderMedia,
    orderMeta,
  },
  setAttributes,
}) => {
  const onSortStart = () => {
    document.body.setAttribute( 'style', 'cursor:grabbing' )
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderArticle = arrayMoveImmutable( orderArticle, oldIndex, newIndex )
    setAttributes({ orderArticle })
  }

  const onMediaSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderMedia = arrayMoveImmutable( orderMedia, oldIndex, newIndex )
    setAttributes({ orderMedia })
  }

  const onContentSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderContent = arrayMoveImmutable( orderContent, oldIndex, newIndex )
    setAttributes({ orderContent })
  }

  const onMetaSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderMeta = arrayMoveImmutable( orderMeta, oldIndex, newIndex )
    setAttributes({ orderMeta })
  }

  const getLabel = attribute => {
    switch ( attribute ) {
      case 'media':
        return __( 'Media', 'fleximpleblocks' )
      case 'featuredImage':
        return __( 'Featured image', 'fleximpleblocks' )
      case 'content':
        return __( 'Content', 'fleximpleblocks' )
      case 'categories':
        return __( 'Categories', 'fleximpleblocks' )
      case 'title':
        return __( 'Title', 'fleximpleblocks' )
      case 'meta':
        return __( 'Meta', 'fleximpleblocks' )
      case 'author':
        return __( 'Author', 'fleximpleblocks' )
      case 'date':
        return __( 'Date', 'fleximpleblocks' )
      case 'comments':
        return __( 'Comments', 'fleximpleblocks' )
      case 'excerpt':
        return __( 'Excerpt', 'fleximpleblocks' )
      case 'readMore':
        return __( 'Read more', 'fleximpleblocks' )
    }
  }

  const getHelpText = ( attribute, state ) => {
    switch ( attribute ) {
      case 'media':
        return state === 'hidden'
          ? __( 'Display media', 'fleximpleblocks' )
          : __( 'Hide media', 'fleximpleblocks' )
      case 'featuredImage':
        return state === 'hidden'
          ? __( 'Display featured image', 'fleximpleblocks' )
          : __( 'Hide featured image', 'fleximpleblocks' )
      case 'content':
        return state === 'hidden'
          ? __( 'Display content', 'fleximpleblocks' )
          : __( 'Hide content', 'fleximpleblocks' )
      case 'categories':
        return state === 'hidden'
          ? __( 'Display categories', 'fleximpleblocks' )
          : __( 'Hide categories', 'fleximpleblocks' )
      case 'title':
        return state === 'hidden'
          ? __( 'Display title', 'fleximpleblocks' )
          : __( 'Hide title', 'fleximpleblocks' )
      case 'meta':
        return state === 'hidden'
          ? __( 'Display meta', 'fleximpleblocks' )
          : __( 'Hide meta', 'fleximpleblocks' )
      case 'author':
        return state === 'hidden'
          ? __( 'Display author', 'fleximpleblocks' )
          : __( 'Hide author', 'fleximpleblocks' )
      case 'date':
        return state === 'hidden'
          ? __( 'Display date', 'fleximpleblocks' )
          : __( 'Hide date', 'fleximpleblocks' )
      case 'comments':
        return state === 'hidden'
          ? __( 'Display comments', 'fleximpleblocks' )
          : __( 'Hide comments', 'fleximpleblocks' )
      case 'excerpt':
        return state === 'hidden'
          ? __( 'Display excerpt', 'fleximpleblocks' )
          : __( 'Hide excerpt', 'fleximpleblocks' )
      case 'readMore':
        return state === 'hidden'
          ? __( 'Display read more', 'fleximpleblocks' )
          : __( 'Hide read more', 'fleximpleblocks' )    
    }
  }

  const getState = attribute => {
    const displayAttribute = `display${ attribute.charAt( 0 ).toUpperCase() }${ attribute.slice( 1 ) }`
    return attributes[ displayAttribute ]
  }

  const toggleAttribute = attribute => {
    const displayAttribute = `display${ attribute.charAt( 0 ).toUpperCase() }${ attribute.slice( 1 ) }`
    setAttributes({ [ displayAttribute ]: !attributes[ displayAttribute ] })
  }

  const DragHandle = SortableHandle( () => {
    return (
      <div className="fleximple-components-sortable-control__drag-handle">
        <Icon icon={ interactionIcons.dragHandle } />
      </div>
    )
  })

  const Item = ({ value }) => {
    const label = getLabel( value )
    let icon = 'hidden'
    let text = getHelpText( value, 'hidden' )

    if ( getState( value ) ) {
      icon = 'visibility'
      text = getHelpText( value, 'visible' )
    }

    return (
      <div className="fleximple-components-sortable-control__item is-disabled">
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
  }

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
          // Used for not sortable items
          // if ( 'featuredImage' === value ) {
          // 	return <Item key={ `item-${ index }` } index={ index } value={ value } />;
          // }
          if ( 'media' === value ) {
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
                  onSortEnd={ onMediaSortEnd }
                  useDragHandle
                  // pressDelay={ 100 }
                  helperClass="fleximple-components-sortable-control__helper"
                />
              </>
            )
          }
          if ( 'content' === value ) {
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
                  onSortEnd={ onContentSortEnd }
                  useDragHandle
                  // pressDelay={ 100 }
                  helperClass="fleximple-components-sortable-control__helper"
                />
              </>
            )
          }
          if ( 'meta' === value ) {
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
                  onSortEnd={ onMetaSortEnd }
                  useDragHandle
                  // pressDelay={ 100 }
                  helperClass="fleximple-components-sortable-control__helper"
                />
              </>
            )
          }
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
        items={ orderArticle }
        onSortStart={ onSortStart }
        onSortEnd={ onSortEnd }
        useDragHandle
        // pressDelay={ 100 }
        helperClass="fleximple-components-sortable-control__helper"
      />
    </div>
  )
}

export default PostCarouselSortableControl
