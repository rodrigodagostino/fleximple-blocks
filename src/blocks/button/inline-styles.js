/* global fleximpleblocksPluginData */

const InlineStyles = ({
  defaultClassName,
  attributes: { blockId, alignmentHorizontal, paddingTop, paddingRight, paddingBottom, paddingLeft },
}) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${blockSelector} {
        justify-content: ${alignmentHorizontal};
      }
      
      ${blockSelector} .${defaultClassName}__link {
        padding-top: ${paddingTop.small.value + paddingTop.small.unit};
        padding-right: ${paddingRight.small.value + paddingRight.small.unit};
        padding-bottom: ${paddingBottom.small.value + paddingBottom.small.unit};
        padding-left: ${paddingLeft.small.value + paddingLeft.small.unit};
      }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${blockSelector} .${defaultClassName}__link {
            ${paddingTop.medium.value ? `padding-top: ${paddingTop.medium.value + paddingTop.medium.unit};` : ''}
            ${paddingRight.medium.value ? `padding-right: ${paddingRight.medium.value + paddingRight.medium.unit};` : ''}
            ${paddingBottom.medium.value ? `padding-bottom: ${paddingBottom.medium.value + paddingBottom.medium.unit};` : ''}
            ${paddingLeft.medium.value ? `padding-left: ${paddingLeft.medium.value + paddingLeft.medium.unit};` : ''}
          }
        }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${blockSelector} .${defaultClassName}__link {
            ${paddingTop.large.value ? `padding-top: ${paddingTop.large.value + paddingTop.large.unit};` : ''}
            ${paddingRight.large.value ? `padding-right: ${paddingRight.large.value + paddingRight.large.unit};` : ''}
            ${paddingBottom.large.value ? `padding-bottom: ${paddingBottom.large.value + paddingBottom.large.unit};` : ''}
            ${paddingLeft.large.value ? `padding-left: ${paddingLeft.large.value + paddingLeft.large.unit};` : ''}
          }
        }`}
    </style>
  )
}

export default InlineStyles
