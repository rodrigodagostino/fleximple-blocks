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
  attributes: { blockId, mediaId, mediaUrl, mediaAlt },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps.save({
    className: defaultClassName,
  })

  const mediaStyles = {
    backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined,
  }

  return (
    <div {...blockProps} data-block-id={blockId}>
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
