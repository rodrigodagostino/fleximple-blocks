/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, imageSize, aspectRatio, focalPoint } }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${blockSelector} .${defaultClassName}__picture {
        padding-bottom: ${(aspectRatio.small.split('-')[1] * 100) / aspectRatio.small.split('-')[0]}%;
			}
      .${blockSelector} ${defaultClassName}__picture .${defaultClassName}__image {
				object-position: ${focalPoint.small.x * 100}% ${focalPoint.small.y * 100}%;
			}`}

      {(!!aspectRatio.medium || !!focalPoint.medium.x || !!focalPoint.medium.y) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.smallBreakpointValue}px) {
          ${
            aspectRatio.medium
              ? `.${defaultClassName}__picture { padding-bottom: ${
                  (aspectRatio.medium.split('-')[1] * 100) / aspectRatio.medium.split('-')[0]
                }%; }`
              : ''
          }
          ${
            imageSize.medium !== 'none' &&
            (focalPoint.medium.x || focalPoint.medium.y) &&
            focalPoint.medium.x !== 0.5 &&
            focalPoint.medium.y !== 0.5 &&
            (focalPoint.medium.x !== focalPoint.small.x || focalPoint.medium.y !== focalPoint.small.y)
              ? `.${defaultClassName}__picture .${defaultClassName}__image { object-position: ${focalPoint.medium.x * 100}% ${
                  focalPoint.medium.y * 100
                }%; }`
              : ''
          }
        }`}

      {(!!aspectRatio.large || !!focalPoint.large.x || !!focalPoint.large.y) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          .fleximple-block-post__footer > .block-editor-inner-blocks > .block-editor-block-list__layout {
            flex-direction: row;
            justify-content: space-between;
            gap: var(--space-125, 1.25rem);
          }
          ${
            aspectRatio.large
              ? `.${defaultClassName}__picture { padding-bottom: ${
                  (aspectRatio.large.split('-')[1] * 100) / aspectRatio.large.split('-')[0]
                }%; }`
              : ''
          }
          ${
            imageSize.large !== 'none' &&
            (focalPoint.large.x || focalPoint.large.y) &&
            focalPoint.large.x !== 0.5 &&
            focalPoint.large.y !== 0.5 &&
            (focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y)
              ? `.${defaultClassName}__picture .${defaultClassName}__image { object-position: ${focalPoint.large.x * 100}% ${
                  focalPoint.large.y * 100
                }%; }`
              : ''
          }
        }`}
    </style>
  )
}

export default InlineStyles
