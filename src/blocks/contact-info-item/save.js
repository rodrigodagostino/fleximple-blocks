/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function ContactInfoSave( {
	attributes: {
		direction,
		gap,
	},
} ) {
	const defaultClassName = getBlockDefaultClassName( name )

	const classes = classnames(
		defaultClassName, {
			[ `direction-${ direction.small === 'row' ? 'h' : 'v' }--sm` ]: direction.small,
			[ `direction-${ direction.medium === 'row' ? 'h' : 'v' }--md` ]: direction.medium && direction.medium !== direction.small,
			[ `direction-${ direction.large === 'row' ? 'h' : 'v' }--lg` ]: direction.large && direction.large !== direction.medium,
			[ `gap-h-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm` ]: direction.small === 'row',
			[ `gap-h-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--md` ]: direction.medium === 'row',
			[ `gap-h-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg` ]: direction.large === 'row',
			[ `gap-v-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm` ]: direction.small === 'column',
			[ `gap-v-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--md` ]: direction.medium === 'column',
			[ `gap-v-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg` ]: direction.large === 'column',
		},
	)

	const blockProps = useBlockProps.save( {
		className: classes,
	} )

	return (
		<div { ...blockProps }>
			<style>
				{ direction.small &&
					`.${ defaultClassName }.direction-${ direction.small === 'row' ? 'h' : 'v' }--sm {
						flex-direction: ${ direction.small };
					}`
				}
				{ direction.small === 'row' &&
					`.${ defaultClassName }.gap-h-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm > *:not(style) + * {
						${ 'margin-left: ' + gap.small.value + gap.small.unit + ';' }
					}` }
				{ direction.small === 'column' &&
					`.${ defaultClassName }.gap-v-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm > *:not(style) + * {
						${ 'margin-top: ' + gap.small.value + gap.small.unit + ';' }
					}` }

				{ !!direction.medium && direction.medium !== direction.small &&
					`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
						.${ defaultClassName }.direction-${ direction.medium === 'row' ? 'h' : 'v' }--md {
							flex-direction: ${ direction.medium };
						}
						${ direction.medium === 'row' ? `
							.${ defaultClassName }.gap-h-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--lg > *:not(style) + * {
								${ 'margin-left: ' + gap.medium.value + gap.medium.unit + ';' }
							}` : '' }
						${ direction.medium === 'column' ? `
							.${ defaultClassName }.gap-v-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--lg > *:not(style) + * {
								${ 'margin-top: ' + gap.medium.value + gap.medium.unit + ';' }
							}` : '' }
					}`
				}

				{ !!direction.large && direction.large !== direction.medium &&
					`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
						.${ defaultClassName }.direction-${ direction.large === 'row' ? 'h' : 'v' }--lg {
							flex-direction: ${ direction.large };
						}
						${ direction.large === 'row' ? `
							.${ defaultClassName }.gap-h-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg > *:not(style) + * {
								${ 'margin-left: ' + gap.large.value + gap.large.unit + ';' }
							}` : '' }
						${ direction.large === 'column' ? `
							.${ defaultClassName }.gap-v-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg > *:not(style) + * {
								${ 'margin-top: ' + gap.large.value + gap.large.unit + ';' }
							}` : '' }
					}`
				}
			</style>

			<InnerBlocks.Content />
		</div>
	)
}

export default ContactInfoSave
