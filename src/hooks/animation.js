/**
 * FILTER: Animation
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { hasBlockSupport } from '@wordpress/blocks'
import { InspectorControls } from '@wordpress/blockEditor'
import { PanelBody } from '@wordpress/components'
import { createHigherOrderComponent } from '@wordpress/compose'
import { } from '@wordpress/element'

/**
 * Internal dependencies
 */
import AnimationControls from 'fleximple-components/components/animation-controls'


/**
 * Override the default edit UI to include a new block inspector control for
 * assigning animation class names, if block supports custom class name.
 *
 * @param {WPComponent} BlockEdit Original component.
 *
 * @return {WPComponent} Wrapped component.
 */
export const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const hasAnimationSupport = hasBlockSupport( props.name, 'animation', true )
		if ( hasAnimationSupport && props.isSelected ) {
			return (
				<>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody title={ __( 'Animation', 'fleximpleblocks' ) } initialOpen={ false }>
							<AnimationControls { ... props } />
						</PanelBody>
					</InspectorControls>
				</>
			)
		}

		return <BlockEdit { ...props } />
	}
}, 'withInspectorControl' )


wp.hooks.addFilter(
	'editor.BlockEdit',
	'fleximple-blocks/animation/with-inspector-control',
	withInspectorControls,
)
