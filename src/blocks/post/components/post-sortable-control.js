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
import { Icon, Button } from '@wordpress/components'

/**
 * Internal dependencies
 */
import { interactionIcons } from 'fleximple-components/components/icons'

function PostSortableControl({
  attributes: {
    orderArticle,
    orderContent,
    orderMedia,
    orderMeta,
    displayMedia,
    displayFeaturedImage,
    displayAudio,
    displayContent,
    displayCategories,
    displayTitle,
    displayMeta,
    displayAuthor,
    displayDate,
    displayComments,
    displayExcerpt,
    displayReadMore,
    displayExtraArticles,
  },
  setAttributes,
}) {
  const onSortStart = () => {
    document.body.setAttribute( 'style', 'cursor:grabbing' )
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    setAttributes({
      orderArticle: arrayMoveImmutable( orderArticle, oldIndex, newIndex ),
    })
  }

  const onMediaSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    setAttributes({
      orderMedia: arrayMoveImmutable( orderMedia, oldIndex, newIndex ),
    })
  }

  const onContentSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    setAttributes({
      orderContent: arrayMoveImmutable( orderContent, oldIndex, newIndex ),
    })
  }

  const onMetaSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    setAttributes({
      orderMeta: arrayMoveImmutable( orderMeta, oldIndex, newIndex ),
    })
  }

  const getLabel = attribute => {
    if ( 'media' === attribute ) {
      return __( 'Media', 'fleximpleblocks' )
    }
    if ( 'featuredImage' === attribute ) {
      return __( 'Featured image', 'fleximpleblocks' )
    }
    if ( 'audio' === attribute ) {
      return __( 'Audio', 'fleximpleblocks' )
    }
    if ( 'content' === attribute ) {
      return __( 'Content', 'fleximpleblocks' )
    }
    if ( 'categories' === attribute ) {
      return __( 'Categories', 'fleximpleblocks' )
    }
    if ( 'title' === attribute ) {
      return __( 'Title', 'fleximpleblocks' )
    }
    if ( 'meta' === attribute ) {
      return __( 'Meta', 'fleximpleblocks' )
    }
    if ( 'author' === attribute ) {
      return __( 'Author', 'fleximpleblocks' )
    }
    if ( 'date' === attribute ) {
      return __( 'Date', 'fleximpleblocks' )
    }
    if ( 'comments' === attribute ) {
      return __( 'Comments', 'fleximpleblocks' )
    }
    if ( 'excerpt' === attribute ) {
      return __( 'Excerpt', 'fleximpleblocks' )
    }
    if ( 'readMore' === attribute ) {
      return __( 'Read more', 'fleximpleblocks' )
    }
    if ( 'extraArticles' === attribute ) {
      return __( 'Extra articles', 'fleximpleblocks' )
    }
  }

  const getHelpText = ( attribute, state ) => {
    if ( 'media' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display media', 'fleximpleblocks' )
      }
      return __( 'Hide media', 'fleximpleblocks' )
    }
    if ( 'featuredImage' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display featured image', 'fleximpleblocks' )
      }
      return __( 'Hide featured image', 'fleximpleblocks' )
    }
    if ( 'audio' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display audio', 'fleximpleblocks' )
      }
      return __( 'Hide audio', 'fleximpleblocks' )
    }
    if ( 'content' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display content', 'fleximpleblocks' )
      }
      return __( 'Hide content', 'fleximpleblocks' )
    }
    if ( 'categories' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display categories', 'fleximpleblocks' )
      }
      return __( 'Hide categories', 'fleximpleblocks' )
    }
    if ( 'title' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display title', 'fleximpleblocks' )
      }
      return __( 'Hide title', 'fleximpleblocks' )
    }
    if ( 'meta' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display meta', 'fleximpleblocks' )
      }
      return __( 'Hide meta', 'fleximpleblocks' )
    }
    if ( 'author' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display author', 'fleximpleblocks' )
      }
      return __( 'Hide author', 'fleximpleblocks' )
    }
    if ( 'date' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display date', 'fleximpleblocks' )
      }
      return __( 'Hide date', 'fleximpleblocks' )
    }
    if ( 'comments' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display comments', 'fleximpleblocks' )
      }
      return __( 'Hide comments', 'fleximpleblocks' )
    }
    if ( 'excerpt' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display excerpt', 'fleximpleblocks' )
      }
      return __( 'Hide excerpt', 'fleximpleblocks' )
    }
    if ( 'readMore' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display read more', 'fleximpleblocks' )
      }
      return __( 'Hide read more', 'fleximpleblocks' )
    }
    if ( 'extraArticles' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display extra articles', 'fleximpleblocks' )
      }
      return __( 'Hide extra articles', 'fleximpleblocks' )
    }
  }

  const getState = attribute => {
    if ( 'media' === attribute ) {
      return displayMedia
    }
    if ( 'featuredImage' === attribute ) {
      return displayFeaturedImage
    }
    if ( 'audio' === attribute ) {
      return displayAudio
    }
    if ( 'content' === attribute ) {
      return displayContent
    }
    if ( 'categories' === attribute ) {
      return displayCategories
    }
    if ( 'title' === attribute ) {
      return displayTitle
    }
    if ( 'meta' === attribute ) {
      return displayMeta
    }
    if ( 'author' === attribute ) {
      return displayAuthor
    }
    if ( 'date' === attribute ) {
      return displayDate
    }
    if ( 'comments' === attribute ) {
      return displayComments
    }
    if ( 'excerpt' === attribute ) {
      return displayExcerpt
    }
    if ( 'readMore' === attribute ) {
      return displayReadMore
    }
    if ( 'extraArticles' === attribute ) {
      return displayExtraArticles
    }
  }

  const toggleAttribute = attribute => {
    if ( 'media' === attribute ) {
      setAttributes({ displayMedia: !displayMedia })
    }
    if ( 'featuredImage' === attribute ) {
      setAttributes({ displayFeaturedImage: !displayFeaturedImage })
    }
    if ( 'audio' === attribute ) {
      setAttributes({ displayAudio: !displayAudio })
    }
    if ( 'content' === attribute ) {
      setAttributes({ displayContent: !displayContent })
    }
    if ( 'categories' === attribute ) {
      setAttributes({ displayCategories: !displayCategories })
    }
    if ( 'title' === attribute ) {
      setAttributes({ displayTitle: !displayTitle })
    }
    if ( 'meta' === attribute ) {
      setAttributes({ displayMeta: !displayMeta })
    }
    if ( 'author' === attribute ) {
      setAttributes({ displayAuthor: !displayAuthor })
    }
    if ( 'date' === attribute ) {
      setAttributes({ displayDate: !displayDate })
    }
    if ( 'comments' === attribute ) {
      setAttributes({ displayComments: !displayComments })
    }
    if ( 'excerpt' === attribute ) {
      setAttributes({ displayExcerpt: !displayExcerpt })
    }
    if ( 'readMore' === attribute ) {
      setAttributes({ displayReadMore: !displayReadMore })
    }
    if ( 'extraArticles' === attribute ) {
      setAttributes({ displayExtraArticles: !displayExtraArticles })
    }
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
          // if ( 'featuredImage' === value || 'audio' === value ) {
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
            <SortableItem
              key={ `item-${ index }` }
              index={ index }
              value={ value }
            />
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

export default PostSortableControl
