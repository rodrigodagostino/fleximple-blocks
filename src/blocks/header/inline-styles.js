/* global fleximpleblocksPluginData */

const InlineStyles = ({
  defaultClassName,
  attributes: { blockId, textAlignment, gap, marginTop, marginBottom, paddingTop, paddingLeft, paddingRight, paddingBottom },
}) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`

  return (
    <style>
      {`${blockSelector} {
          text-align: ${textAlignment};
          gap: ${gap.small.value + gap.small.unit} !important;
          margin-top: ${marginTop.small.value + marginTop.small.unit};
          margin-bottom: ${marginBottom.small.value + marginBottom.small.unit};
          padding-top: ${paddingTop.small.value + paddingTop.small.unit};
          padding-right: ${paddingRight.small.value + paddingRight.small.unit};
          padding-bottom: ${paddingBottom.small.value + paddingBottom.small.unit};
          padding-left: ${paddingLeft.small.value + paddingLeft.small.unit};
      }`}

      {((!!gap.medium.value && gap.medium.value !== gap.small.value) ||
        (!!marginTop.medium.value && marginTop.medium.value !== marginTop.small.value) ||
        (!!marginBottom.medium.value && marginBottom.medium.value !== marginBottom.small.value) ||
        (!!paddingTop.medium.value && paddingTop.medium.value !== paddingTop.small.value) ||
        (!!paddingRight.medium.value && paddingRight.medium.value !== paddingRight.small.value) ||
        (!!paddingBottom.medium.value && paddingBottom.medium.value !== paddingBottom.small.value) ||
        (!!paddingLeft.medium.value && paddingLeft.medium.value !== paddingLeft.small.value)) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${`${blockSelector} {
            ${!!gap.medium.value && gap.medium.value !== gap.small.value && `gap: ${gap.medium.value + gap.medium.unit} !important;`}
            ${
              !!marginTop.medium.value &&
              marginTop.medium.value !== marginTop.small.value &&
              `margin-top: ${marginTop.medium.value + marginTop.medium.unit};`
            }
            ${
              !!marginBottom.medium.value &&
              marginBottom.medium.value !== marginBottom.small.value &&
              `margin-bottom: ${marginBottom.medium.value + marginBottom.medium.unit};`
            }
            ${
              !!paddingTop.medium.value &&
              paddingTop.medium.value !== paddingTop.small.value &&
              `padding-top: ${paddingTop.medium.value + paddingTop.medium.unit};`
            }
            ${
              !!paddingRight.medium.value &&
              paddingRight.medium.value !== paddingRight.small.value &&
              `padding-right: ${paddingRight.medium.value + paddingRight.medium.unit};`
            }
            ${
              !!paddingBottom.medium.value &&
              paddingBottom.medium.value !== paddingBottom.small.value &&
              `padding-bottom: ${paddingBottom.medium.value + paddingBottom.medium.unit};`
            }
            ${
              !!paddingLeft.medium.value &&
              paddingLeft.medium.value !== paddingLeft.small.value &&
              `padding-left: ${paddingLeft.medium.value + paddingLeft.medium.unit};`
            }
        }`}`}

      {((!!gap.large.value && gap.large.value !== gap.medium.value) ||
        (!!marginTop.large.value && marginTop.large.value !== marginTop.medium.value) ||
        (!!marginBottom.large.value && marginBottom.large.value !== marginBottom.medium.value) ||
        (!!paddingTop.large.value && paddingTop.large.value !== paddingTop.medium.value) ||
        (!!paddingRight.large.value && paddingRight.large.value !== paddingRight.medium.value) ||
        (!!paddingBottom.large.value && paddingBottom.large.value !== paddingBottom.medium.value) ||
        (!!paddingLeft.large.value && paddingLeft.large.value !== paddingLeft.medium.value)) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
            ${`${blockSelector} {
              ${!!gap.large.value && gap.large.value !== gap.medium.value && `gap: ${gap.large.value + gap.large.unit} !important;`}
              ${
                !!marginTop.large.value &&
                marginTop.large.value !== marginTop.medium.value &&
                `margin-top: ${marginTop.large.value + marginTop.large.unit};`
              }
              ${
                !!marginBottom.large.value &&
                marginBottom.large.value !== marginBottom.medium.value &&
                `margin-bottom: ${marginBottom.large.value + marginBottom.large.unit};`
              }
              ${
                !!paddingTop.large.value &&
                paddingTop.large.value !== paddingTop.medium.value &&
                `padding-top: ${paddingTop.large.value + paddingTop.large.unit};`
              }
              ${
                !!paddingRight.large.value &&
                paddingRight.large.value !== paddingRight.medium.value &&
                `padding-right: ${paddingRight.large.value + paddingRight.large.unit};`
              }
              ${
                !!paddingBottom.large.value &&
                paddingBottom.large.value !== paddingBottom.medium.value &&
                `padding-bottom: ${paddingBottom.large.value + paddingBottom.large.unit};`
              }
              ${
                !!paddingLeft.large.value &&
                paddingLeft.large.value !== paddingLeft.medium.value &&
                `padding-left: ${paddingLeft.large.value + paddingLeft.large.unit};`
              }
          }`}`}
    </style>
  )
}

export default InlineStyles
