/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'
import memoize from 'memize'
import times from 'lodash/times'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	withColors,
} from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
	BaseControl,
	PanelBody,
	RangeControl,
	RadioControl,
} from '@wordpress/components'
import { compose } from '@wordpress/compose'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = [ 'fleximple-blocks/contact-info-item' ]
const getContactInfoTemplate = memoize( items => {
	return times( items, () => [ 'fleximple-blocks/contact-info-item' ] )
} )

function ContactInfoEdit( {
	attributes,
	attributes: {
		items,
		direction,
		alignmentHorizontal,
		gap,
	},
	setAttributes,
	instanceId,
} ) {
	const defaultClassName = getBlockDefaultClassName( name )

	const classes = classnames(
		defaultClassName, {
			[ `direction-${ direction.small === 'row' ? 'h' : 'v' }--sm` ]: direction.small,
			[ `direction-${ direction.medium === 'row' ? 'h' : 'v' }--md` ]: direction.medium && direction.medium !== direction.small,
			[ `direction-${ direction.large === 'row' ? 'h' : 'v' }--lg` ]: direction.large && direction.large !== direction.medium,
			[ `block-align-h-${ alignmentHorizontal.small }--sm` ]: alignmentHorizontal.small,
			[ `block-align-h-${ alignmentHorizontal.medium }--md` ]: alignmentHorizontal.medium && alignmentHorizontal.medium !== alignmentHorizontal.small,
			[ `block-align-h-${ alignmentHorizontal.large }--lg` ]: alignmentHorizontal.large && alignmentHorizontal.large !== alignmentHorizontal.medium,
			[ `gap-h-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm` ]: direction.small === 'row',
			[ `gap-h-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--md` ]: direction.medium === 'row',
			[ `gap-h-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg` ]: direction.large === 'row',
			[ `gap-v-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm` ]: direction.small === 'column',
			[ `gap-v-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--md` ]: direction.medium === 'column',
			[ `gap-v-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg` ]: direction.large === 'column',
		},
	)

	const blockProps = useBlockProps( {
		className: classes,
	} )

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
					<RangeControl
						label={ __( 'Items', 'fleximpleblocks' ) }
						min={ 1 }
						max={ 10 }
						value={ items }
						onChange={ value => setAttributes( { items: value } ) }
					/>

					<ResponsiveSettingsTabPanel initialTabName="small">
						{ tab =>
							<>
								<RadioControl
									label={ __( 'Direction', 'fleximpleblocks' ) }
									selected={ direction[ tab.name ] }
									options={ [
										{ label: __( 'Horizontal', 'fleximpleblocks' ), value: 'row' },
										{ label: __( 'Vertical', 'fleximpleblocks' ), value: 'column' },
									] }
									onChange={ option => {
										setResponsiveAttribute(
											attributes,
											setAttributes,
											'direction',
											tab.name,
											option,
										)
									} }
								/>

								<BaseControl
									label={ __( 'Horizontal alignment', 'fleximpleblocks' ) }
									id={ `fleximple-blocks-row-horizontal-block-align-toolbar-${ instanceId }` }
								>
									<BlockAlignmentHorizontalToolbar
										id={ `fleximple-blocks-row-horizontal-block-align-toolbar-${ instanceId }` }
										value={ alignmentHorizontal[ tab.name ] }
										spaceControlsEnabled={
											direction[ tab.name ] === '' ? true : false
										}
										onChange={ value => {
											setResponsiveAttribute(
												attributes,
												setAttributes,
												'alignmentHorizontal',
												tab.name,
												value,
											)
										} }
									/>
								</BaseControl>

								<SpacingControls
									valueLabel={ __( 'Gap size', 'fleximpleblocks' ) }
									unitLabel={ __( 'Gap size unit', 'fleximpleblocks' ) }
									initialPosition={ 0 }
									min={ 0 }
									max={ 200 }
									attribute={ gap }
									target={ tab.name }
									onChange={ value => setAttributes( { gap: value } ) }
								/>
							</>
						}
					</ResponsiveSettingsTabPanel>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<style>
					{ direction.small &&
						`.${ defaultClassName }.direction-${ direction.small === 'row' ? 'h' : 'v' }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
							flex-direction: ${ direction.small };
						}`
					}
					{ direction.small === 'row' &&
						`.${ defaultClassName }.gap-h-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
							${ 'margin-left: ' + gap.small.value + gap.small.unit + ';' }
						}
						.${ defaultClassName }.block-align-h-${ alignmentHorizontal.small }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
							justify-content: ${ alignmentHorizontal.small };
						}` }
					{ direction.small === 'column' &&
						`.${ defaultClassName }.gap-v-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
							${ 'margin-top: ' + gap.small.value + gap.small.unit + ';' }
						}
						.${ defaultClassName }.block-align-h-${ alignmentHorizontal.small }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
							align-items: ${ alignmentHorizontal.small };
						}` }

					{ !!direction.medium && direction.medium !== direction.small &&
						`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
							.${ defaultClassName }.direction-${ direction.medium === 'row' ? 'h' : 'v' }--md > .block-editor-inner-blocks > .block-editor-block-list__layout {
								flex-direction: ${ direction.medium };
							}
							${ direction.medium === 'row' ? `
								.${ defaultClassName }.gap-h-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${ 'margin-left: ' + gap.medium.value + gap.medium.unit + ';' }
								}
								.${ defaultClassName }.block-align-h-${ alignmentHorizontal.medium }--sm > .block-editor-inner-blocks > .block-editor-block-list__layout {
									justify-content: ${ alignmentHorizontal.medium };
								}` : '' }
							${ direction.medium === 'column' ? `
								.${ defaultClassName }.gap-v-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${ 'margin-top: ' + gap.medium.value + gap.medium.unit + ';' }
								}
								.${ defaultClassName }.block-align-h-${ alignmentHorizontal.medium }--md > .block-editor-inner-blocks > .block-editor-block-list__layout {
									align-items: ${ alignmentHorizontal.medium };
								}` : '' }
						}`
					}

					{ !!direction.large && direction.large !== direction.medium &&
						`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
							.${ defaultClassName }.direction-${ direction.large === 'row' ? 'h' : 'v' }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout {
								flex-direction: ${ direction.large };
							}
							${ direction.large === 'row' ? `
								.${ defaultClassName }.gap-h-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${ 'margin-left: ' + gap.large.value + gap.large.unit + ';' }
									}
									.${ defaultClassName }.block-align-h-${ alignmentHorizontal.large }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout {
										justify-content: ${ alignmentHorizontal.large };
									}` : '' }
							${ direction.large === 'column' ? `
								.${ defaultClassName }.gap-v-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout > *:not(style) + * {
									${ 'margin-top: ' + gap.large.value + gap.large.unit + ';' }
								}
								.${ defaultClassName }.block-align-h-${ alignmentHorizontal.large }--lg > .block-editor-inner-blocks > .block-editor-block-list__layout {
									align-items: ${ alignmentHorizontal.large === 'start' ? 'flex-start' : alignmentHorizontal.large === 'end' ? 'flex-end' : alignmentHorizontal.large };
								}` : '' }
						}`
					}
				</style>

				<InnerBlocks
					template={ getContactInfoTemplate( items ) }
					templateLock="insert"
					allowedBlocks={ ALLOWED_BLOCKS }
					orientation="horizontal"
				/>
			</div>
		</>
	)
}

export default compose( [
	withColors( { buttonPrevColor: 'color' }, { buttonNextColor: 'color' } ),
] )( ContactInfoEdit )
