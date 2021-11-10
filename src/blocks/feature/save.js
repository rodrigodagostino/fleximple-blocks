/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'
import { Component } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'


const { name } = metadata


class FeatureSave extends Component {
  constructor() {
    super( ...arguments )

    this.state = {}
  }

  render() {
    const {
      className,
      attributes: {
        textAlignment,
        contentGap,
        url,
        linkTitle,
        linkTarget,
        noFollow,
        noReferrer,
      },
    } = this.props

    const defaultClassName = getBlockDefaultClassName( name )

    const classes = classnames(
      className, {
        [ `text-align-${ textAlignment.small }--sm` ]: textAlignment.small,
        [ `text-align-${ textAlignment.medium }--md` ]: textAlignment.medium,
        [ `text-align-${ textAlignment.large }--lg` ]: textAlignment.large,
        [ `content-gap-${ contentGap.small.value + ( contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit ) }--sm` ]: contentGap.small.value,
        [ `content-gap-${ contentGap.medium.value + ( contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit ) }--md` ]: contentGap.medium.value,
        [ `content-gap-${ contentGap.large.value + ( contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit ) }--lg` ]: contentGap.large.value,
      },
    )

    const relAttribute = linkTarget === '_blank'
      ? 'noopener noreferrer'
      : `${ noFollow ? 'nofollow' : '' } ${ noReferrer ? 'noreferrer' : '' }`.trim()

    return (
      <div className={ classes }>
        <style>
          { `.${ defaultClassName }.content-gap-${ contentGap.small.value + ( contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit ) }--sm .${ defaultClassName }__inner > * {
							${ 'margin-top: ' + contentGap.small.value / 2 + contentGap.small.unit + ';' }
							${ 'margin-bottom: ' + contentGap.small.value / 2 + contentGap.small.unit + ';' }
						}` }

          { !!contentGap.medium.value &&
						`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
						${ contentGap.medium.value ? `
							.${ defaultClassName }.content-gap-${ contentGap.medium.value + ( contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit ) }--md .${ defaultClassName }__inner > * {
								${ 'margin-top: ' + contentGap.medium.value / 2 + contentGap.medium.unit + ';' }
								${ 'margin-bottom: ' + contentGap.medium.value / 2 + contentGap.medium.unit + ';' }
							}` : '' }
						}`
          }

          { !!contentGap.large.value &&
						`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
						${ contentGap.large.value ? `
							.${ defaultClassName }.content-gap-${ contentGap.large.value + ( contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit ) }--lg .${ defaultClassName }__inner > * {
								${ 'margin-top: ' + contentGap.large.value / 2 + contentGap.large.unit + ';' }
								${ 'margin-bottom: ' + contentGap.large.value / 2 + contentGap.large.unit + ';' }
							}` : '' }
						}`
          }
        </style>

        <div className={ `${ defaultClassName }__inner` }>
          <InnerBlocks.Content />
        </div>

        { url &&
        <a
          className={ `${ defaultClassName }__link` }
          href={ url }
          target={ linkTarget }
          rel={ relAttribute ? relAttribute : null }
          title={ linkTitle }
          data-link-name="article"
          tabIndex="-1"
          aria-hidden="true"
        >
          { linkTitle }
        </a>
        }
      </div>
    )
  }
}

export default FeatureSave
