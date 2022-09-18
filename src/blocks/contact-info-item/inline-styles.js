/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, direction, gap }, isEditor = false }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`
  const editorSelector = isEditor ? '> .block-editor-inner-blocks > .block-editor-block-list__layout' : ''

  return (
    <style>
      {`${blockSelector} ${editorSelector} {
        flex-direction: ${direction.small};
        gap: ${gap.small.value + gap.small.unit};
      }`}

      {!!direction.medium &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${blockSelector} ${editorSelector} {
            flex-direction: ${direction.medium};
            gap: ${gap.medium.value + gap.medium.unit};
          }
        }`}

      {!!direction.large &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${blockSelector} ${editorSelector} {
            flex-direction: ${direction.medium};
            gap: ${gap.medium.value + gap.medium.unit};
          }
        }`}
    </style>
  )
}

export default InlineStyles
