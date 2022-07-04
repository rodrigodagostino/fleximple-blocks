/**
 * External dependencies
 */
import { arrayMoveImmutable } from 'array-move'
import { SortableHandle } from 'react-sortable-hoc'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Icon } from '@wordpress/components'

/**
 * Internal dependencies
 */
import { interactionIcons } from 'fleximple-components/components/icons'

export const DragHandle = SortableHandle(() => {
  return (
    <div className="fleximple-components-sortable-control__drag-handle">
      <Icon icon={interactionIcons.dragHandle} />
    </div>
  )
})

export const getHelpText = (attribute, state) => {
  switch (attribute) {
    case 'additional':
      return state === 'hidden'
        ? __('Display additional content', 'fleximpleblocks')
        : __('Hide additional content', 'fleximpleblocks')
    case 'audio':
      return state === 'hidden'
        ? __('Display audio', 'fleximpleblocks')
        : __('Hide audio', 'fleximpleblocks')
    case 'author':
      return state === 'hidden'
        ? __('Display author', 'fleximpleblocks')
        : __('Hide author', 'fleximpleblocks')
    case 'categories':
      return state === 'hidden'
        ? __('Display categories', 'fleximpleblocks')
        : __('Hide categories', 'fleximpleblocks')
    case 'comments':
      return state === 'hidden'
        ? __('Display comments', 'fleximpleblocks')
        : __('Hide comments', 'fleximpleblocks')
    case 'content':
      return state === 'hidden'
        ? __('Display content', 'fleximpleblocks')
        : __('Hide content', 'fleximpleblocks')
    case 'date':
      return state === 'hidden'
        ? __('Display date', 'fleximpleblocks')
        : __('Hide date', 'fleximpleblocks')
    case 'excerpt':
      return state === 'hidden'
        ? __('Display excerpt', 'fleximpleblocks')
        : __('Hide excerpt', 'fleximpleblocks')
    case 'extraArticles':
      return state === 'hidden'
        ? __('Display extra articles', 'fleximpleblocks')
        : __('Hide extra articles', 'fleximpleblocks')
    case 'featuredImage':
      return state === 'hidden'
        ? __('Display featured image', 'fleximpleblocks')
        : __('Hide featured image', 'fleximpleblocks')
    case 'heading':
      return state === 'hidden'
        ? __('Display heading', 'fleximpleblocks')
        : __('Hide heading', 'fleximpleblocks')
    case 'icon':
      return state === 'hidden'
        ? __('Display icon', 'fleximpleblocks')
        : __('Hide icon', 'fleximpleblocks')
    case 'media':
      return state === 'hidden'
        ? __('Display media', 'fleximpleblocks')
        : __('Hide media', 'fleximpleblocks')
    case 'meta':
      return state === 'hidden'
        ? __('Display meta', 'fleximpleblocks')
        : __('Hide meta', 'fleximpleblocks')
    case 'quote':
      return state === 'hidden'
        ? __('Display quote', 'fleximpleblocks')
        : __('Hide quote', 'fleximpleblocks')
    case 'readMore':
      return state === 'hidden'
        ? __('Display read more', 'fleximpleblocks')
        : __('Hide read more', 'fleximpleblocks')
    case 'reference':
      return state === 'hidden'
        ? __('Display reference', 'fleximpleblocks')
        : __('Hide reference', 'fleximpleblocks')
    case 'subhead':
      return state === 'hidden'
        ? __('Display subhead', 'fleximpleblocks')
        : __('Hide subhead', 'fleximpleblocks')
    case 'title':
      return state === 'hidden'
        ? __('Display title', 'fleximpleblocks')
        : __('Hide title', 'fleximpleblocks')
  }
}

export const getLabel = (attribute) => {
  switch (attribute) {
    case 'additional':
      return __('Additional content', 'fleximpleblocks')
    case 'author':
      return __('Author', 'fleximpleblocks')
    case 'audio':
      return __('Audio', 'fleximpleblocks')
    case 'categories':
      return __('Categories', 'fleximpleblocks')
    case 'comments':
      return __('Comments', 'fleximpleblocks')
    case 'content':
      return __('Content', 'fleximpleblocks')
    case 'date':
      return __('Date', 'fleximpleblocks')
    case 'excerpt':
      return __('Excerpt', 'fleximpleblocks')
    case 'extraArticles':
      return __('Extra articles', 'fleximpleblocks')
    case 'featuredImage':
      return __('Featured image', 'fleximpleblocks')
    case 'heading':
      return __('Heading', 'fleximpleblocks')
    case 'icon':
      return __('Icon', 'fleximpleblocks')
    case 'media':
      return __('Media', 'fleximpleblocks')
    case 'meta':
      return __('Meta', 'fleximpleblocks')
    case 'quote':
      return __('Quote', 'fleximpleblocks')
    case 'readMore':
      return __('Read more', 'fleximpleblocks')
    case 'reference':
      return __('Reference', 'fleximpleblocks')
    case 'subhead':
      return __('Subhead', 'fleximpleblocks')
    case 'title':
      return __('Title', 'fleximpleblocks')
  }
}

export const getState = (attribute, attributes) => {
  const displayAttribute = `display${attribute
    .charAt(0)
    .toUpperCase()}${attribute.slice(1)}`
  return attributes[displayAttribute]
}

export const toggleAttribute = (attribute, attributes, setAttributes) => {
  const displayAttribute = `display${attribute
    .charAt(0)
    .toUpperCase()}${attribute.slice(1)}`
  setAttributes({ [displayAttribute]: !attributes[displayAttribute] })
}

export const onSortStart = () => {
  document.body.setAttribute('style', 'cursor:grabbing')
}

export const onSortEnd = (
  { oldIndex, newIndex },
  _,
  attributeName,
  attribute,
  setAttributes
) => {
  document.body.removeAttribute('style')
  const order = arrayMoveImmutable(attribute, oldIndex, newIndex)
  setAttributes({ [attributeName]: order })
}
