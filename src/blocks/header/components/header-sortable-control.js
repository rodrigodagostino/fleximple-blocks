/**
 * COMPONENT: Header Sortable Control
 */

/**
 * External dependencies
 */
import arrayMove from 'array-move'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Button, Icon, Path, SVG } from '@wordpress/components'

function HeaderSortableControl( {
	attributes: { order, displayHeading, displaySubhead, displayAdditional },
	setAttributes,
} ) {
	const onSortStart = () => {
		document.body.setAttribute( 'style', 'cursor:grabbing' )
	}

	const onSortEnd = ( { oldIndex, newIndex } ) => {
		document.body.removeAttribute( 'style' )
		setAttributes( { order: arrayMove( order, oldIndex, newIndex ) } )
	}

	const getLabel = ( attribute ) => {
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

	const getHelpText = ( attribute, state ) => {
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

	const getState = ( attribute ) => {
		if ( 'heading' === attribute ) {
			return displayHeading
		}
		if ( 'subhead' === attribute ) {
			return displaySubhead
		}
		if ( 'additional' === attribute ) {
			return displayAdditional
		}
	}

	const toggleAttribute = ( attribute ) => {
		if ( 'heading' === attribute ) {
			setAttributes( { displayHeading: ! displayHeading } )
		}
		if ( 'subhead' === attribute ) {
			setAttributes( { displaySubhead: ! displaySubhead } )
		}
		if ( 'additional' === attribute ) {
			setAttributes( { displayAdditional: ! displayAdditional } )
		}
	}

	const DragHandle = SortableHandle( () => {
		return (
			<div className="fleximple-components-sortable-control__drag-handle">
				<Icon
					icon={ () => (
						<SVG width="18" height="18" aria-hidden="true">
							<Path d="M10 13c0 .6.4 1 1 1s1-.4 1-1-.4-1-1-1-1 .4-1 1zm2-8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zM8 5c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zm0 8c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zm4-4c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1zM8 9c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1z" />
						</SVG>
					) }
				/>
			</div>
		)
	} )

	const SortableItem = SortableElement( ( { value } ) => {
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
				<div className="fleximple-components-sortable-control__label">{ label }</div>
				<Button
					icon={ icon }
					label={ text }
					className="fleximple-components-sortable-control__button"
					onClick={ () => toggleAttribute( value ) }
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
				onSortStart={ onSortStart }
				onSortEnd={ onSortEnd }
				useDragHandle
				// pressDelay={ 100 }
				helperClass="fleximple-components-sortable-control__helper"
			/>
		</div>
	)
}

export default HeaderSortableControl
