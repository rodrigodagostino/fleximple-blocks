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

class TabsSave extends Component {
  constructor() {
    super( ...arguments )

    this.state = {}
  }

  render() {
    const {
      className,
      attributes: { count, tabsData, tabsAlignment },
    } = this.props

    const defaultClassName = getBlockDefaultClassName( name )

    const tabListClasses = classnames( `${ defaultClassName }__tab-list`, {
      [ `block-align-${ tabsAlignment }` ]: tabsAlignment,
    })

    const iterator = []
    for ( let i; i < count; i++ ) {
      iterator.push( i )
      i++
    }

    return (
      <div className={ className }>
        <div className={ tabListClasses }>
          { tabsData.map( ( tabData, index ) => 
            <button
              key={ index }
              className={ `${ defaultClassName }__tab${ index === 0 ? ' is-active' : '' }` }
            >
              { tabData.label }
            </button>,
          ) }
        </div>

        <div className={ `${ defaultClassName }__panel-list` }>
          <InnerBlocks.Content />
        </div>
      </div>
    )
  }
}

export default TabsSave
