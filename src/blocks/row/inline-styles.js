/* global fleximpleblocksPluginData */

const InlineStyles = ({
  defaultClassName,
  attributes: {
    blockId,
    alignmentHorizontal,
    alignmentVertical,
    minHeight,
    contentWidth,
    contentGap,
    marginTop,
    marginBottom,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    mediaUrl,
    focalPoint,
    backgroundSize,
    backgroundRepeat,
  },
  isEditor = false,
}) => {
  const blockSelector = `.${defaultClassName}[data-block-id="${blockId}"]`
  const editorSelector = isEditor ? '> .block-editor-inner-blocks > .block-editor-block-list__layout' : ''

  return (
    <style>
      {`${blockSelector} {
        padding-top: ${paddingTop.small.value + paddingTop.small.unit};
        padding-right: ${paddingRight.small.value + paddingRight.small.unit};
        padding-bottom: ${paddingBottom.small.value + paddingBottom.small.unit};
        padding-left: ${paddingLeft.small.value + paddingLeft.small.unit};
        margin-top: ${marginTop.small.value + marginTop.small.unit};
        margin-bottom: ${marginBottom.small.value + marginBottom.small.unit};
        background-image: url('${mediaUrl.small}');
        ${mediaUrl.small ? `background-position: ${focalPoint.small.x * 100}% ${focalPoint.small.y * 100}%;` : ''}
        ${mediaUrl.small ? `background-size: ${backgroundSize.small};` : ''}
        ${mediaUrl.small ? `background-repeat: ${backgroundRepeat.small};` : ''}
      }
      ${blockSelector} > .${defaultClassName}__inner {
        justify-content: ${alignmentHorizontal.small};
      }
      ${
        isEditor
          ? `${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content {
            width: ${contentWidth.small.value + contentWidth.small.unit};
          }
          ${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content > .block-editor-inner-blocks {
            display: flex;
            justify-content: ${alignmentHorizontal.small};
          }`
          : ''
      }
      ${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content ${editorSelector} {
        width: ${contentWidth.small.value + contentWidth.small.unit};
        min-height: ${minHeight.small.value + minHeight.small.unit};
        gap: ${contentGap.small.value + contentGap.small.unit};
        justify-content: ${alignmentVertical.small};
      }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.mediumBreakpointValue}px) {
        ${blockSelector} {
          ${paddingTop.medium.value > 0 ? `padding-top: ${paddingTop.medium.value + paddingTop.medium.unit};` : ''}
          ${paddingRight.medium.value > 0 ? `padding-right: ${paddingRight.medium.value + paddingRight.medium.unit};` : ''}
          ${paddingBottom.medium.value > 0 ? `padding-bottom: ${paddingBottom.medium.value + paddingBottom.medium.unit};` : ''}
          ${paddingLeft.medium.value > 0 ? `padding-left: ${paddingLeft.medium.value + paddingLeft.medium.unit};` : ''}
          ${marginTop.medium.value > 0 ? `margin-top: ${marginTop.medium.value + marginTop.medium.unit};` : ''}
          ${marginBottom.medium.value > 0 ? `margin-bottom: ${marginBottom.medium.value + marginBottom.medium.unit};` : ''}
          ${mediaUrl.medium ? `background-image: url('${mediaUrl.medium}');` : ''}
          ${mediaUrl.medium ? `background-position: ${focalPoint.medium.x * 100}% ${focalPoint.medium.y * 100}%;` : ''}
          ${mediaUrl.medium && backgroundSize.medium ? `background-size: ${backgroundSize.medium};` : ''}
          ${mediaUrl.medium && backgroundRepeat.medium ? `background-repeat: ${backgroundRepeat.medium};` : ''}
        }
        ${blockSelector} > .${defaultClassName}__inner {
          ${alignmentHorizontal.medium ? `justify-content: ${alignmentHorizontal.medium};` : ''}
        }
        ${
          isEditor && contentWidth.medium.value > 0
            ? `${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content {
              width: ${contentWidth.medium.value + contentWidth.medium.unit};
            }
            ${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content > .block-editor-inner-blocks {
              justify-content: ${alignmentHorizontal.medium};
            }`
            : ''
        }
        ${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content ${editorSelector} {
          ${contentWidth.medium.value > 0 ? `width: ${contentWidth.medium.value + contentWidth.medium.unit};` : ''}
          ${minHeight.medium.value > 0 ? `min-height: ${minHeight.medium.value + minHeight.medium.unit};` : ''}
          ${contentGap.medium.value > 0 ? `gap: ${contentGap.medium.value + contentGap.medium.unit};` : ''}
          ${alignmentVertical.medium ? `justify-content: ${alignmentVertical.medium};` : ''}
        }
      }`}

      {`@media only screen and (min-width: ${fleximpleblocksPluginData.settings.largeBreakpointValue}px) {
        ${blockSelector} {
          ${paddingTop.large.value > 0 ? `padding-top: ${paddingTop.large.value + paddingTop.large.unit};` : ''}
          ${paddingRight.large.value > 0 ? `padding-right: ${paddingRight.large.value + paddingRight.large.unit};` : ''}
          ${paddingBottom.large.value > 0 ? `padding-bottom: ${paddingBottom.large.value + paddingBottom.large.unit};` : ''}
          ${paddingLeft.large.value > 0 ? `padding-left: ${paddingLeft.large.value + paddingLeft.large.unit};` : ''}
          ${marginTop.large.value > 0 ? `margin-top: ${marginTop.large.value + marginTop.large.unit};` : ''}
          ${marginBottom.large.value > 0 ? `margin-bottom: ${marginBottom.large.value + marginBottom.large.unit};` : ''}
          ${mediaUrl.large ? `background-image: url('${mediaUrl.large}');` : ''}
          ${mediaUrl.large ? `background-position: ${focalPoint.large.x * 100}% ${focalPoint.large.y * 100}%;` : ''}
          ${mediaUrl.large && backgroundSize.large ? `background-size: ${backgroundSize.large};` : ''}
          ${mediaUrl.large && backgroundRepeat.large ? `background-repeat: ${backgroundRepeat.large};` : ''}
        }
        ${blockSelector} > .${defaultClassName}__inner {
          ${alignmentHorizontal.large ? `justify-content: ${alignmentHorizontal.large};` : ''}
        }
        ${
          isEditor && contentWidth.large.value > 0
            ? `${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content {
              width: ${contentWidth.large.value + contentWidth.large.unit};
            }
            ${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content > .block-editor-inner-blocks {
              justify-content: ${alignmentHorizontal.large};
            }`
            : ''
        }
        ${blockSelector} > .${defaultClassName}__inner > .${defaultClassName}__content ${editorSelector} {
          ${contentWidth.large.value > 0 ? `width: ${contentWidth.large.value + contentWidth.large.unit};` : ''}
          ${minHeight.large.value > 0 ? `min-height: ${minHeight.large.value + minHeight.large.unit};` : ''}
          ${contentGap.large.value > 0 ? `gap: ${contentGap.large.value + contentGap.large.unit};` : ''}
          ${alignmentVertical.large ? `justify-content: ${alignmentVertical.large};` : ''}
        }
      }`}
    </style>
  )
}

export default InlineStyles
