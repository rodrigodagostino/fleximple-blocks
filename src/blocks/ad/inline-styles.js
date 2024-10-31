/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, width } }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${blockSelector} .${defaultClassName}__image {
        width: ${width.small === 'full' ? '100%' : 'auto'};
      }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${blockSelector} .${defaultClassName}__image {
            width: ${width.medium === 'full' ? '100%' : 'auto'};
          }
        }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${blockSelector} .${defaultClassName}__image {
            width: ${width.large === 'full' ? '100%' : 'auto'};
          }
        }`}
    </style>
  )
}

export default InlineStyles
