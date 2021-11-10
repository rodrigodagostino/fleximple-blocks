/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  getColorClassName,
  InnerBlocks,
  useBlockProps,
} from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function RowSave({
  attributes: {
    rowId,
    rowTag,
    alignmentHorizontal,
    alignmentVertical,
    minHeight,
    contentWidth,
    marginTop,
    marginBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    mediaId,
    mediaUrl,
    focalPoint,
    backgroundSize,
    backgroundRepeat,
    backgroundFixed,
    overlayColor,
    customOverlayColor,
    overlayOpacity,
  },
}) {
  const defaultClassName = getBlockDefaultClassName( name )

  const classes = classnames({
    [ `block-align-h-${ alignmentHorizontal.small }--sm` ]: alignmentHorizontal.small,
    [ `block-align-h-${ alignmentHorizontal.medium }--md` ]: alignmentHorizontal.medium,
    [ `block-align-h-${ alignmentHorizontal.large }--lg` ]: alignmentHorizontal.large,
    [ `block-align-v-${ alignmentVertical.small }--sm` ]: alignmentVertical.small,
    [ `block-align-v-${ alignmentVertical.medium }--md` ]: alignmentVertical.medium,
    [ `block-align-v-${ alignmentVertical.large }--lg` ]: alignmentVertical.large,
    [ `min-height-${ minHeight.small.value + ( minHeight.small.unit === '%' ? 'pct' : minHeight.small.unit ) }--sm` ]: minHeight.small.value,
    [ `min-height-${ minHeight.medium.value + ( minHeight.medium.unit === '%' ? 'pct' : minHeight.medium.unit ) }--md` ]: minHeight.medium.value,
    [ `min-height-${ minHeight.large.value + ( minHeight.large.unit === '%' ? 'pct' : minHeight.large.unit ) }--lg` ]: minHeight.large.value,
    [ `content-width-${ contentWidth.small.value + ( contentWidth.small.unit === '%' ? 'pct' : contentWidth.small.unit ) }--sm` ]: contentWidth.small.value,
    [ `content-width-${ contentWidth.medium.value + ( contentWidth.medium.unit === '%' ? 'pct' : contentWidth.medium.unit ) }--md` ]: contentWidth.medium.value,
    [ `content-width-${ contentWidth.large.value + ( contentWidth.large.unit === '%' ? 'pct' : contentWidth.large.unit ) }--lg` ]: contentWidth.large.value,
    [ `margin-top-${ marginTop.small.value + ( marginTop.small.unit === '%' ? 'pct' : marginTop.small.unit ) }--sm` ]: marginTop.small.value,
    [ `margin-top-${ marginTop.medium.value + ( marginTop.medium.unit === '%' ? 'pct' : marginTop.medium.unit ) }--md` ]: marginTop.medium.value,
    [ `margin-top-${ marginTop.large.value + ( marginTop.large.unit === '%' ? 'pct' : marginTop.large.unit ) }--lg` ]: marginTop.large.value,
    [ `margin-bottom-${ marginBottom.small.value + ( marginBottom.small.unit === '%' ? 'pct' : marginBottom.small.unit ) }--sm` ]: marginBottom.small.value,
    [ `margin-bottom-${ marginBottom.medium.value + ( marginBottom.medium.unit === '%' ? 'pct' : marginBottom.medium.unit ) }--md` ]: marginBottom.medium.value,
    [ `margin-bottom-${ marginBottom.large.value + ( marginBottom.large.unit === '%' ? 'pct' : marginBottom.large.unit ) }--lg` ]: marginBottom.large.value,
    [ `padding-top-${ paddingTop.small.value + ( paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit ) }--sm` ]: paddingTop.small.value,
    [ `padding-top-${ paddingTop.medium.value + ( paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit ) }--md` ]: paddingTop.medium.value,
    [ `padding-top-${ paddingTop.large.value + ( paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit ) }--lg` ]: paddingTop.large.value,
    [ `padding-left-${ paddingLeft.small.value + ( paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit ) }--sm` ]: paddingLeft.small.value,
    [ `padding-left-${ paddingLeft.medium.value + ( paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit ) }--md` ]: paddingLeft.medium.value,
    [ `padding-left-${ paddingLeft.large.value + ( paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit ) }--lg` ]: paddingLeft.large.value,
    [ `padding-right-${ paddingRight.small.value + ( paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit ) }--sm` ]: paddingRight.small.value,
    [ `padding-right-${ paddingRight.medium.value + ( paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit ) }--md` ]: paddingRight.medium.value,
    [ `padding-right-${ paddingRight.large.value + ( paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit ) }--lg` ]: paddingRight.large.value,
    [ `padding-bottom-${ paddingBottom.small.value + ( paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit ) }--sm` ]: paddingBottom.small.value,
    [ `padding-bottom-${ paddingBottom.medium.value + ( paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit ) }--md` ]: paddingBottom.medium.value,
    [ `padding-bottom-${ paddingBottom.large.value + ( paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit ) }--lg` ]: paddingBottom.large.value,
    [ `background-image-id-${ mediaId.small }--sm` ]: mediaId.small && mediaUrl.small,
    [ `background-image-id-${ mediaId.medium }--md` ]: mediaId.medium && mediaUrl.medium,
    [ `background-image-id-${ mediaId.large }--lg` ]: mediaId.large && mediaUrl.large,
    [ `background-position-${ focalPoint.small.x * 100 }-${ focalPoint.small.y * 100 }--sm` ]: mediaId.small && ( focalPoint.small.x || focalPoint.small.y ),
    [ `background-position-${ focalPoint.medium.x * 100 }-${ focalPoint.medium.y * 100 }--md` ]: mediaId.medium && ( focalPoint.medium.x || focalPoint.medium.y ) && ( focalPoint.medium.x !== focalPoint.small.x || focalPoint.medium.y !== focalPoint.small.y ),
    [ `background-position-${ focalPoint.large.x * 100 }-${ focalPoint.large.y * 100 }--lg` ]: mediaId.large && ( focalPoint.large.x || focalPoint.large.y ) && ( focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y ),
    [ `background-size-${ backgroundSize.small }--sm` ]: mediaId.small && backgroundSize.small,
    [ `background-size-${ backgroundSize.medium }--md` ]: mediaId.medium && backgroundSize.medium && backgroundSize.medium !== backgroundSize.small,
    [ `background-size-${ backgroundSize.large }--lg` ]: mediaId.large && backgroundSize.large && backgroundSize.large !== backgroundSize.medium,
    [ `background-repeat-${ backgroundRepeat.small }--sm` ]: mediaId.small && backgroundRepeat.small,
    [ `background-repeat-${ backgroundRepeat.medium }--md` ]: mediaId.medium && backgroundRepeat.medium && backgroundRepeat.medium !== backgroundRepeat.small,
    [ `background-repeat-${ backgroundRepeat.large }--lg` ]: mediaId.large && backgroundRepeat.large && backgroundRepeat.large !== backgroundRepeat.medium,
    'background-attachment-fixed': ( mediaId.small || mediaId.medium || mediaId.large ) && backgroundFixed,
  })

  const overlayColorClass = getColorClassName( 'background-color', overlayColor )

  const overlayClasses = classnames(
    `${ defaultClassName }__overlay`, {
      'has-background': ( overlayColor || customOverlayColor ) && overlayOpacity,
      [ overlayColorClass ]: overlayColorClass && overlayOpacity,
      [ `opacity-${ overlayOpacity }` ]: overlayOpacity,
    },
  )

  const overlayStyles = {
    backgroundColor: !overlayOpacity && overlayColorClass ? undefined : customOverlayColor,
  }

  const RowTag = rowTag

  return (
    <RowTag { ...useBlockProps.save({ id: rowId, className: classes }) }>
      <style>
        { !!alignmentHorizontal.small &&
          `.${ defaultClassName }.block-align-h-${ alignmentHorizontal.small }--sm > .${ defaultClassName }__inner {
            justify-content: ${ alignmentHorizontal.small };
          }` }
        { !!alignmentVertical.small &&
          `.${ defaultClassName }.block-align-v-${ alignmentVertical.small }--sm > .${ defaultClassName }__inner > .${ defaultClassName }__content {
            justify-content: ${ alignmentVertical.small };
          }` }
        { !!minHeight.small.value &&
          `.${ defaultClassName }.min-height-${ minHeight.small.value + ( minHeight.small.unit === '%' ? 'pct' : minHeight.small.unit ) }--sm > .${ defaultClassName }__inner > .${ defaultClassName }__content {
            min-height: ${ minHeight.small.value + minHeight.small.unit };
          }` }
        { !!contentWidth.small.value &&
          `.${ defaultClassName }.content-width-${ contentWidth.small.value + ( contentWidth.small.unit === '%' ? 'pct' : contentWidth.small.unit ) }--sm .${ defaultClassName }__content {
            width: ${ contentWidth.small.value + contentWidth.small.unit };
          }` }
        { !!marginTop.small.value &&
          `.${ defaultClassName }.margin-top-${ marginTop.small.value + ( marginTop.small.unit === '%' ? 'pct' : marginTop.small.unit ) }--sm {
            margin-top: ${ marginTop.small.value + marginTop.small.unit };
          }` }
        { !!marginBottom.small.value &&
          `.${ defaultClassName }.margin-bottom-${ marginBottom.small.value + ( marginBottom.small.unit === '%' ? 'pct' : marginBottom.small.unit ) }--sm {
            margin-bottom: ${ marginBottom.small.value + marginBottom.small.unit };
          }` }
        { !!paddingTop.small.value &&
          `.${ defaultClassName }.padding-top-${ paddingTop.small.value + ( paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit ) }--sm {
            padding-top: ${ paddingTop.small.value + paddingTop.small.unit };
          }` }
        { !!paddingLeft.small.value &&
          `.${ defaultClassName }.padding-left-${ paddingLeft.small.value + ( paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit ) }--sm {
            padding-left: ${ paddingLeft.small.value + paddingLeft.small.unit };
          }` }
        { !!paddingRight.small.value &&
          `.${ defaultClassName }.padding-right-${ paddingRight.small.value + ( paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit ) }--sm {
            padding-right: ${ paddingRight.small.value + paddingRight.small.unit };
          }` }
        { !!paddingBottom.small.value &&
          `.${ defaultClassName }.padding-bottom-${ paddingBottom.small.value + ( paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit ) }--sm {
            padding-bottom: ${ paddingBottom.small.value + paddingBottom.small.unit };
          }` }
        { !!mediaId.small && !!mediaUrl.small &&
          `${ mediaUrl.small ? `
            .${ defaultClassName }.background-image-id-${ mediaId.small }--sm {
                background-image: url('${ mediaUrl.small }');
              }` : '' }
            ${ !!focalPoint.small.x || !!focalPoint.small.y ? `
              .${ defaultClassName }.background-position-${ focalPoint.small.x * 100 }-${ focalPoint.small.y * 100 }--sm {
                background-position: ${ focalPoint.small.x * 100 }% ${ focalPoint.small.y * 100 }%;
              }` : '' }
            ${ backgroundSize.small ? `
              .${ defaultClassName }.background-size-${ backgroundSize.small }--sm {
                background-size: ${ backgroundSize.small };
              }` : '' }
            ${ backgroundRepeat.small ? `
              .${ defaultClassName }.background-repeat-${ backgroundRepeat.small }--sm {
                background-repeat: ${ backgroundRepeat.small };
              }` : '' }`
        }

        { ( !!minHeight.medium.value || !!contentWidth.medium.value || !!marginTop.medium.value || !!marginBottom.medium.value || !!paddingTop.medium.value || !!paddingLeft.medium.value || !!paddingRight.medium.value || !!paddingBottom.medium.value || !!mediaId.medium ) &&
          `@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
            ${ alignmentHorizontal.medium ? `
              .${ defaultClassName }.block-align-h-${ alignmentHorizontal.medium }--md > .${ defaultClassName }__inner {
                justify-content: ${ alignmentHorizontal.medium };
              }` : '' }
            ${ alignmentVertical.medium ? `
              .${ defaultClassName }.block-align-v-${ alignmentVertical.medium }--md > .${ defaultClassName }__inner > .${ defaultClassName }__content {
                justify-content: ${ alignmentVertical.medium };
              }` : '' }
            ${ minHeight.medium.value ? `
              .${ defaultClassName }.min-height-${ minHeight.medium.value + ( minHeight.medium.unit === '%' ? 'pct' : minHeight.medium.unit ) }--md > .${ defaultClassName }__inner > .${ defaultClassName }__content {
                min-height: ${ minHeight.medium.value + minHeight.medium.unit };
              }` : '' }
            ${ contentWidth.medium.value ? `
              .${ defaultClassName }.content-width-${ contentWidth.medium.value + ( contentWidth.medium.unit === '%' ? 'pct' : contentWidth.medium.unit ) }--md .${ defaultClassName }__content {
                width: ${ contentWidth.medium.value + contentWidth.medium.unit };
              }` : '' }
            ${ marginTop.medium.value ? `
              .${ defaultClassName }.margin-top-${ marginTop.medium.value + ( marginTop.medium.unit === '%' ? 'pct' : marginTop.medium.unit ) }--md {
                margin-top: ${ marginTop.medium.value + marginTop.medium.unit };
              }` : '' }
            ${ marginBottom.medium.value ? `
              .${ defaultClassName }.margin-bottom-${ marginBottom.medium.value + ( marginBottom.medium.unit === '%' ? 'pct' : marginBottom.medium.unit ) }--md {
                margin-bottom: ${ marginBottom.medium.value + marginBottom.medium.unit };
              }` : '' }
            ${ paddingTop.medium.value ? `
              .${ defaultClassName }.padding-top-${ paddingTop.medium.value + ( paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit ) }--md {
                padding-top: ${ paddingTop.medium.value + paddingTop.medium.unit };
              }` : '' }
            ${ paddingLeft.medium.value ? `
              .${ defaultClassName }.padding-left-${ paddingLeft.medium.value + ( paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit ) }--md {
                padding-left: ${ paddingLeft.medium.value + paddingLeft.medium.unit };
              }` : '' }
            ${ paddingRight.medium.value ? `
              .${ defaultClassName }.padding-right-${ paddingRight.medium.value + ( paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit ) }--md {
                padding-right: ${ paddingRight.medium.value + paddingRight.medium.unit };
              }` : '' }
            ${ paddingBottom.medium.value ? `
              .${ defaultClassName }.padding-bottom-${ paddingBottom.medium.value + ( paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit ) }--md {
                padding-bottom: ${ paddingBottom.medium.value + paddingBottom.medium.unit };
              }` : '' }
            ${ !!mediaId.medium && !!mediaUrl.medium ? `
              ${ mediaUrl.medium ? `
                .${ defaultClassName }.background-image-id-${ mediaId.medium }--md {
                    background-image: url('${ mediaUrl.medium }');
                  }` : '' }
                ${ ( !!focalPoint.medium.x || !!focalPoint.medium.y ) && ( focalPoint.medium.x !== focalPoint.small.x || focalPoint.medium.y !== focalPoint.small.y ) ? `
                  .${ defaultClassName }.background-position-${ focalPoint.medium.x * 100 }-${ focalPoint.medium.y * 100 }--md {
                    background-position: ${ focalPoint.medium.x * 100 }% ${ focalPoint.medium.y * 100 }%;
                  }` : '' }
                ${ !!backgroundSize.medium && backgroundSize.medium !== backgroundSize.small ? `
                  .${ defaultClassName }.background-size-${ backgroundSize.medium }--md {
                    background-size: ${ backgroundSize.medium };
                  }` : '' }
                ${ !!backgroundRepeat.medium && backgroundRepeat.medium !== backgroundRepeat.small ? `
                  .${ defaultClassName }.background-repeat-${ backgroundRepeat.medium }--md {
                    background-repeat: ${ backgroundRepeat.medium };
                  }` : '' }
          }` : '' }`
        }

        { ( !!alignmentHorizontal.large || !!alignmentVertical.large || !!minHeight.large.value || !!contentWidth.large.value || !!marginTop.large.value || !!marginBottom.large.value || !!paddingTop.large.value || !!paddingLeft.large.value || !!paddingRight.large.value || !!paddingBottom.large.value || !!mediaId.large ) &&
          `@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
            ${ alignmentHorizontal.large ? `
              .${ defaultClassName }.block-align-h-${ alignmentHorizontal.large }--lg > .${ defaultClassName }__inner {
                justify-content: ${ alignmentHorizontal.large };
              }` : '' }
            ${ alignmentVertical.large ? `
              .${ defaultClassName }.block-align-v-${ alignmentVertical.large }--lg > .${ defaultClassName }__inner > .${ defaultClassName }__content {
                justify-content: ${ alignmentVertical.large };
              }` : '' }
            ${ minHeight.large.value ? `
              .${ defaultClassName }.min-height-${ minHeight.large.value + ( minHeight.large.unit === '%' ? 'pct' : minHeight.large.unit ) }--lg > .${ defaultClassName }__inner > .${ defaultClassName }__content {
                min-height: ${ minHeight.large.value + minHeight.large.unit };
              }` : '' }
            ${ contentWidth.large.value ? `
              .${ defaultClassName }.content-width-${ contentWidth.large.value + ( contentWidth.large.unit === '%' ? 'pct' : contentWidth.large.unit ) }--lg .${ defaultClassName }__content {
                width: ${ contentWidth.large.value + contentWidth.large.unit };
              }` : '' }
            ${ marginTop.large.value ? `
              .${ defaultClassName }.margin-top-${ marginTop.large.value + ( marginTop.large.unit === '%' ? 'pct' : marginTop.large.unit ) }--lg {
                margin-top: ${ marginTop.large.value + marginTop.large.unit };
              }` : '' }
            ${ marginBottom.large.value ? `
              .${ defaultClassName }.margin-bottom-${ marginBottom.large.value + ( marginBottom.large.unit === '%' ? 'pct' : marginBottom.large.unit ) }--lg {
                margin-bottom: ${ marginBottom.large.value + marginBottom.large.unit };
              }` : '' }
            ${ paddingTop.large.value ? `
              .${ defaultClassName }.padding-top-${ paddingTop.large.value + ( paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit ) }--lg {
                padding-top: ${ paddingTop.large.value + paddingTop.large.unit };
              }` : '' }
            ${ paddingLeft.large.value ? `
              .${ defaultClassName }.padding-left-${ paddingLeft.large.value + ( paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit ) }--lg {
                padding-left: ${ paddingLeft.large.value + paddingLeft.large.unit };
              }` : '' }
            ${ paddingRight.large.value ? `
              .${ defaultClassName }.padding-right-${ paddingRight.large.value + ( paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit ) }--lg {
                padding-right: ${ paddingRight.large.value + paddingRight.large.unit };
              }` : '' }
            ${ paddingBottom.large.value ? `
              .${ defaultClassName }.padding-bottom-${ paddingBottom.large.value + ( paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit ) }--lg {
                padding-bottom: ${ paddingBottom.large.value + paddingBottom.large.unit };
              }` : '' }
            ${ !!mediaId.large && !!mediaUrl.large ? `
              ${ mediaUrl.large ? `
                .${ defaultClassName }.background-image-id-${ mediaId.large }--lg {
                  background-image: url('${ mediaUrl.large }');
                }` : '' }
                ${ ( !!focalPoint.large.x || !!focalPoint.large.y ) && ( focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y ) ? `
                  .${ defaultClassName }.background-position-${ focalPoint.large.x * 100 }-${ focalPoint.large.y * 100 }--lg {
                    background-position: ${ focalPoint.large.x * 100 }% ${ focalPoint.large.y * 100 }%;
                  }` : '' }
                ${ !!backgroundSize.large && backgroundSize.large !== backgroundSize.medium ? `
                  .${ defaultClassName }.background-size-${ backgroundSize.large }--lg {
                    background-size: ${ backgroundSize.large };
                  }` : '' }
                ${ !!backgroundRepeat.large && backgroundRepeat.large !== backgroundRepeat.medium ? `
                  .${ defaultClassName }.background-repeat-${ backgroundRepeat.large }--lg {
                    background-repeat: ${ backgroundRepeat.large };
                  }` : '' }
          }` : '' }`
        }
      </style>

      <div className={ `${ defaultClassName }__inner` }>
        { ( !!overlayColor || !!customOverlayColor ) &&
          <div className={ overlayClasses } style={ overlayStyles } />
        }

        <div className={ `${ defaultClassName }__content` }>
          <InnerBlocks.Content />
        </div>
      </div>
    </RowTag>
  )
}

export default RowSave
