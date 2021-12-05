/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function ButtonGroupSave({
  attributes: {
    direction,
    alignmentHorizontal,
    gap,
  },
}) {
  const defaultClassName = getBlockDefaultClassName( name )

  const classes = classnames({
    [ `direction-${ direction.small === 'row' ? 'h' : 'v' }--sm` ]: direction.small,
    [ `direction-${ direction.medium === 'row' ? 'h' : 'v' }--md` ]: direction.medium,
    [ `direction-${ direction.large === 'row' ? 'h' : 'v' }--lg` ]: direction.large,
    [ `block-align-h-${ alignmentHorizontal.small }--sm` ]: alignmentHorizontal.small && direction.small === 'row',
    [ `block-align-h-${ alignmentHorizontal.medium }--md` ]: alignmentHorizontal.medium && direction.medium === 'row',
    [ `block-align-h-${ alignmentHorizontal.large }--lg` ]: alignmentHorizontal.large && direction.large === 'row',
    [ `gap-h-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm` ]: direction.small === 'row',
    [ `gap-h-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--md` ]: direction.medium === 'row',
    [ `gap-h-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg` ]: direction.large === 'row',
    [ `gap-v-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm` ]: direction.small === 'column',
    [ `gap-v-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--md` ]: direction.medium === 'column',
    [ `gap-v-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg` ]: direction.large === 'column',
  })

  const blockProps = useBlockProps.save({
    className: classes,
  })

  return (
    <div { ...blockProps }>
      <style>
        { direction.small === 'row' &&
          `.${ defaultClassName }.gap-h-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm > .fleximple-block-button + .fleximple-block-button {
						${ 'margin-left: ' + gap.small.value + gap.small.unit + ';' }
					}
					.${ defaultClassName }.block-align-h-${ alignmentHorizontal.small }--sm {
						justify-content: ${ alignmentHorizontal.small };
					}`
        }
        { direction.small === 'column' &&
					`.${ defaultClassName }.gap-v-${ gap.small.value + ( gap.small.unit === '%' ? 'pct' : gap.small.unit ) }--sm > .fleximple-block-button + .fleximple-block-button {
						${ 'margin-top: ' + gap.small.value + gap.small.unit + ';' }
					}
					.${ defaultClassName }.block-align-h-${ alignmentHorizontal.small }--sm {
						align-items: ${ alignmentHorizontal.small };
					}` }

        { !!direction.medium &&
					`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
						${ direction.medium === 'row' ? `
							.${ defaultClassName }.gap-h-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--lg > .fleximple-block-button + .fleximple-block-button {
								${ 'margin-left: ' + gap.medium.value + gap.medium.unit + ';' }
							}
							.${ defaultClassName }.block-align-h-${ alignmentHorizontal.medium }--sm {
								justify-content: ${ alignmentHorizontal.medium };
							}` : '' }
						${ direction.medium === 'column' ? `
							.${ defaultClassName }.gap-v-${ gap.medium.value + ( gap.medium.unit === '%' ? 'pct' : gap.medium.unit ) }--lg > .fleximple-block-button + .fleximple-block-button {
								${ 'margin-top: ' + gap.medium.value + gap.medium.unit + ';' }
							}
							.${ defaultClassName }.block-align-h-${ alignmentHorizontal.medium }--sm {
								align-items: ${ alignmentHorizontal.medium };
							}` : '' }
					}`
        }

        { !!direction.large &&
					`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
						${ direction.large === 'row' ? `
							.${ defaultClassName }.gap-h-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg > .fleximple-block-button + .fleximple-block-button {
								${ 'margin-left: ' + gap.large.value + gap.large.unit + ';' }
								}
								.${ defaultClassName }.block-align-h-${ alignmentHorizontal.large }--sm {
									justify-content: ${ alignmentHorizontal.large };
								}` : '' }
						${ direction.large === 'column' ? `
							.${ defaultClassName }.gap-v-${ gap.large.value + ( gap.large.unit === '%' ? 'pct' : gap.large.unit ) }--lg > .fleximple-block-button + .fleximple-block-button {
								${ 'margin-top: ' + gap.large.value + gap.large.unit + ';' }
							}
							.${ defaultClassName }.block-align-h-${ alignmentHorizontal.large }--sm {
								align-items: ${ alignmentHorizontal.large };
							}` : '' }
					}`
        }
      </style>

      <InnerBlocks.Content />
    </div>
  )
}

export default ButtonGroupSave
