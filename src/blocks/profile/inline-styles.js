/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { blockId, contentAlignment, textAlignment, mediaGap, contentGap, direction, isReversed, mediaWidth, mediaHeight, mediaBorderRadius }, isEditor = false }) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`
  const editorSelector = isEditor ? '> .block-editor-inner-blocks > .block-editor-block-list__layout' : ''

  return (
    <style>
      {`${blockSelector} {
        justify-content: ${contentAlignment.small};
        text-align: ${textAlignment.small};
      }
      ${blockSelector} .${defaultClassName}__inner {
        flex-direction: ${direction.small}${isReversed.small ? '-reverse' : ''};
        gap: ${mediaGap.small.value + mediaGap.small.unit};
        ${direction.small === 'row' ? `justify-content: center;` : `align-items: center;`}
      }
      ${blockSelector} .${defaultClassName}__content ${editorSelector} > * {
        margin-top: ${contentGap.small.value / 2 + contentGap.small.unit};
        margin-bottom: ${contentGap.small.value / 2 + contentGap.small.unit};
      }
      ${blockSelector} .${defaultClassName}__media {
        width: ${mediaWidth.small.value + mediaWidth.small.unit};
        height: ${mediaHeight.small.value + mediaHeight.small.unit};
        border-radius: ${mediaBorderRadius.small.value + mediaBorderRadius.small.unit};
      }
      ${blockSelector} .${defaultClassName}__media.is-active .components-button {
        border-radius: ${mediaBorderRadius.small.value + mediaBorderRadius.small.unit};
      }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
        ${`${blockSelector} {
          ${contentAlignment.medium ? `justify-content: ${contentAlignment.medium};` : ''}
          ${textAlignment.medium ? `text-align: ${textAlignment.medium};` : ''}
        }
        ${blockSelector} .${defaultClassName}__inner {
          ${direction.medium ? `flex-direction: ${direction.medium}${isReversed.medium ? '-reverse' : ''};` : ''}
          ${mediaGap.medium.value > 0 ? `gap: ${mediaGap.medium.value + mediaGap.medium.unit};` : ''}
          ${direction.medium === 'row' ? 'justify-content: center;' : 'align-items: center;'}
        }
        ${blockSelector} .${defaultClassName}__content ${editorSelector} > * {
          ${contentGap.medium.value > 0 ? `gap: ${contentGap.medium.value + contentGap.medium.unit};` : ''}
        }
        ${blockSelector} .${defaultClassName}__media {
          ${mediaWidth.medium.value > 0 ? `width: ${mediaWidth.medium.value + mediaWidth.medium.unit};` : ''}
          ${mediaHeight.medium.value > 0 ? `height: ${mediaHeight.medium.value + mediaHeight.medium.unit};` : ''}
          ${mediaBorderRadius.medium.value > 0 ? `border-radius: ${mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit};` : ''}
        }
        ${blockSelector} .${defaultClassName}__media.is-active .components-button {
          ${mediaBorderRadius.medium.value > 0 ? `border-radius: ${mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit};` : ''}
        }`}
      }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
        ${`${blockSelector} {
          ${contentAlignment.large ? `justify-content: ${contentAlignment.large};` : ''}
          ${textAlignment.large ? `text-align: ${textAlignment.large};` : ''}
        }
        ${blockSelector} .${defaultClassName}__inner {
          ${direction.large ? `flex-direction: ${direction.large}${isReversed.large ? '-reverse' : ''};` : ''}
          ${mediaGap.large.value > 0 ? `gap: ${mediaGap.large.value + mediaGap.large.unit};` : ''}
          ${direction.large === 'row' ? `justify-content: center;` : `align-items: center;`}
        }
        ${blockSelector} .${defaultClassName}__content ${editorSelector} > * {
          ${contentGap.large.value > 0 ? `gap: ${contentGap.large.value + contentGap.large.unit};` : ''}
        }
        ${blockSelector} .${defaultClassName}__media {
          ${mediaWidth.large.value > 0 ? `width: ${mediaWidth.large.value + mediaWidth.large.unit};` : ''}
          ${mediaHeight.large.value > 0 ? `height: ${mediaHeight.large.value + mediaHeight.large.unit};` : ''}
          ${mediaBorderRadius.large.value > 0 ? `border-radius: ${mediaBorderRadius.large.value + mediaBorderRadius.large.unit};` : ''}
        }
        ${blockSelector} .${defaultClassName}__media.is-active .components-button {
          ${mediaBorderRadius.large.value > 0 ? `border-radius: ${mediaBorderRadius.large.value + mediaBorderRadius.large.unit};` : ''}
        }`}
      }`}
    </style>
  )
}

export default InlineStyles
