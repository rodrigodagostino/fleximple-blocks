/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
  withColors,
} from '@wordpress/block-editor'
import {
  BaseControl,
  KeyboardShortcuts,
  PanelBody,
  Popover,
  TextControl,
  ToggleControl,
  ToolbarButton,
  ToolbarGroup,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import { Component, useState } from '@wordpress/element'
import { rawShortcut, displayShortcut } from '@wordpress/keycodes'
import { link } from '@wordpress/icons'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import { setResponsiveAttribute } from './../../js/utils'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = []
const TEMPLATE = [
  [ 'fleximple-blocks/icon' ],
  [ 'core/heading', { level: 3 } ],
  [ 'core/paragraph', { placeholder: 'Write the description of your feature…' } ],
  [ 'fleximple-blocks/button' ],
]

function URLPicker({
  isSelected,
  url,
  setAttributes,
  opensInNewTab,
  onToggleOpenInNewTab,
}) {
  const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false )
  const openLinkControl = () => {
    setIsURLPickerOpen( true )

    // prevents default behaviour for event
    return false
  }
  const linkControl = isURLPickerOpen &&
  <Popover
    position="bottom center"
    onClose={ () => setIsURLPickerOpen( false ) }
  >
    <LinkControl
      className="wp-block-navigation-link__inline-link-input"
      value={ { url, opensInNewTab } }
      onChange={ ({
        url: newURL = '',
        opensInNewTab: newOpensInNewTab,
      }) => {
        setAttributes({ url: newURL })

        if ( opensInNewTab !== newOpensInNewTab ) {
          onToggleOpenInNewTab( newOpensInNewTab )
        }
      } }
    />
  </Popover>

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            name="link"
            icon={ link }
            title={ __( 'Link' ) }
            shortcut={ displayShortcut.primary( 'k' ) }
            onClick={ openLinkControl }
          />
        </ToolbarGroup>
      </BlockControls>
      { isSelected &&
      <KeyboardShortcuts
        bindGlobal
        shortcuts={ {
          [ rawShortcut.primary( 'k' ) ]: openLinkControl,
        } }
      />
      }
      { linkControl }
    </>
  )
}

class FeatureEdit extends Component {
  constructor() {
    super( ...arguments )

    this.onToggleOpenInNewTab = this.onToggleOpenInNewTab.bind( this )
  }

  onToggleOpenInNewTab( value ) {
    const { setAttributes } = this.props
    const newLinkTarget = value ? '_blank' : undefined

    setAttributes({
      linkTarget: newLinkTarget,
    })
  }

  render() {
    const {
      // className,
      attributes,
      attributes: {
        textAlignment,
        contentGap,
        url,
        linkTitle,
        linkTarget,
        noFollow,
        noReferrer,
      },
      // block,
      instanceId,
      isSelected,
      setAttributes,
    } = this.props

    const defaultClassName = getBlockDefaultClassName( name )

    const classes = classnames( defaultClassName, {
      [ `text-align-${ textAlignment.small }--sm` ]: textAlignment.small,
      [ `text-align-${ textAlignment.medium }--md` ]: textAlignment.medium,
      [ `text-align-${ textAlignment.large }--lg` ]: textAlignment.large,
      [ `content-gap-${ contentGap.small.value + ( contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit ) }--sm` ]: contentGap.small.value,
      [ `content-gap-${ contentGap.medium.value + ( contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit ) }--md` ]: contentGap.medium.value,
      [ `content-gap-${ contentGap.large.value + ( contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit ) }--lg` ]: contentGap.large.value,
    })

    const relAttribute = linkTarget === '_blank'
      ? 'noopener noreferrer'
      : `${ noFollow ? 'nofollow' : '' } ${ noReferrer ? 'noreferrer' : '' }`.trim()

    return (
      <>
        <BlockControls>
          <URLPicker
            url={ url }
            setAttributes={ setAttributes }
            isSelected={ isSelected }
            opensInNewTab={ linkTarget === '_blank' }
            onToggleOpenInNewTab={ this.onToggleOpenInNewTab }
          />
        </BlockControls>

        <InspectorControls>
          <PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
            <ResponsiveSettingsTabPanel initialTabName="small">
              { tab =>
                <>
                  <BaseControl
                    label={ __( 'Text alignment', 'fleximpleblocks' ) }
                    id={ `fleximple-blocks-profile-text-alignment-control-${ instanceId }` }
                  >
                    <AlignmentToolbar
                      id={ `fleximple-blocks-profile-text-alignment-control-${ instanceId }` }
                      value={ textAlignment[ tab.name ] }
                      onChange={ value => {
                        setResponsiveAttribute(
                          attributes,
                          setAttributes,
                          'textAlignment',
                          tab.name,
                          value,
                        )
                      } }
                      isCollapsed={ false }
                    />
                  </BaseControl>

                  <SpacingControls
                    valueLabel={ __( 'Content gap size', 'fleximpleblocks' ) }
                    unitLabel={ __( 'Content gap size unit', 'fleximpleblocks' ) }
                    initialPosition={ 0 }
                    min={ 0 }
                    max={ 200 }
                    attribute={ contentGap }
                    target={ tab.name }
                    onChange={ value => setAttributes({ contentGap: value }) }
                  />
                </>
              }
            </ResponsiveSettingsTabPanel>

            { url &&
            <>
              <TextControl
                label={ __( 'Link title', 'fleximpleblocks' ) }
                value={ linkTitle }
                placeholder={ __( 'Type the link title…', 'fleximpleblocks' ) }
                onChange={ value => setAttributes({ linkTitle: value }) }
                help={ __( 'Here you can provide a brief explanation about the link’s destination, which is meant to be used by screen readers.', 'fleximpleblocks' ) }
              />

              <ToggleControl
                label={ __( '“nofollow” attribute', 'fleximpleblocks' ) }
                checked={ !!noFollow }
                onChange={ () => setAttributes({ noFollow: !noFollow }) }
                help={
                  !noFollow ?
                    __( 'Google search spider should follow the links to this post.', 'fleximpleblocks' ) :
                    __( 'Google search spider should not follow the links to this post.', 'fleximpleblocks' )
                }
              />

              <ToggleControl
                label={ __( '“noreferrer” attribute', 'fleximpleblocks' ) }
                checked={ !!noReferrer }
                onChange={ () => setAttributes({ noReferrer: !noReferrer }) }
                help={
                  !noReferrer ?
                    __( 'The browser should send an HTTP referer header if the user follows the hyperlink.', 'fleximpleblocks' ) :
                    __( 'The browser should not send an HTTP referer header if the user follows the hyperlink.', 'fleximpleblocks' )
                }
              />
            </>
            }
          </PanelBody>
        </InspectorControls>

        <div className={ classes }>
          <style>
            { `.${ defaultClassName }.content-gap-${ contentGap.small.value + ( contentGap.small.unit === '%' ? 'pct' : contentGap.small.unit ) }--sm .${ defaultClassName }__inner > .block-editor-inner-blocks > .block-editor-block-list__layout > * {
								${ 'margin-top: ' + contentGap.small.value / 2 + contentGap.small.unit + ';' }
								${ 'margin-bottom: ' + contentGap.small.value / 2 + contentGap.small.unit + ';' }
							}` }

            { !!contentGap.medium.value &&
							`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
							${ contentGap.medium.value ?
        `.${ defaultClassName }.content-gap-${ contentGap.medium.value + ( contentGap.medium.unit === '%' ? 'pct' : contentGap.medium.unit ) }--md .${ defaultClassName }__inner > .block-editor-inner-blocks > .block-editor-block-list__layout > * {
									${ 'margin-top: ' + contentGap.medium.value / 2 + contentGap.medium.unit + ';' }
									${ 'margin-bottom: ' + contentGap.medium.value / 2 + contentGap.medium.unit + ';' }
								}` : '' }
							}`
            }

            { !!contentGap.large.value &&
							`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
							${ contentGap.large.value ?
        `.${ defaultClassName }.content-gap-${ contentGap.large.value + ( contentGap.large.unit === '%' ? 'pct' : contentGap.large.unit ) }--md .${ defaultClassName }__inner > .block-editor-inner-blocks > .block-editor-block-list__layout > * {
									${ 'margin-top: ' + contentGap.large.value / 2 + contentGap.large.unit + ';' }
									${ 'margin-bottom: ' + contentGap.large.value / 2 + contentGap.large.unit + ';' }
								}` : '' }
							}`
            }
          </style>

          <div className={ `${ defaultClassName }__inner` }>
            <InnerBlocks
              template={ TEMPLATE }
              templateLock={ false }
              allowedBlocks={ ALLOWED_BLOCKS }
            />
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
      </>
    )
  }
}

export default compose( [
  withColors({ iconColor: 'color' }),
  withSelect( ( select, ownProps ) => {
    const { clientId } = ownProps
    const { getBlock } = select( 'core/block-editor' )
    return {
      block: getBlock( clientId ),
    }
  }),
  withInstanceId,
] )( FeatureEdit )
