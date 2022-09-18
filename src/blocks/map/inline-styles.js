/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, height } }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${blockSelector} {
        height: ${height.small.value + height.small.unit};
      }`}

      {height.medium.value > 0 &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${blockSelector} {
            ${height.medium.value ? `height: ${height.medium.value + height.medium.unit};` : ''}
          }
        }`}

      {height.large.value > 0 &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${blockSelector} {
            ${height.large.value ? `height: ${height.large.value + height.large.unit};` : ''}
          }
        }`}
    </style>
  )
}

export default InlineStyles
