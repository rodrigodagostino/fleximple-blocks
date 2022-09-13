/* global fleximpleblocksPluginData */

const InlineStyles = ({ defaultClassName, attributes: { contentAlignment, mediaGap, contentGap, direction, isReversed, mediaWidth, mediaHeight, mediaBorderRadius }, isEditor = false }) => {
  const editorSelector = isEditor ? '> .block-editor-inner-blocks > .block-editor-block-list__layout' : ''

  return (
    <style>
      {`.${defaultClassName}.block-align-${contentAlignment.small}--sm {
        justify-content: ${contentAlignment.small};
      }
      .${defaultClassName}.direction-${direction.small}--sm .${defaultClassName}__inner {
        flex-direction: ${direction.small};
        gap: ${mediaGap.small.value + mediaGap.small.unit};
        ${direction.small === 'row' ? `justify-content: center;` : `align-items: center;`}
      }
      ${
        isReversed.small
          ? `.${defaultClassName}.direction-is-reversed--sm .${defaultClassName}__inner {
            flex-direction: ${direction.small + '-reverse'};
          }`
          : ''
      }
      .${defaultClassName}.content-gap-${contentGap.small.value + (contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit)}--sm .${defaultClassName}__content ${editorSelector} > * {
        margin-top: ${contentGap.small.value / 2 + contentGap.small.unit};
        margin-bottom: ${contentGap.small.value / 2 + contentGap.small.unit};
      }
      .${defaultClassName}.media-width-${mediaWidth.small.value + (mediaWidth.small.unit === '%' ? 'pct' : mediaWidth.small.unit)}--sm .${defaultClassName}__media {
        width: ${mediaWidth.small.value + mediaWidth.small.unit};
      }
      .${defaultClassName}.media-height-${mediaHeight.small.value + (mediaHeight.small.unit === '%' ? 'pct' : mediaHeight.small.unit)}--sm .${defaultClassName}__media {
        height: ${mediaHeight.small.value + mediaHeight.small.unit};
      }
      .${defaultClassName} .${defaultClassName}__media {
        border-radius: ${mediaBorderRadius.small.value + mediaBorderRadius.small.unit};
      }
      .${defaultClassName} .${defaultClassName}__media.is-active .components-button {
        border-radius: ${mediaBorderRadius.small.value + mediaBorderRadius.small.unit};
      }`}

      {(!!contentAlignment.medium || !!mediaGap.medium.value || !!contentGap.medium.value || !!mediaWidth.medium.value || !!mediaHeight.medium.value || !!mediaBorderRadius.medium.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
          ${
            contentAlignment.medium
              ? `.${defaultClassName}.direction-${direction.medium}--md {
                justify-content: ${contentAlignment.medium};
              }`
              : ''
          }
          ${
            direction.medium && mediaGap.medium
              ? `.${defaultClassName}.direction-${direction.medium}--md .${defaultClassName}__inner {
                ${direction.medium && `flex-direction: ${direction.medium}`};
                ${mediaGap.medium && `gap: ${mediaGap.medium.value + mediaGap.medium.unit}`};
                ${direction.medium === 'row' ? `justify-content: center;` : `align-items: center;`}
              }`
              : ''
          }
          ${
            isReversed.medium
              ? `.${defaultClassName}.direction-is-reversed--md .${defaultClassName}__inner {
                flex-direction: ${direction.medium + '-reverse'};
              }`
              : ''
          }
          ${
            contentGap.medium.value
              ? `.${defaultClassName}.content-gap-${contentGap.medium.value + (contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit)}--md .${defaultClassName}__content ${editorSelector} > * {
                margin-top: ${contentGap.medium.value / 2 + contentGap.medium.unit};
                margin-bottom: ${contentGap.medium.value / 2 + contentGap.medium.unit};
              }`
              : ''
          }
          ${
            mediaWidth.medium.value
              ? `.${defaultClassName}.media-width-${mediaWidth.medium.value + (mediaWidth.medium.unit === '%' ? 'pct' : mediaWidth.medium.unit)}--md .${defaultClassName}__media {
                width: ${mediaWidth.medium.value + mediaWidth.medium.unit};
              }`
              : ''
          }
          ${
            mediaHeight.medium.value
              ? `.${defaultClassName}.media-height-${mediaHeight.medium.value + (mediaHeight.medium.unit === '%' ? 'pct' : mediaHeight.medium.unit)}--md .${defaultClassName}__media {
                height: ${mediaHeight.medium.value + mediaHeight.medium.unit};
              }`
              : ''
          }
          ${
            mediaBorderRadius.medium.value
              ? `.${defaultClassName} .${defaultClassName}__media {
                border-radius: ${mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit};
              }
              .${defaultClassName} .${defaultClassName}__media.is-active .components-button {
                border-radius: ${mediaBorderRadius.medium.value + mediaBorderRadius.medium.unit};
              }`
              : ''
          }
        }`}

      {(!!contentAlignment.large || !!mediaGap.large.value || !!contentGap.large.value || !!mediaWidth.large.value || !!mediaHeight.large.value || !!mediaBorderRadius.large.value) &&
        `@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
          ${
            contentAlignment.large
              ? `.${defaultClassName}.direction-${direction.large}--lg {
                justify-content: ${contentAlignment.large};
              }`
              : ''
          }
          ${
            direction.large && mediaGap.large
              ? `.${defaultClassName}.direction-${direction.large}--lg .${defaultClassName}__inner {
                ${direction.large && `flex-direction: ${direction.large}`};
                ${mediaGap.large && `gap: ${mediaGap.large.value + mediaGap.large.unit}`};
                ${direction.large === 'row' ? `align-items: center;` : `justify-content: center;`}
              }`
              : ''
          }
          ${
            isReversed.large
              ? `.${defaultClassName}.direction-is-reversed--lg .${defaultClassName}__inner {
                flex-direction: ${direction.large + '-reverse'};
              }`
              : ''
          }
          ${
            contentGap.large.value
              ? `.${defaultClassName}.content-gap-${contentGap.large.value + (contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit)}--lg .${defaultClassName}__content ${editorSelector} > * {
                margin-top: ${contentGap.large.value / 2 + contentGap.large.unit};
                margin-bottom: ${contentGap.large.value / 2 + contentGap.large.unit};
              }`
              : ''
          }
          ${
            mediaWidth.large.value
              ? `.${defaultClassName}.media-width-${mediaWidth.large.value + (mediaWidth.large.unit === '%' ? 'pct' : mediaWidth.large.unit)}--lg .${defaultClassName}__media {
                width: ${mediaWidth.large.value + mediaWidth.large.unit};
              }`
              : ''
          }
          ${
            mediaHeight.large.value
              ? `.${defaultClassName}.media-height-${mediaHeight.large.value + (mediaHeight.large.unit === '%' ? 'pct' : mediaHeight.large.unit)}--lg .${defaultClassName}__media {
                height: ${mediaHeight.large.value + mediaHeight.large.unit};
              }`
              : ''
          }
          ${
            mediaBorderRadius.large.value
              ? `.${defaultClassName} .${defaultClassName}__media {
                border-radius: ${mediaBorderRadius.large.value + mediaBorderRadius.large.unit};
              }
              .${defaultClassName} .${defaultClassName}__media.is-active .components-button {
                border-radius: ${mediaBorderRadius.large.value + mediaBorderRadius.large.unit};
              }`
              : ''
          }
        }`}
    </style>
  )
}

export default InlineStyles
