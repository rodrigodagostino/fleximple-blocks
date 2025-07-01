/**
 * COMPONENT: Post Select Control
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
import { BaseControl, SelectControl } from '@wordpress/components'
import { useEffect, useState } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'

function parsePostTypes(types) {
  const typesObjectToArray = Object.keys(types).map((type) => {
    return types[type]
  })
  return typesObjectToArray.map((type) => {
    const typeObject = {}
    typeObject.label = type.name
    typeObject.value = type.rest_base
    return typeObject
  })
}

function parseSearchResults(results) {
  if (results.length === 0) return []

  return results.map((result) => ({
    label: result.title.rendered,
    value: result.id,
  }))
}

function PostSelectControl(
  { attributes: { postType }, setAttributes, hideLabelFromVision, help },
  instanceId
) {
  const [postTypes, setPostTypes] = useState(null)
  const [defaultOptions, setDefaultOptions] = useState([])

  useEffect(() => {
    fetchPostTypes()
    fetchDefaultOptions()
  }, [])

  useEffect(() => {
    fetchDefaultOptions()
  }, [postType])

  const fetchPostTypes = () => {
    apiFetch({ path: '/wp/v2/types/' })
      .then((types) => {
        setPostTypes(parsePostTypes(types))
      })
      .catch((error) => console.error(error))
  }

  const fetchDefaultOptions = async () => {
    const searchResults = await apiFetch({
      path: addQueryArgs(`/wp/v2/${postType}`, {
        per_page: 20,
      }),
    })
    setDefaultOptions(parseSearchResults(searchResults))
  }

  const fetchPromiseOptions = async (inputValue) => {
    const searchResults = await apiFetch({
      path: addQueryArgs(`/wp/v2/${postType}`, {
        search: inputValue,
        per_page: 20,
      }),
    })
    return parseSearchResults(searchResults)
  }

  const id = `fleximple-components-post-select-control-${instanceId}`

  return (
    <>
      <BaseControl
        label={__('Post', 'fleximpleblocks')}
        className="fleximple-components-select-control"
        hideLabelFromVision={hideLabelFromVision}
        id={id}
        help={help}
      >
        <AsyncSelect
          className="react-select-container"
          classNamePrefix="react-select"
          // cacheOptions
          defaultOptions={defaultOptions}
          loadOptions={fetchPromiseOptions}
          placeholder={__('Search a post…', 'fleximpleblocks')}
          onChange={(selectedOption) =>
            setAttributes({ postId: selectedOption.value })
          }
          loadingMessage={() => __('Loading…', 'fleximpleblocks')}
          noOptionsMessage={() => __('No posts found.', 'fleximpleblocks')}
        />
      </BaseControl>
      <SelectControl
        label={__('Post type', 'fleximpleblocks')}
        labelPosition="top"
        value={postType}
        options={postTypes}
        onChange={(value) => setAttributes({ postType: value })}
      />
    </>
  )
}

export default PostSelectControl
