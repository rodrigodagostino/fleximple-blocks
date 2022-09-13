/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

const FeatureSave = ({
  className,
  attributes,
  attributes: { textAlignment, contentGap },
}) => {
  const defaultClassName = getBlockDefaultClassName(name)

  // prettier-ignore
  const classes = classNames(defaultClassName, className, {
    [`text-align-${textAlignment.small}--sm`]: textAlignment.small,
    [`text-align-${textAlignment.medium}--md`]: textAlignment.medium,
    [`text-align-${textAlignment.large}--lg`]: textAlignment.large,
    [`content-gap-${contentGap.small.value + (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)}--sm`]: contentGap.small.value,
    [`content-gap-${contentGap.medium.value + (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)}--md`]: contentGap.medium.value,
    [`content-gap-${contentGap.large.value + (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)}--lg`]: contentGap.large.value,
  })

  return (
    <div className={classes}>
      <div className={`${defaultClassName}__inner`}>
        <InnerBlocks.Content />
      </div>

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default FeatureSave
