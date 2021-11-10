/**
   * COMPONENT: Feature Sortable Control
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
const { Icon, Button } = wp.components
import { Component } from '@wordpress/element'

class FeatureSortableControl extends Component {
  constructor() {
    super( ...arguments )

    this.onSortStart = this.onSortStart.bind( this )
    this.onSortEnd = this.onSortEnd.bind( this )
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
    const order = arrayMoveImmutable(
      this.props.attributes.order,
      oldIndex,
      newIndex,
    )
    this.props.setAttributes({ order })
  }

  getLabel( attribute ) {
    if ( 'heading' === attribute ) {
      return __( 'Heading', 'fleximpleblocks' )
    }
    if ( 'subhead' === attribute ) {
      return __( 'Subhead', 'fleximpleblocks' )
    }
    if ( 'additional' === attribute ) {
      return __( 'Additional content', 'fleximpleblocks' )
    }
  }

  getHelpText( attribute, state ) {
    if ( 'heading' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display heading', 'fleximpleblocks' )
      }
      return __( 'Hide heading', 'fleximpleblocks' )
    }
    if ( 'subhead' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display subhead', 'fleximpleblocks' )
      }
      return __( 'Hide subhead', 'fleximpleblocks' )
    }
    if ( 'additional' === attribute ) {
      if ( state === 'hidden' ) {
        return __( 'Display additional content', 'fleximpleblocks' )
      }
      return __( 'Hide additional content', 'fleximpleblocks' )
    }
  }

  getState( attribute ) {
    if ( 'heading' === attribute ) {
      return this.props.attributes.displayHeading
    }
    if ( 'subhead' === attribute ) {
      return this.props.attributes.displaySubhead
    }
    if ( 'additional' === attribute ) {
      return this.props.attributes.displayAdditional
    }
  }

  toggleAttribute( attribute ) {
    if ( 'heading' === attribute ) {
      this.props.setAttributes({
        displayHeading: !this.props.attributes.displayHeading,
      })
    }
    if ( 'subhead' === attribute ) {
      this.props.setAttributes({
        displaySubhead: !this.props.attributes.displaySubhead,
      })
    }
    if ( 'additional' === attribute ) {
      this.props.setAttributes({
        displayAdditional: !this.props.attributes.displayAdditional,
      })
    }
  }

  render() {
    const {
      attributes: { order },
    } = this.props

    const DragHandle = SortableHandle( () => {
      return (
        <div className="fleximple-components-sortable-control__drag-handle">
          <Icon
            icon={ () => 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path d="M10 13c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1-1 .4-1 1zm2-8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zM8 5c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zm0 8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zm4-4c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zM8 9c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1z" />
              </svg>
            }
          />
        </div>
      )
    })

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
          <div className="fleximple-components-sortable-control__label">
            { label }
          </div>
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

export default FeatureSortableControl
