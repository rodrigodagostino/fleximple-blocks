/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { getColorClassName, useBlockProps } from '@wordpress/block-editor'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function IconSave( {
	attributes: {
		iconId,
		iconSize,
		iconColor,
		customIconColor,
		hasCustomIcon,
		customIcon,
		alignmentHorizontal,
	},
} ) {
	const defaultClassName = getBlockDefaultClassName( name )

	const classes = classnames(
		defaultClassName, {
			[ `${ defaultClassName }--custom` ]: hasCustomIcon,
			'has-text-color': iconColor || customIconColor,
			[ `block-align-h-${ alignmentHorizontal }` ]: alignmentHorizontal,
		},
	)

	const blockProps = useBlockProps.save( {
		className: classes,
	} )
		
	const iconColorClass = getColorClassName( 'color', iconColor )

	const iconClasses = classnames(
		iconId, {
			[ iconColorClass ]: iconColorClass,
		},
	)

	const iconStyles = {
		fontSize: `${ iconSize }px`,
		color: iconColorClass ? undefined : customIconColor,
		height: hasCustomIcon ? iconSize : undefined,
	}

	return (
		<>
			{ !!iconId && !hasCustomIcon &&
				<div { ...blockProps }>
					<i className={ iconClasses } style={ iconStyles } />
				</div>
			}

			{ !!hasCustomIcon &&
				<RawHTML { ...blockProps }>
					{ customIcon }
				</RawHTML>
			}
		</>
	)
}

export default IconSave
