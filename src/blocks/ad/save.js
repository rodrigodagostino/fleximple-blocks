/* global fleximpleblocksPluginData */

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

function AdSave({
  attributes,
  attributes: { blockId, id, url, alt, linkUrl, linkTarget },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const pictureSources = []
  // The generated array needs to be reversed in order for <source>
  // to work properly (from largest to smallest).
  Object.entries(id)
    .reverse()
    .forEach(([key, value], index, array) => {
      if (value) {
        pictureSources.push(
          <source
            className={`${defaultClassName}__source`}
            // Assign the closest lower breakpoint
            // (“small” shouldn’t have a media attribute).
            media={
              key !== 'small'
                ? `(min-width: ${
                    fleximpleblocksPluginData.settings[
                      array[index + 1][0] + 'BreakpointValue'
                    ]
                  }px)`
                : null
            }
            srcSet={url[key]}
          />
        )
      }
    })

  const imageSource = url.small ? url.small : null

  return (
    <picture {...useBlockProps.save()} data-block-id={blockId}>
      {(!!id.small || !!id.medium || !!id.large) && (
        <>
          {pictureSources}
          <img
            className={`${defaultClassName}__image`}
            src={imageSource}
            alt={alt}
          />
          {!!linkUrl && (
            <a
              className={`${defaultClassName}__link`}
              href={linkUrl}
              target={linkTarget}
              rel="noopener"
            >
              <span className="screen-reader-only">{alt}</span>
            </a>
          )}
        </>
      )}

      <InlineStyles {...{ defaultClassName, attributes }} />
    </picture>
  )
}

export default AdSave
