/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, direction, alignmentHorizontal, gap }, isEditor = false }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`
  const editorSelector = isEditor ? '> .block-editor-inner-blocks > .block-editor-block-list__layout' : ''

  return (
    <style>
      {`${blockSelector} ${editorSelector} {
        flex-direction: ${direction.small};
        gap: ${gap.small.value + gap.small.unit};
        ${
          alignmentHorizontal.small === 'row'
            ? `justify-content: ${alignmentHorizontal.small}`
            : `align-items: ${alignmentHorizontal.small}`
        };
      }`}

      {!!direction.medium &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${blockSelector} ${editorSelector} {
            flex-direction: ${direction.medium};
            gap: ${gap.medium.value + gap.medium.unit};
            ${
              alignmentHorizontal.medium === 'row'
                ? `justify-content: ${alignmentHorizontal.medium}`
                : `align-items: ${alignmentHorizontal.medium}`
            };
          }
        }`}

      {!!direction.large &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${blockSelector} ${editorSelector} {
            flex-direction: ${direction.large};
            gap: ${gap.large.value + gap.large.unit};
            ${
              alignmentHorizontal.large === 'row'
                ? `justify-content: ${alignmentHorizontal.large}`
                : `align-items: ${alignmentHorizontal.large}`
            };
          }
        }`}
    </style>
  )
}

export default InlineStyles
