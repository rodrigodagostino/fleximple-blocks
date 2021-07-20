/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import {
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components'
import { compose } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import { useEffect, useState } from '@wordpress/element'

/**
 * Internal dependencies
 */
import SpacingControls from 'fleximple-components/components/spacing-controls'

function IframeEdit( {
	attributes: {
		url,
		width,
		height,
		hasAutoHeight,
		title,
	},
	setAttributes,
	clientId,
} ) {
	const [ autoHeight, setAutoHeight ] = useState( undefined )

	// componentWillMount equivalent
	useEffect( () => {
		if ( hasAutoHeight ) {
			setInterval( resizeIframe, 500 )
		}
	}, [] )

	useEffect( () => {
		if ( hasAutoHeight ) {
			resizeIframe()
		}
	}, [ hasAutoHeight ] )

	const resizeIframe = () => {
		const iframe = document.querySelector( `#block-${ clientId } > iframe` )
		if ( iframe ) {
			setAutoHeight( iframe.contentWindow.document.body.scrollHeight + 'px' )
		} else {
			window.requestAnimationFrame( resizeIframe )
		}
	}

	const blockProps = useBlockProps( {				
		src: url,
		width: width.value + width.unit,
		height: !hasAutoHeight ? height.value + height.unit : autoHeight,
		frameBorder: 0,
		scrolling: hasAutoHeight ? 'no' : null,
	} )

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
					<TextControl
						label={ __( 'URL', 'fleximpleblocks' ) }
						value={ url }
						placeholder={ __( 'Type the Iframe URL…', 'fleximpleblocks' ) }
						onChange={ value => setAttributes( { url: value } ) }
					/>

					<SpacingControls
						valueLabel={ __( 'Width', 'fleximpleblocks' ) }
						unitLabel={ __( 'Width unit', 'fleximpleblocks' ) }
						initialPosition={ 100 }
						min={ 0 }
						max={ 1000 }
						attribute={ width }
						onChange={ value => setAttributes( { width: value } ) }
						isResponsive={ false }
					/>

					{ !hasAutoHeight &&
						<SpacingControls
							valueLabel={ __( 'Height', 'fleximpleblocks' ) }
							unitLabel={ __( 'Height unit', 'fleximpleblocks' ) }
							initialPosition={ 400 }
							min={ 0 }
							max={ 1000 }
							attribute={ height }
							onChange={ value => setAttributes( { height: value } ) }
							isResponsive={ false }
						/>
					}

					<ToggleControl
						label={ __( 'Adjust height automatically', 'fleximpleblocks' ) }
						checked={ hasAutoHeight }
						onChange={ () => setAttributes( { hasAutoHeight: !hasAutoHeight } ) }
					/>

					<TextControl
						label={ __( 'Title', 'fleximpleblocks' ) }
						value={ title }
						placeholder={ __( 'Type the Iframe title…', 'fleximpleblocks' ) }
						onChange={ value => setAttributes( { title: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<iframe { ...blockProps } title={ title } />
		</>
	)
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps
		const { getBlock } = select( 'core/block-editor' )
		return {
			block: getBlock( clientId ),
		}
	} ),
] )( IframeEdit )
