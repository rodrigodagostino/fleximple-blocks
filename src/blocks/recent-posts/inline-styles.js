/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, layout, columns, gapRow, gapColumn, aspectRatio } }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${
        layout === 'list'
          ? `${blockSelector} {
            gap: ${gapRow.small.value + gapRow.small.unit};
          }`
          : ''
      }
      ${
        layout === 'grid'
          ? `${blockSelector} {
            grid-template-columns: repeat(${columns.small}, 1fr);
            grid-column-gap: ${gapColumn.small.value + gapColumn.small.unit};
            grid-row-gap: ${gapRow.small.value + gapRow.small.unit};
          }`
          : ''
      }
      ${blockSelector} .${defaultClassName}__entry-picture { padding-bottom: ${
        (aspectRatio.small.split('-')[1] * 100) / aspectRatio.small.split('-')[0]
      }%; }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
        ${blockSelector} {
          ${
            layout === 'list' && !!gapRow.medium.value && gapRow.medium.value !== gapRow.small.value
              ? `gap: ${gapRow.medium.value + gapRow.medium.unit};`
              : ''
          }
          ${
            layout === 'grid' && !!columns.medium && gapColumn.medium !== gapColumn.small
              ? `grid-template-columns: repeat(${columns.medium}, 1fr);`
              : ''
          }
          ${
            layout === 'grid' && !!gapColumn.medium.value && gapColumn.medium.value !== gapColumn.small.value
              ? `grid-column-gap: ${gapColumn.medium.value + gapColumn.medium.unit};`
              : ''
          }
          ${
            layout === 'grid' && !!gapRow.medium.value && gapRow.medium.value !== gapRow.small.value
              ? `grid-row-gap: ${gapRow.medium.value + gapRow.medium.unit};`
              : ''
          } }
        ${
          !!aspectRatio.medium !== 'none' && aspectRatio.medium !== aspectRatio.small
            ? `${blockSelector} .${defaultClassName}__entry-picture { padding-bottom: ${
                (aspectRatio.medium.split('-')[1] * 100) / aspectRatio.medium.split('-')[0]
              }%; }`
            : ''
        } }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
        ${blockSelector} {
          ${
            layout === 'list' && !!gapRow.large.value && gapRow.large.value !== gapRow.medium.value
              ? `gap: ${gapRow.large.value + gapRow.large.unit};`
              : ''
          }
          ${
            layout === 'grid' && !!columns.large && gapColumn.large !== gapColumn.medium
              ? `grid-template-columns: repeat(${columns.large}, 1fr);`
              : ''
          }
          ${
            layout === 'grid' && !!gapColumn.large.value && gapColumn.large.value !== gapColumn.medium.value
              ? `grid-column-gap: ${gapColumn.large.value + gapColumn.large.unit};`
              : ''
          }
          ${
            layout === 'grid' && !!gapRow.large.value && gapRow.large.value !== gapRow.medium.value
              ? `grid-row-gap: ${gapRow.large.value + gapRow.large.unit};`
              : ''
          }
        }
        ${
          aspectRatio.large !== 'none' && aspectRatio.large !== aspectRatio.medium
            ? `${blockSelector} .${defaultClassName}__entry-picture {
              padding-bottom: ${(aspectRatio.large.split('-')[1] * 100) / aspectRatio.large.split('-')[0]}%;
            }`
            : ''
        }
      }`}
    </style>
  )
}

export default InlineStyles
