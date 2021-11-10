/**
 * External dependencies
 */
import classnames from 'classnames'
import memoize from 'memize'
import times from 'lodash/times'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName, createBlock } from '@wordpress/blocks'
import {
  BlockControls,
  InnerBlocks,
  InspectorControls,
  RichText,
} from '@wordpress/block-editor'
import {
  BaseControl,
  Icon,
  PanelBody,
  Tooltip,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { dispatch, withSelect } from '@wordpress/data'
import { Component } from '@wordpress/element'
import { ENTER, SPACE } from '@wordpress/keycodes'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import { interactionIcons } from 'fleximple-components/components/icons'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = [ 'fleximple-blocks/tab-panel' ]

const getTabsTemplate = memoize( count => {
  return times( count, () => [ 'fleximple-blocks/tab-panel' ] )
})

class TabsEdit extends Component {
  constructor() {
    super( ...arguments )

    this.onAddTab = this.onAddTab.bind( this )
    this.onRemoveTab = this.onRemoveTab.bind( this )
    this.newLabels = this.newLabels.bind( this )
    this.updateLabels = this.updateLabels.bind( this )
    this.activatePanel = this.activatePanel.bind( this )
    
    this.state = {
      currentTab: 1,
    }
  }

  componentDidMount() {
    const { className, setAttributes } = this.props
    const { currentTab } = this.state

    if ( !className.includes( 'is-style-' ) ) {
      setAttributes({ className: 'is-style-standard' })
    }

    if ( this.state.currentTab ) {
      this.activatePanel( currentTab - 1 )
    }
  }

  onAddTab = () => {
    const { attributes: { count }, setAttributes, clientId } = this.props

    // Create a new block
    const insertedBlock = createBlock( 'fleximple-blocks/tab-panel', {
      content: __( 'Write content…', 'fleximpleblocks' ),
    })
    // Insert the block
    dispatch( 'core/editor' ).insertBlock( insertedBlock, count, clientId, false )

    this.setState({
      currentTab: count + 1,
    }, () => this.activatePanel( count ) )

    setAttributes({
      count: count + 1,
      tabsData: this.newLabels(),
    })
  }

  onRemoveTab = tabIndex => {
    const { currentTab } = this.state
    const { attributes: { count, tabsData }, setAttributes, block } = this.props

    // Retrieve the block ID
    const removedBlockId = block.innerBlocks[ tabIndex ].clientId
    // Remove the block
    dispatch( 'core/editor' ).removeBlock( removedBlockId, false )

    this.setState( state => {
      let newCurrentTab = state.currentTab - 1
      if ( tabIndex + 1 === currentTab ) {
        newCurrentTab = tabIndex === 0 ? 1 : tabIndex + 1 < count ? tabIndex + 1 : tabIndex
      }
      return {
        currentTab: newCurrentTab,
      }
    }, () => this.activatePanel( this.state.currentTab - 2 ) )

    const newTabsData = tabsData.filter( ( item, index ) => index !== tabIndex )

    setAttributes({
      count: count - 1,
      tabsData: newTabsData,
    })
  }

  newLabels = () => {
    const { attributes: { count, tabsData } } = this.props

    const newLabels = JSON.parse( JSON.stringify( tabsData ) )
    newLabels[ count ] = {
      label: __( 'Tab', 'fleximpleblocks' ),
    }
    return newLabels
  }

  updateLabels = ( value, index ) => {
    const { attributes: { tabsData }, setAttributes } = this.props

    const modifiedTabsData = tabsData.map( ( label, thisIndex ) => {
      if ( index === thisIndex ) {
        label = { ...label, ...value }
      }
      return label
    })
    setAttributes({ tabsData: modifiedTabsData })
  }

  activatePanel = index => {
    const currentInnerBlock = this.props.block.innerBlocks[ index ]
    if ( index < 0 ) index = 0
    if ( currentInnerBlock ) {
      // Deactivate all panels
      this.props.block.innerBlocks.forEach( item => {
        document.querySelector( `#block-${ item.clientId } .fleximple-block-tab-panel` ).classList.remove( 'is-active' )
      })
      // Activate current new panel
      document.querySelector( `#block-${ this.props.block.innerBlocks[ index ].clientId } .fleximple-block-tab-panel` ).classList.add( 'is-active' )
    } else {
      window.requestAnimationFrame( () => this.activatePanel( index ) )
    }
  }

  render() {
    const {
      className,
      attributes: {
        count,
        tabsData,
        tabsAlignment,
      },
      setAttributes,
      clientId,
      instanceId,
      block,
    } = this.props

    const {
      currentTab,
    } = this.state

    const defaultClassName = getBlockDefaultClassName( name )

    const tabListClasses = classnames(
      `${ defaultClassName }__tab-list`, {
        [ `block-align-${ tabsAlignment }` ]: tabsAlignment,
      },
    )

    return (
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
            <BaseControl
              label={ __( 'Horizontal alignment', 'fleximpleblocks' ) }
              id={ `fleximple-blocks-tabs-horizontal-block-align-toolbar-${ instanceId }` }
            >
              <BlockAlignmentHorizontalToolbar
                id={ `fleximple-blocks-tabs-horizontal-block-align-toolbar-${ instanceId }` }
                value={ tabsAlignment }
                onChange={ value => setAttributes({ tabsAlignment: value }) }
                spaceControlsEnabled
              />
            </BaseControl>
          </PanelBody>
        </InspectorControls>

        <BlockControls>
          <BlockAlignmentHorizontalToolbar
            value={ tabsAlignment }
            onChange={ value => setAttributes({ tabsAlignment: value }) }
            spaceControlsEnabled
          />
        </BlockControls>

        <div className={ className }>
          <div className={ tabListClasses } role="tablist">
            { tabsData.map( ( tabData, index ) =>
              <button
                key={ index }
                className={ `${ defaultClassName }__tab${ currentTab === index + 1 ? ' is-active' : '' }` }
                onClick={ () => {
                  const currentBlock = document.querySelector( `#block-${ clientId }` )						
                  const currentPanel = document.querySelector( `#${ currentBlock.attributes.id.value } #block-${ block.innerBlocks[ index ].clientId } .fleximple-block-tab-panel` )
                  block.innerBlocks.forEach( item => {
                    document.querySelector( `#block-${ item.clientId } .fleximple-block-tab-panel` ).classList.remove( 'is-active' )
                  })
                  currentPanel.classList.add( 'is-active' )						
                  this.setState({ currentTab: index + 1 })
                } }
              >
                <Tooltip text={ __( 'Sort tab', 'fleximpleblocks' ) }>
                  <span
                    className={ `${ defaultClassName }__icon ${ defaultClassName }__icon--drag` }
                    role="button"
                  >
                    <Icon icon={ interactionIcons.dragHandle } />
                  </span>
                </Tooltip>

                <RichText
                  key="editable"
                  value={ tabData.label }
                  onChange={ value => this.updateLabels({ label: value }, index ) }
                  placeholder={ __( 'Write tab title…', 'fleximpleblocks' ) }
                  keepPlaceholderOnFocus
                />

                <Tooltip text={ __( 'Remove tab', 'fleximpleblocks' ) }>
                  <span
                    className={ `${ defaultClassName }__icon ${ defaultClassName }__icon--delete` }
                    role="button"
                    onClick={ () => this.onRemoveTab( index ) }
                    onKeyDown={ event => {
                      if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
                        this.onRemoveTab( index )
                      }
                    } }
                    tabIndex={ 0 }
                  >
                    <Icon icon={ interactionIcons.times } />
                  </span>
                </Tooltip>
              </button>,
            ) }

            <button
              className={ `${ defaultClassName }__tab` }
              onClick={ () => this.onAddTab() }
            >
              <Tooltip text={ __( 'Add tab', 'fleximpleblocks' ) }>
                <span className={ `${ defaultClassName }__icon ${ defaultClassName }__icon--add` }>
                  <Icon icon={ interactionIcons.plus } />
                </span>
              </Tooltip>
            </button>
          </div>

          <div className={ `${ defaultClassName }__panel-list` }>
            <InnerBlocks
              template={ getTabsTemplate( count ) }
              allowedBlocks={ ALLOWED_BLOCKS }
            />
          </div>
        </div>
      </>
    )
  }
}

export default compose( [
  withSelect( ( select, ownProps ) => {
    const { clientId } = ownProps
    const { getBlock } = select( 'core/block-editor' )
    return {
      block: getBlock( clientId ),
    }
  }),
  withInstanceId,
] )( TabsEdit )
