/**
 * COMPONENT: Recent Posts Select Control
 */

/**
 * External dependencies
 */
import AsyncSelect from 'react-select/async'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { BaseControl } from '@wordpress/components'
import { Component } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'
import apiFetch from '@wordpress/api-fetch'


class RecentPostsSelectControl extends Component {
  constructor() {
    super( ...arguments )

    this.filterResults = this.filterResults.bind( this )
    this.fetchDefaultOptions = this.fetchDefaultOptions.bind( this )
    this.fetchPromiseOptions = this.fetchPromiseOptions.bind( this )
    this.handleChange = this.handleChange.bind( this )

    this.state = {
      defaultOptions: [],
    }
  }

  componentDidMount() {
    this.fetchDefaultOptions()
  }

  filterResults = searchResults => {
    return searchResults.map( searchResult => ({
      label: searchResult.title.rendered,
      value: searchResult.id,
    }) )
  }

  fetchDefaultOptions = async () => {
    const searchResults = await apiFetch({
      path: addQueryArgs( '/wp/v2/posts', {
        per_page: 20,
      }),
    })
    const filteredResults = await this.filterResults( searchResults )
    this.setState({ defaultOptions: filteredResults })
  }

  fetchPromiseOptions = async inputValue => {
    if ( !inputValue || inputValue.length < 3 ) {
      return []
    }
    const searchResults = await apiFetch({
      path: addQueryArgs( '/wp/v2/posts', {
        search: inputValue,
        per_page: 20,
      }),
    })
    const filteredResults = await this.filterResults( searchResults )
    return filteredResults
  }

  handleChange = selectedOptions => {
    const selectedPosts = selectedOptions.map( selectedOption => selectedOption.value )
    this.props.setAttributes({ selectedPosts })
  }


  render() {
    const {
      attributes: { selectedPosts },
      setAttributes,
      hideLabelFromVision,
      help,
      instanceId,
    } = this.props

    const {
      defaultOptions,
    } = this.state

    const id = `fleximple-components-recent-posts-select-control-${ instanceId }`

    return (
      <>
        <BaseControl
          label={ __( 'Posts', 'fleximpleblocks' ) }
          className="fleximple-components-select-control"
          hideLabelFromVision={ hideLabelFromVision }
          id={ id }
          help={ help }
        >
          <AsyncSelect
            className="react-select-container"
            classNamePrefix="react-select"
            // cacheOptions
            defaultOptions={ defaultOptions }
            // loadOptions={ selectedPosts.length === postsToShow ? [] : this.fetchPromiseOptions }
            loadOptions={ this.fetchPromiseOptions }
            placeholder={ __( 'Search a post…', 'fleximpleblocks' ) }
            defaultValue={ selectedPosts }
            onChange={ selectedOptions => setAttributes({ selectedPosts: selectedOptions }) }
            isMulti={ true }
            loadingMessage={ () => __( 'Loading…', 'fleximpleblocks' ) }
            noOptionsMessage={ () => __( 'No posts found.', 'fleximpleblocks' ) }
            closeMenuOnSelect={ false }
          />
        </BaseControl>
      </>
    )
  }
}

export default RecentPostsSelectControl
