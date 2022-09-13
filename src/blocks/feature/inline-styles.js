/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { contentGap }, isEditor = false }) => {
  const editorSelector = isEditor ? '> .block-editor-inner-blocks > .block-editor-block-list__layout' : ''

  return (
    <style>
      {`.${defaultClassName}.content-gap-${contentGap.small.value + (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)}--sm .${defaultClassName}__inner ${editorSelector} > * {
        margin-top: ${contentGap.small.value}${contentGap.small.unit === 'pct' ? '%' : contentGap.small.unit};
        margin-bottom: ${contentGap.small.value}${contentGap.small.unit === 'pct' ? '%' : contentGap.small.unit};
      }`}

      {!!contentGap.medium.value &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          .${defaultClassName}.content-gap-${contentGap.medium.value + (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)}--md .${defaultClassName}__inner ${editorSelector} > * {
            margin-top: ${contentGap.medium.value}${contentGap.medium.unit === 'pct' ? '%' : contentGap.medium.unit};
            margin-bottom: ${contentGap.medium.value}${contentGap.medium.unit === 'pct' ? '%' : contentGap.medium.unit};
          }
        }`}

      {!!contentGap.large.value &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          .${defaultClassName}.content-gap-${contentGap.large.value + (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)}--md .${defaultClassName}__inner ${editorSelector} > * {
            margin-top: ${contentGap.large.value}${contentGap.large.unit === 'pct' ? '%' : contentGap.large.unit};
            margin-bottom: ${contentGap.large.value}${contentGap.large.unit === 'pct' ? '%' : contentGap.large.unit};
          }
        }`}
    </style>
  )
}

export default InlineStyles
