/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { gap, marginTop, marginBottom, paddingTop, paddingLeft, paddingRight, paddingBottom } }) => {
  return (
    <style>
      {gap.small.value &&
        `.${defaultClassName}.gap-${gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)}--sm > * {
          margin-bottom: ${gap.small.value + gap.small.unit} !important;
        }`}
      {!!marginTop.small.value &&
        `.${defaultClassName}.margin-top-${marginTop.small.value + (marginTop.small.unit === '%' ? 'pct' : marginTop.small.unit)}--sm {
          margin-top: ${marginTop.small.value + marginTop.small.unit};
        }`}
      {!!marginBottom.small.value &&
        `.${defaultClassName}.margin-bottom-${marginBottom.small.value + (marginBottom.small.unit === '%' ? 'pct' : marginBottom.small.unit)}--sm {
          margin-bottom: ${marginBottom.small.value + marginBottom.small.unit};
        }`}
      {!!paddingTop.small.value &&
        `.${defaultClassName}.padding-top-${paddingTop.small.value + (paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit)}--sm {
          padding-top: ${paddingTop.small.value + paddingTop.small.unit};
        }`}
      {!!paddingLeft.small.value &&
        `.${defaultClassName}.padding-left-${paddingLeft.small.value + (paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit)}--sm {
          padding-left: ${paddingLeft.small.value + paddingLeft.small.unit};
        }`}
      {!!paddingRight.small.value &&
        `.${defaultClassName}.padding-right-${paddingRight.small.value + (paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit)}--sm {
          padding-right: ${paddingRight.small.value + paddingRight.small.unit};
        }`}
      {!!paddingBottom.small.value &&
        `.${defaultClassName}.padding-bottom-${paddingBottom.small.value + (paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit)}--sm {
          padding-bottom: ${paddingBottom.small.value + paddingBottom.small.unit};
        }`}

      {(!!gap.medium.value || !!marginTop.medium.value || !!marginBottom.medium.value || !!paddingTop.medium.value || !!paddingLeft.medium.value || !!paddingRight.medium.value || !!paddingBottom.medium.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${
            gap.medium.value &&
            `.${defaultClassName}.gap-${gap.large.value + (gap.large.unit === '%' ? 'pct' : gap.large.unit)}--md > * {
              margin-bottom: ${gap.large.value + gap.large.unit} !important;
            }`
          }
          ${
            marginTop.medium.value &&
            `.${defaultClassName}.margin-top-${marginTop.medium.value + (marginTop.medium.unit === '%' ? 'pct' : marginTop.medium.unit)}--md {
              margin-top: ${marginTop.medium.value + marginTop.medium.unit};
            }`
          }
          ${
            marginBottom.medium.value &&
            `.${defaultClassName}.margin-bottom-${marginBottom.medium.value + (marginBottom.medium.unit === '%' ? 'pct' : marginBottom.medium.unit)}--md {
              margin-bottom: ${marginBottom.medium.value + marginBottom.medium.unit};
            }`
          }
          ${
            paddingTop.medium.value &&
            `.${defaultClassName}.padding-top-${paddingTop.medium.value + (paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit)}--md {
              padding-top: ${paddingTop.medium.value + paddingTop.medium.unit};
            }`
          }
          ${
            paddingLeft.medium.value &&
            `.${defaultClassName}.padding-left-${paddingLeft.medium.value + (paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit)}--md {
              padding-left: ${paddingLeft.medium.value + paddingLeft.medium.unit};
            }`
          }
          ${
            paddingRight.medium.value &&
            `.${defaultClassName}.padding-right-${paddingRight.medium.value + (paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit)}--md {
              padding-right: ${paddingRight.medium.value + paddingRight.medium.unit};
            }`
          }
          ${
            paddingBottom.medium.value &&
            `.${defaultClassName}.padding-bottom-${paddingBottom.medium.value + (paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit)}--md {
              padding-bottom: ${paddingBottom.medium.value + paddingBottom.medium.unit};
            }`
          }
        }`}

      {(!!gap.large.value || !!marginTop.large.value || !!marginBottom.large.value || !!paddingTop.large.value || !!paddingLeft.large.value || !!paddingRight.large.value || !!paddingBottom.large.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${
            gap.large.value &&
            `.${defaultClassName}.gap-${gap.large.value + (gap.large.unit === '%' ? 'pct' : gap.large.unit)}--lg > * {
              margin-bottom: ${gap.large.value + gap.large.unit} !important;
            }`
          }
          ${
            marginTop.large.value &&
            `.${defaultClassName}.margin-top-${marginTop.large.value + (marginTop.large.unit === '%' ? 'pct' : marginTop.large.unit)}--lg {
              margin-top: ${marginTop.large.value + marginTop.large.unit};
            }`
          }
          ${
            marginBottom.large.value &&
            `.${defaultClassName}.margin-bottom-${marginBottom.large.value + (marginBottom.large.unit === '%' ? 'pct' : marginBottom.large.unit)}--lg {
              margin-bottom: ${marginBottom.large.value + marginBottom.large.unit};
            }`
          }
          ${
            paddingTop.large.value &&
            `.${defaultClassName}.padding-top-${paddingTop.large.value + (paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit)}--lg {
              padding-top: ${paddingTop.large.value + paddingTop.large.unit};
            }`
          }
          ${
            paddingLeft.large.value &&
            `.${defaultClassName}.padding-left-${paddingLeft.large.value + (paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit)}--lg {
              padding-left: ${paddingLeft.large.value + paddingLeft.large.unit};
            }`
          }
          ${
            paddingRight.large.value &&
            `.${defaultClassName}.padding-right-${paddingRight.large.value + (paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit)}--lg {
              padding-right: ${paddingRight.large.value + paddingRight.large.unit};
            }`
          }
          ${
            paddingBottom.large.value &&
            `.${defaultClassName}.padding-bottom-${paddingBottom.large.value + (paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit)}--lg {
              padding-bottom: ${paddingBottom.large.value + paddingBottom.large.unit};
            }`
          }
        }`}
    </style>
  )
}

export default InlineStyles
