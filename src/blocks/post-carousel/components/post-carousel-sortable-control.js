/**
 * COMPONENT: Post Sortable Control
 */

/**
 * External dependencies
 */
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Icon, Button } from '@wordpress/components'
import { Component } from '@wordpress/element'

/**
 * Internal dependencies
 */
import { interactionIcons } from 'fleximple-components/components/icons'


class RecentPostsSortableControl extends Component {
  constructor() {
    super( ...arguments )

    this.onSortStart = this.onSortStart.bind( this )
    this.onContentSortEnd = this.onContentSortEnd.bind( this )
    this.onMediaSortEnd = this.onMediaSortEnd.bind( this )
    this.onMetaSortEnd = this.onMetaSortEnd.bind( this )
    this.getLabel = this.getLabel.bind( this )
    this.getHelpText = this.getHelpText.bind( this )
    this.getState = this.getState.bind( this )
    this.toggleAttribute = this.toggleAttribute.bind( this )

    this.state = {}
  }

  onSortStart = () => {
    document.body.setAttribute( 'style', 'cursor:grabbing' )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderArticle = arrayMoveImmutable( this.props.attributes.orderArticle, oldIndex, newIndex )
    this.props.setAttributes({ orderArticle })
  }

  onMediaSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderMedia = arrayMoveImmutable( this.props.attributes.orderMedia, oldIndex, newIndex )
    this.props.setAttributes({ orderMedia })
  }

  onContentSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderContent = arrayMoveImmutable( this.props.attributes.orderContent, oldIndex, newIndex )
    this.props.setAttributes({ orderContent })
  }

  onMetaSortEnd = ({ oldIndex, newIndex }) => {
    document.body.removeAttribute( 'style' )
    const orderMeta = arrayMoveImmutable( this.props.attributes.orderMeta, oldIndex, newIndex )
    this.props.setAttributes({ orderMeta })
  }

  getLabel( attribute ) {
    if ( 'media' === attribute ) {
      return __( 'Media', 'fleximpleblocks' )
    }
    if ( 'featuredImage' === attribute ) {
      return __( 'Featured image', 'fleximpleblocks' )
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
  }

  getHelpText( attribute, state ) {
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
  }

  getState( attribute ) {
    if ( 'media' === attribute ) {
      return this.props.attributes.displayMedia
    }
    if ( 'featuredImage' === attribute ) {
      return this.props.attributes.displayFeaturedImage
    }
    if ( 'content' === attribute ) {
      return this.props.attributes.displayContent
    }
    if ( 'categories' === attribute ) {
      return this.props.attributes.displayCategories
    }
    if ( 'title' === attribute ) {
      return this.props.attributes.displayTitle
    }
    if ( 'meta' === attribute ) {
      return this.props.attributes.displayMeta
    }
    if ( 'author' === attribute ) {
      return this.props.attributes.displayAuthor
    }
    if ( 'date' === attribute ) {
      return this.props.attributes.displayDate
    }
    if ( 'comments' === attribute ) {
      return this.props.attributes.displayComments
    }
    if ( 'excerpt' === attribute ) {
      return this.props.attributes.displayExcerpt
    }
    if ( 'readMore' === attribute ) {
      return this.props.attributes.displayReadMore
    }
  }

  toggleAttribute( attribute ) {
    if ( 'media' === attribute ) {
      this.props.setAttributes({ displayMedia: !this.props.attributes.displayMedia })
    }
    if ( 'featuredImage' === attribute ) {
      this.props.setAttributes({ displayFeaturedImage: !this.props.attributes.displayFeaturedImage })
    }
    if ( 'content' === attribute ) {
      this.props.setAttributes({ displayContent: !this.props.attributes.displayContent })
    }
    if ( 'categories' === attribute ) {
      this.props.setAttributes({ displayCategories: !this.props.attributes.displayCategories })
    }
    if ( 'title' === attribute ) {
      this.props.setAttributes({ displayTitle: !this.props.attributes.displayTitle })
    }
    if ( 'meta' === attribute ) {
      this.props.setAttributes({ displayMeta: !this.props.attributes.displayMeta })
    }
    if ( 'author' === attribute ) {
      this.props.setAttributes({ displayAuthor: !this.props.attributes.displayAuthor })
    }
    if ( 'date' === attribute ) {
      this.props.setAttributes({ displayDate: !this.props.attributes.displayDate })
    }
    if ( 'comments' === attribute ) {
      this.props.setAttributes({ displayComments: !this.props.attributes.displayComments })
    }
    if ( 'excerpt' === attribute ) {
      this.props.setAttributes({ displayExcerpt: !this.props.attributes.displayExcerpt })
    }
    if ( 'readMore' === attribute ) {
      this.props.setAttributes({ displayReadMore: !this.props.attributes.displayReadMore })
    }
  }

  render() {
    const {
      attributes: {
        orderArticle,
        orderContent,
        orderMedia,
        orderMeta,
      },
    } = this.props

    const DragHandle = SortableHandle( () => {
      return (
        <div className="fleximple-components-sortable-control__drag-handle">
          <Icon icon={ interactionIcons.dragHandle } />
        </div>
      )
    })

    const Item = ({ value }) => {
      const label = this.getLabel( value )
      let icon = 'hidden'
      let text = this.getHelpText( value, 'hidden' )

      if ( this.getState( value ) ) {
        icon = 'visibility'
        text = this.getHelpText( value, 'visible' )
      }

      return (
        <div className="fleximple-components-sortable-control__item is-disabled">
          <div className="fleximple-components-sortable-control__label">{ label }</div>
          <Button
            icon={ icon }
            label={ text }
            className="fleximple-components-sortable-control__button"
            onClick={ () => this.toggleAttribute( value ) }
          />
        </div>
      )
    }

    const SortableItem = SortableElement( ({ value }) => {
      const label = this.getLabel( value )
      let icon = 'hidden'
      let text = this.getHelpText( value, 'hidden' )

      if ( this.getState( value ) ) {
        icon = 'visibility'
        text = this.getHelpText( value, 'visible' )
      }

      return (
        <div className="fleximple-components-sortable-control__item">
          <DragHandle />
          <div className="fleximple-components-sortable-control__label">{ label }</div>
          <Button
            icon={ icon }
            label={ text }
            className="fleximple-components-sortable-control__button"
            onClick={ () => this.toggleAttribute( value ) }
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
                  <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
                  <SortableList
                    items={ orderMedia }
                    onSortStart={ this.onSortStart }
                    onSortEnd={ this.onMediaSortEnd }
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
                  <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
                  <SortableList
                    items={ orderContent }
                    onSortStart={ this.onSortStart }
                    onSortEnd={ this.onContentSortEnd }
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
                  <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
                  <SortableList
                    items={ orderMeta }
                    onSortStart={ this.onSortStart }
                    onSortEnd={ this.onMetaSortEnd }
                    useDragHandle
                    // pressDelay={ 100 }
                    helperClass="fleximple-components-sortable-control__helper"
                  />
                </>
              )
            }
            return <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
          }) }
        </div>
      )
    })

    return (
      <div className="fleximple-components-sortable-control">
        <SortableList
          items={ orderArticle }
          onSortStart={ this.onSortStart }
          onSortEnd={ this.onSortEnd }
          useDragHandle
          // pressDelay={ 100 }
          helperClass="fleximple-components-sortable-control__helper"
        />
      </div>
    )
  }
}

export default RecentPostsSortableControl
