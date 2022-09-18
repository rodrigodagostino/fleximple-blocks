/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

function ContactInfoSave({ attributes, attributes: { blockId } }) {
  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps.save({
    className: defaultClassName,
  })

  return (
    <div {...blockProps} data-block-id={blockId}>
      <InnerBlocks.Content />

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default ContactInfoSave
