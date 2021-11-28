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
import apiFetch from '@wordpress/api-fetch'
import { BaseControl } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'

const RecentPostsSelectControl = ({
  attributes: { selectedPosts },
  setAttributes,
  hideLabelFromVision,
  help,
  instanceId,
}) => {
  useEffect( () => {
    fetchDefaultOptions()
  }, [] )

  const [ defaultOptions, setDefaultOptions ] = useState()

  const filterResults = searchResults => {
    return searchResults.map( searchResult => ({
      label: searchResult.title.rendered,
      value: searchResult.id,
    }) )
  }

  const fetchDefaultOptions = async () => {
    const searchResults = await apiFetch({
      path: addQueryArgs( '/wp/v2/posts', {
        per_page: 20,
      }),
    })
    const filteredResults = await filterResults( searchResults )
    setDefaultOptions( filteredResults )
  }

  const fetchPromiseOptions = async inputValue => {
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
          loadOptions={ fetchPromiseOptions }
          placeholder={ __( 'Search a post…', 'fleximpleblocks' ) }
          defaultValue={ selectedPosts }
          onChange={ selectedOptions =>
            setAttributes({ selectedPosts: selectedOptions })
          }
          isMulti={ true }
          loadingMessage={ () => __( 'Loading…', 'fleximpleblocks' ) }
          noOptionsMessage={ () => __( 'No posts found.', 'fleximpleblocks' ) }
          closeMenuOnSelect={ false }
        />
      </BaseControl>
    </>
  )
}

export default RecentPostsSelectControl
