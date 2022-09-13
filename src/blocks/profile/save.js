/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

function ProfileSave({
  attributes,
  attributes: {
    contentAlignment,
    textAlignment,
    mediaGap,
    contentGap,
    direction,
    isReversed,
    mediaId,
    mediaUrl,
    mediaAlt,
    mediaWidth,
    mediaHeight,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  // prettier-ignore
  const classes = classNames(defaultClassName, {
    [`block-align-${contentAlignment.small}--sm`]: contentAlignment.small,
    [`block-align-${contentAlignment.medium}--md`]: contentAlignment.medium,
    [`block-align-${contentAlignment.large}--lg`]: contentAlignment.large,
    [`text-align-${textAlignment.small}--sm`]: textAlignment.small,
    [`text-align-${textAlignment.medium}--md`]: textAlignment.medium,
    [`text-align-${textAlignment.large}--lg`]: textAlignment.large,
    [`media-gap-${mediaGap.small.value + (mediaGap.small.unit === '%' ? 'pct' : mediaGap.small.unit)}--sm`]: mediaGap.small.value,
    [`media-gap-${mediaGap.medium.value + (mediaGap.medium.unit === '%' ? 'pct' : mediaGap.medium.unit)}--md`]: mediaGap.medium.value,
    [`media-gap-${mediaGap.large.value + (mediaGap.large.unit === '%' ? 'pct' : mediaGap.large.unit)}--lg`]: mediaGap.large.value,
    [`content-gap-${contentGap.small.value + (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)}--sm`]: contentGap.small.value >= 0,
    [`content-gap-${contentGap.medium.value + (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)}--md`]: contentGap.medium.value >= 0,
    [`content-gap-${contentGap.large.value + (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)}--lg`]: contentGap.large.value >= 0,
    [`direction-${direction.small}--sm`]: direction.small,
    [`direction-${direction.medium}--md`]: direction.medium,
    [`direction-${direction.large}--lg`]: direction.large,
    'direction-is-reversed--sm': isReversed.small,
    'direction-is-reversed--md': isReversed.medium,
    'direction-is-reversed--lg': isReversed.large,
    [`media-width-${mediaWidth.small.value + (mediaWidth.small.unit === '%' ? 'pct' : mediaWidth.small.unit)}--sm`]: mediaWidth.small.value,
    [`media-width-${mediaWidth.medium.value + (mediaWidth.medium.unit === '%' ? 'pct' : mediaWidth.medium.unit)}--md`]: mediaWidth.medium.value,
    [`media-width-${mediaWidth.large.value + (mediaWidth.large.unit === '%' ? 'pct' : mediaWidth.large.unit)}--lg`]: mediaWidth.large.value,
    [`media-height-${mediaHeight.small.value + (mediaHeight.small.unit === '%' ? 'pct' : mediaHeight.small.unit)}--sm`]: mediaHeight.small.value,
    [`media-height-${mediaHeight.medium.value + (mediaHeight.medium.unit === '%' ? 'pct' : mediaHeight.medium.unit)}--md`]: mediaHeight.medium.value,
    [`media-height-${mediaHeight.large.value + (mediaHeight.large.unit === '%' ? 'pct' : mediaHeight.large.unit)}--lg`]: mediaHeight.large.value,
  })

  const blockProps = useBlockProps.save({
    className: classes,
  })

  const mediaStyles = {
    backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
  }

  return (
    <div {...blockProps}>
      <div className={`${defaultClassName}__inner`}>
        {!!mediaId && (
          <figure className={`${defaultClassName}__media`} style={mediaStyles}>
            <img
              className={`${defaultClassName}__image`}
              src={mediaUrl}
              alt={mediaAlt}
            />
          </figure>
        )}
        <div className={`${defaultClassName}__content`}>
          <InnerBlocks.Content />
        </div>
      </div>

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default ProfileSave
