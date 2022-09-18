/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, textAlignment, contentGap } }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${blockSelector} {
        text-align: ${textAlignment.small};
        gap: ${contentGap.small.value + contentGap.small.unit};
      }`}

      {(!!textAlignment.medium || !!contentGap.medium.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${blockSelector} {
            ${textAlignment.medium ? `text-align: ${textAlignment.medium}` : ''};
            ${contentGap.medium.value > 0 ? `gap: ${contentGap.medium.value + contentGap.medium.unit}` : ''};
          }
        }`}

      {!!contentGap.large.value &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${blockSelector} {
            ${textAlignment.large ? `text-align: ${textAlignment.large}` : ''};
            ${contentGap.large.value > 0 ? `gap: ${contentGap.large.value + contentGap.large.unit}` : ''};
          }
        }`}
    </style>
  )
}

export default InlineStyles
