/**
 * COMPONENT: Post Order
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
const { Icon, Button } = wp.components
import { Component } from '@wordpress/element'


class TestimonialSortableControl extends Component {
	constructor() {
		super( ...arguments )

		this.onContentSortEnd = this.onContentSortEnd.bind( this )
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

	onContentSortEnd = ( { oldIndex, newIndex } ) => {
		document.body.removeAttribute( 'style' )
		const order = arrayMoveImmutable( this.props.attributes.order, oldIndex, newIndex )
		this.props.setAttributes( { order } )
	}

	onMetaSortEnd = ( { oldIndex, newIndex } ) => {
		document.body.removeAttribute( 'style' )
		const orderMeta = arrayMoveImmutable( this.props.attributes.orderMeta, oldIndex, newIndex )
		this.props.setAttributes( { orderMeta } )
	}

	getLabel( attribute ) {
		if ( 'icon' === attribute ) {
			return __( 'Icon', 'fleximpleblocks' )
		}
		if ( 'quote' === attribute ) {
			return __( 'Quote', 'fleximpleblocks' )
		}
		if ( 'media' === attribute ) {
			return __( 'Media', 'fleximpleblocks' )
		}
		if ( 'reference' === attribute ) {
			return __( 'Reference', 'fleximpleblocks' )
		}
	}

	getHelpText( attribute, state ) {
		if ( 'icon' === attribute ) {
			if ( state === 'hidden' ) {
				return __( 'Display icon', 'fleximpleblocks' )
			}
			return __( 'Hide icon', 'fleximpleblocks' )
		}
		if ( 'quote' === attribute ) {
			if ( state === 'hidden' ) {
				return __( 'Display quote', 'fleximpleblocks' )
			}
			return __( 'Hide quote', 'fleximpleblocks' )
		}
		if ( 'media' === attribute ) {
			if ( state === 'hidden' ) {
				return __( 'Display media', 'fleximpleblocks' )
			}
			return __( 'Hide media', 'fleximpleblocks' )
		}
		if ( 'reference' === attribute ) {
			if ( state === 'hidden' ) {
				return __( 'Display reference', 'fleximpleblocks' )
			}
			return __( 'Hide reference', 'fleximpleblocks' )
		}
	}

	getState( attribute ) {
		if ( 'icon' === attribute ) {
			return this.props.attributes.displayIcon
		}
		if ( 'quote' === attribute ) {
			return this.props.attributes.displayQuote
		}
		if ( 'media' === attribute ) {
			return this.props.attributes.displayMedia
		}
		if ( 'reference' === attribute ) {
			return this.props.attributes.displayReference
		}
	}

	toggleAttribute( attribute ) {
		if ( 'icon' === attribute ) {
			this.props.setAttributes( { displayIcon: !this.props.attributes.displayIcon } )
		}
		if ( 'quote' === attribute ) {
			this.props.setAttributes( { displayQuote: !this.props.attributes.displayQuote } )
		}
		if ( 'media' === attribute ) {
			this.props.setAttributes( { displayMedia: !this.props.attributes.displayMedia } )
		}
		if ( 'reference' === attribute ) {
			this.props.setAttributes( { displayReference: !this.props.attributes.displayReference } )
		}
	}

	render() {
		const { attributes: { order } } = this.props

		const DragHandle = SortableHandle( () => {
			return (
				<div className="fleximple-components-sortable-control__drag-handle">
					<Icon icon={ () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-hidden="true"><path d="M10 13c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1-1 .4-1 1zm2-8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zM8 5c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zm0 8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zm4-4c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zM8 9c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1z" /></svg> } />
				</div>
			)
		} )

		const SortableItem = SortableElement( ( { value } ) => {
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
		} )

		const SortableList = SortableContainer( ( { items } ) => {
			return (
				<div className="fleximple-components-sortable-control__sortable-list">
					{ items.map( ( value, index ) => {
						return <SortableItem key={ `item-${ index }` } index={ index } value={ value } />
					} ) }
				</div>
			)
		} )

		return (
			<div className="fleximple-components-sortable-control">
				<SortableList
					items={ order }
					onSortStart={ this.onSortStart }
					onSortEnd={ this.onContentSortEnd }
					useDragHandle
					// pressDelay={ 100 }
					helperClass="fleximple-components-sortable-control__helper"
				/>
			</div>
		)
	}
}

export default TestimonialSortableControl
