/* global fleximpleblocksPluginData */

const InlineStyles = ({ attributes: { paddingTop, paddingRight, paddingBottom, paddingLeft } }) => {
  return (
    <style>
      {(!!paddingTop.small.value || !!paddingRight.small.value || !!paddingBottom.small.value || !!paddingLeft.small.value) &&
        `.padding-top-${paddingTop.small.value}${paddingTop.small.unit === 'pct' ? '%' : paddingTop.small.unit}--sm {
          padding-top: ${paddingTop.small.value + paddingTop.small.unit};
        }

        .padding-right-${paddingRight.small.value}${paddingRight.small.unit === 'pct' ? '%' : paddingRight.small.unit}--sm {
          padding-right: ${paddingRight.small.value + paddingRight.small.unit};
        }

        .padding-bottom-${paddingBottom.small.value}${paddingBottom.small.unit === 'pct' ? '%' : paddingBottom.small.unit}--sm {
          padding-bottom: ${paddingBottom.small.value + paddingBottom.small.unit};
        }

        .padding-left-${paddingLeft.small.value}${paddingLeft.small.unit === 'pct' ? '%' : paddingLeft.small.unit}--sm {
          padding-left: ${paddingLeft.small.value + paddingLeft.small.unit};
        }`}

      {(!!paddingTop.medium.value || !!paddingRight.medium.value || !!paddingBottom.medium.value || !!paddingLeft.medium.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          .padding-top-${paddingTop.medium.value}${paddingTop.medium.unit === 'pct' ? '%' : paddingTop.medium.unit}--md {
            padding-top: ${paddingTop.medium.value + paddingTop.medium.unit};
          }

          .padding-right-${paddingRight.medium.value}${paddingRight.medium.unit === 'pct' ? '%' : paddingRight.medium.unit}--md {
            padding-right: ${paddingRight.medium.value + paddingRight.medium.unit};
          }

          .padding-bottom-${paddingBottom.medium.value}${paddingBottom.medium.unit === 'pct' ? '%' : paddingBottom.medium.unit}--md {
            padding-bottom: ${paddingBottom.medium.value + paddingBottom.medium.unit};
          }

          .padding-left-${paddingLeft.medium.value}${paddingLeft.medium.unit === 'pct' ? '%' : paddingLeft.medium.unit}--md {
            padding-left: ${paddingLeft.medium.value + paddingLeft.medium.unit};
          }
        }`}

      {(!!paddingTop.large.value || !!paddingRight.large.value || !!paddingBottom.large.value || !!paddingLeft.large.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          .padding-top-${paddingTop.large.value}${paddingTop.large.unit === 'pct' ? '%' : paddingTop.large.unit}--lg {
            padding-top: ${paddingTop.large.value + paddingTop.large.unit};
          }

          .padding-right-${paddingRight.large.value}${paddingRight.large.unit === 'pct' ? '%' : paddingRight.large.unit}--lg {
            padding-right: ${paddingRight.large.value + paddingRight.large.unit};
          }

          .padding-bottom-${paddingBottom.large.value}${paddingBottom.large.unit === 'pct' ? '%' : paddingBottom.large.unit}--lg {
            padding-bottom: ${paddingBottom.large.value + paddingBottom.large.unit};
          }

          .padding-left-${paddingLeft.large.value}${paddingLeft.large.unit === 'pct' ? '%' : paddingLeft.large.unit}--lg {
            padding-left: ${paddingLeft.large.value + paddingLeft.large.unit};
          }
        }`}
    </style>
  )
}

export default InlineStyles
